import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';
import http from 'node:http';
import process from 'node:process';
import { setupMaster, setupWorker } from '@socket.io/sticky'; // make it so a client can find its way back to the same worker
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter'; // make it so the primary node can emit to everyone
import { Server } from 'socket.io';

const numCPUs = availableParallelism();
const PORT = 3000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  const httpServer = http.createServer();

  setupMaster(httpServer, {
    loadBalancingMethod: 'least-connection', // when a new connection comes in, send it to the worker with the least connections
  });

  setupPrimary(); // setup connections between workers

  cluster.setupPrimary({
    serialization: 'advanced', // serialize the data sent between workers
  });

  httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  }); // Internet facing port

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  
  const httpServer = http.createServer();
  const io = new Server(httpServer);

  io.adapter(createAdapter()); // use the cluster adapter

  setupWorker(io); // setup connection with the primary process

  io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected to worker ${process.pid}`);

    socket.emit('welcome', `Welcome to our cluster driven socket.io server. You are on worker ${process.pid}.`);
  })
}
