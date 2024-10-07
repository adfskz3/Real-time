import { getGameAssets } from '../init/assets.js';
import { getStage, setStage } from '../models/stage.model.js';
import { getUsers, removeUser } from '../models/user.model.js';
import handlerMappings from './handlerMapping.js';

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id); // 사용자 삭제
  console.log(`User disconnected: ${socket.id}`);
  console.log('Current users:', getUsers());
}; 

export const handleConnection = (socket, uuid) => {
    console.log(`New user connected!: ${uuid} with socket ID ${socket.id}`);
    console.log(`Current users:`, getUser());

    const { stages } = getGameAssets();
    setStage(uuid, stages.data[0].id);
    console.log('Stage: ', getStage(uuid));

    socket.emit('connection', { uuid });
};

export const handleEvent = (io, socket, data) => {
    if (!CLIENT_VERSION.includes(data.clientVersion)) {
        // 만약 일치하는 버전이 없다면 response 이벤트로 fail 결과를 전송합니다.
        socket.emit('response', { status: 'fail', message: 'Client version mismatch' });
        return;
}

const handler = handlerMappings[data.handlerId];
if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler not found' });
    return;
}

const response = handler(data.userId, data.payload);

if(response.broadcast) {
    io.emit('response','broadcast');
    return;
}

socket.emit('response',response);
};
