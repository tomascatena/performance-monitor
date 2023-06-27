import { Server } from 'socket.io';
import { availableParallelism } from 'node:os';
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';
import { setupMaster, setupWorker } from '@socket.io/sticky';
import cluster from 'node:cluster'; // make it so a client can find its way back to the same worker
import http from 'node:http'; // make it so the primary node can emit to everyone
import process from 'node:process';
import socketMain from './socketMain';

const numCPUs = availableParallelism();
const PORT = 8080;

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
    console.log(`worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
  });
} else {
  console.log(`Worker ${process.pid} started`);

  const httpServer = http.createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // allow all origins. This is not safe for production
    },
  });

  io.adapter(createAdapter()); // use the cluster adapter

  setupWorker(io); // setup connection with the primary process

  socketMain(io); // setup socket.io
}
