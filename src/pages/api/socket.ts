
import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'
import * as http from 'http';

export default function socketHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log("in server")
    const server = http.createServer();
    const io = new Server(server);
    server.listen(3000, () => {
        console.log('listening on *:3000');
    })
    /* const app = http.createServer();
    const io = new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >();
    // const io = new Server(app);

    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    app.listen(3002, () => {
        console.log('listening on *:3002')
    })
    console.log("connected")

    return app; */
};
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
type Data = {
  name: string
}

