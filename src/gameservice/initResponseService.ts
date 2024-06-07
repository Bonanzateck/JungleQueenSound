import ApiService from "./api.service";
import { getConnection, server } from "../slot/data/config/index";

export const initResponseService = {
    sendInitResponse,
};

async function sendInitResponse(): Promise<any> {
    let url = "";
    const URLString = window.location.href
    // let customplayerId = URLString.split("playerId=");
    
    const LowerCaseURLString = URLString.toLowerCase();
    const customplayerId = LowerCaseURLString.split("playerid=");
  
    if (server.configGame.overBuild) {
        url = getConnection.getbuildInit(server);
    } else {
        url = getConnection.getLocalInit(server);
    }
    const api = new ApiService(url);
   
    let param = {};
    param = {
        "action": "initresult",
        "stake": 1,
        "player":(customplayerId.length > 1?String(customplayerId[1]):'1234'),
    };
    if (server.configGame.method === "get") {
        return api.get(url, param);
    }
    if (server.configGame.method === "post") {
        return api.post(url, param);
    }
}
