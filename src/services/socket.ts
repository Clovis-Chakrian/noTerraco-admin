import { io } from "socket.io-client"; 

const socket = io('https://noterracorestaurante.herokuapp.com');

export default socket;