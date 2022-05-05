import { Server } from "socket.io"
import express from "express"
import http from 'http'
import Bonjour from "bonjour-service";

const instance = new Bonjour()
// advertise an HTTP server on port 3000
const service = instance.publish({ name: 'My Web Server', type: 'http', port: 3001 })
service.on('up', () => console.log("UP!"))
service.on('error', () => console.log("ERROR!"))

// browse for all http services
instance.find({ type: 'http' }, function (service) {
  console.log('Found an HTTP server:', service)
})

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(express.static('./node_modules/icarus-controller/build'))

io.on('connection', (socket) => {
  console.log('a user connected 🖤🖤🖤🖤🖤');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
