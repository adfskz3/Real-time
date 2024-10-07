import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../models/user.model.js';
import { handleConnection, handleDisconnect } from './helper.js';

const registerHandler = (io) => {
  io.on('connection', (socket) => {
  
    const userUUID = uuidv4();
    addUser({ uuid: userUUID, socketId: socket.id });

    handleConnection(socket, userUUID);
    
    // 접속 해제시 이벤트 처리
    socket.on('event', (data)=> handlerEvent(io, socket, data));
    socket.on('disconnect', (socket) => handleDisconnect(socket, userUUID));
  });
};

export default registerHandler;