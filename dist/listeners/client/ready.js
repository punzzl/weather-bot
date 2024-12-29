"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadyEvent = void 0;
const framework_1 = require("@sapphire/framework");
class ReadyEvent extends framework_1.Listener {
    run() {
        this.container.logger.info('[CLIENT]: Ready!');
    }
}
exports.ReadyEvent = ReadyEvent;
//# sourceMappingURL=ready.js.map