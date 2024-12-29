"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotClient = void 0;
const framework_1 = require("@sapphire/framework");
class BotClient extends framework_1.SapphireClient {
    constructor(options) {
        super(options);
    }
    start() {
        this.login(process.env.DISCORD_TOKEN);
    }
}
exports.BotClient = BotClient;
//# sourceMappingURL=BotClient.js.map