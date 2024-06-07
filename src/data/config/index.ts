
import { server } from "../../slot/data/config/index";
import { } from "./rawData";
/// -----for build
server.configGame.overBuild = true;
if (server.configGame.overBuild) {
    server.configGame.endpoint = "http://192.168.1.29"//
    server.configGame.gamename = "/junglequeen/"
    server.configGame.port = 8080
} else {
    server.configGame.endpoint = "/junglequeen/" //"http://localhost"// "/junglequeen/"
    server.configGame.gamename = "/junglequeen/"
    server.configGame.port = 0
}
server.configGame.method = "post"
server.configGame.postfixpath = "init?token=" + localStorage.getItem("playerId")

