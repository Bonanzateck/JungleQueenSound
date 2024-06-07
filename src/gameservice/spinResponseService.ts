import ApiService from "./api.service";
import { server } from "../slot/data/config/index";
import { constant } from "../slot/data/config/index";
import { getConnection } from "../slot/data/config/index";

export const spinResponseService = {
    sendSpinResponse
};

async function sendSpinResponse(): Promise<any> {
    let url = "";
    // for build 
    if(server.configGame.overBuild){
        url =  getConnection.getbuildURL(server);
    } else {
        url =  getConnection.getLocalURL(server);
    }
    const api = new ApiService(url);
    let param:any = {};
    //NOTE - To activate the Cheat change [manifestCheat] = 1 in Config Index file...
    if (constant.configGame.isReconstruction) {
        param = {
            "action": "freespin",
            "stake":  constant.configGame.currentBet,           
        };

        constant.configGame.isReconstruction = false;
    }
    else {
        if (constant.configGame.BUY_FEATURE_ACTIVE) {
            param = {
                "action": "buybonus",
                "id": "buybonus",
                "stake": constant.configGame.currentBet,
            }
        } else {
        if (constant.configGame.manifestCheat !== 0) {
            param = {
                "action": "spin",
                "stake":  constant.configGame.currentBet,                
            };
        } else {
            param = {
                "action": "spin",
                "stake":  constant.configGame.currentBet,              
            };
            }
        }
        constant.configGame.gameCheatString &&  (param.cheat = constant.configGame.gameCheatString);
        param.sessionid = constant.configGame.sessionid;
    }
    const headers =  { headers: {'session': constant.configGame.sessionid }}
    if (server.configGame.method === "get") {
        return api.get(url, param);
    }
    if (server.configGame.method === "post") {
        return api.post(url, param, headers);
    }
}
