"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const BotClient_1 = require("./structures/BotClient");
const client = new BotClient_1.BotClient({
    intents: ['Guilds', 'GuildMessages'],
    baseUserDirectory: `${process.cwd()}/src`,
});
client.start();
//# sourceMappingURL=index.js.map