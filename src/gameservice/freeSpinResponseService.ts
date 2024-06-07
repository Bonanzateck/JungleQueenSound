import ApiService from "./api.service";
import { getConnection, server } from "../slot/data/config/index";
import { constant } from "../slot/data/config/index";

export const freeSpinResponseService = {
    sendFreeSpinResponse
};

async function sendFreeSpinResponse(): Promise<any> {
    let url = "";
    // for build //
    if (server.configGame.overBuild) {
        url = getConnection.getbuildURL(server);
    } else {
        url = getConnection.getLocalURL(server);
    }
    const api = new ApiService(url);
    let param = {};
    if (constant.configGame.isReconstruction) {
        param = {
            "action": "freespin",
            "stake": 1,
            "player": '123456dd',
            "sessionid": constant.configGame.sessionid
        };
        constant.configGame.isReconstruction = false;
    } else {
        if (constant.configGame.manifestCheat !== 0) {
            param = {
                "action": "freespin",
                "stake": 1,
                "player": '123456dd',
                "sessionid": constant.configGame.sessionid,

            };
        } else {
            param = {
                "action": "freespin",
                "stake": 1,
                "player": '123456dd',
                "sessionid": constant.configGame.sessionid
            };
        }
    }
    const headers = { headers: { 'session': constant.configGame.sessionid } }
    if (server.configGame.method === "get") {
        return api.get(url, param);
    }
    if (server.configGame.method === "post") {
        return api.post(url, param, headers)
    }
}
