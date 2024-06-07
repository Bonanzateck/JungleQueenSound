import { server } from "../slot/data/config/index";

export default function commonUrlService() {

    const playerId = localStorage.getItem("playerId");
    const serverPort = server.configGame.port;
    const serverEndPoint = server.configGame.endpoint;
    const checkPort = serverPort === 0 ? "" : ":" + serverPort;

    const url = `${serverEndPoint}${checkPort}action?token=${playerId}`;

    return url;
  
}
