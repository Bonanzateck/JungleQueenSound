import ApiService from "./api.service";
import { server } from "../slot/data/config/index";
import { constant } from "../slot/data/config/index";

export const actionResponseService = {
    sendActionResponse
};

async function sendActionResponse(): Promise<any> {
    let url = "";
    if (server.configGame.port === 0) {
        url = server.configGame.endpoint + "action?token=" + "" + constant.configGame.playerId;
    } else {
        url = server.configGame.endpoint + ":" + server.configGame.port + "action?token=" + constant.configGame.playerId;

    }
    const api = new ApiService(url);
    const param = {
        "gameRequest": { cmd: "initGame" }
    };
    if (server.configGame.method === "get") {
        return api.get(url, param);
    }
    if (server.configGame.method === "post") {
        return api.post(url, param);
    }
}