import * as express from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import * as path from 'path';

const app = express();
const server = new http.Server(app);
const io = socketio(server);

app.set('port', process.env.PORT || 3000);

io.on('connection', (socket) => {
  console.log('A new client has connected');

  socket.on('message', function (message: any) {
    console.log(message);
  });
});

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve('./src/client/index.html'));
});

server.listen(app.get('port'), () => {
  console.log('Server running at http://localhost:' + app.get('port'));
});
