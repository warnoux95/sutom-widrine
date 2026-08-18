(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InstanceConfiguration = /** @class */ (function () {
        function InstanceConfiguration() {
        }
        InstanceConfiguration.dateOrigine = new Date(2022, 0, 8); // Attention, c'est du js/ts, donc pour le mois, il faut faire -1, Janvier = 0 !
        InstanceConfiguration.idPartieParDefaut = "34ccc522-c264-4e51-b293-fd5bd60ef7aa";
        return InstanceConfiguration;
    }());
    exports.default = InstanceConfiguration;
});
//# sourceMappingURL=instanceConfiguration.js.map