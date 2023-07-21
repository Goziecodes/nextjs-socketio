import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://socket-ls-server.udux.com';
// const URL = 'http://localhost:3005';

export const socket = io(URL);