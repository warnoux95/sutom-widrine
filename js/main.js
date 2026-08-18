var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./gestionnaire"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var gestionnaire_1 = __importDefault(require("./gestionnaire"));
    var Main = /** @class */ (function () {
        function Main() {
            var gestionnaire = new gestionnaire_1.default();
        }
        return Main;
    }());
    exports.default = Main;
});
//# sourceMappingURL=main.js.map