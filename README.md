# Performance Monitor App

## Architecture

Several Node.js clients will be connected to the Socket.io Server, constantly sending performance data. The server will then broadcast the data to all connected clients (React App) via Socket.io, to render the data in real-time on the browser.

There are three main components to this application:

- Node.js Client: Responsible for collecting performance data and sending it to the server. There will be multiple instances of this client running on different machines.
- Socket.io Server: Responsible for receiving performance data from the node.js clients and broadcasting it to all connected frontend clients.
- React App: Responsible for receiving performance data from the socket.io server and rendering it in real-time on the browser.

## Scalability

## Inspiration

[SocketIO v4, with websockets - the details. Updated May2023](https://www.udemy.com/course/socketio-with-websockets-the-details)