import config from '../config';
import BaseAPIService from './baseAPIService';

const { SocketClient } = require("@cognigy/socket-client");

class ChatService extends BaseAPIService {
  initMessanger = async () => {
    this.client = new SocketClient(config.cognigyAPIBase, config.cognigyAPIToken, {
      forceWebsockets: true
    });
    await this.client.connect();
  };

  setOutputListener = (outputListener) => {
    this.client.on('output', outputListener);
  };

  setFinalPingListener = (finalPingListener) => {
    this.client.on('finalPing', finalPingListener);
  };

  setTypingStatusListener = (typingStatusListener) => {
    this.client.on('typingStatus', typingStatusListener);
  };

  setErrorListener = (errorListener) => {
    this.client.on('error', errorListener);
  };

  sendMessage = (message) => {
    this.client.sendMessage(message);
  };
}
const chatService = new ChatService();
export default chatService;
