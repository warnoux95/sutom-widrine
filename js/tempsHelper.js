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
    var TempsHelper = /** @class */ (function () {
        function TempsHelper() {
        }
        TempsHelper.genererTempsHumain = function (dureeMs) {
            // Note : Durée est en millisecondes.
            var duree = Math.floor(dureeMs / 1000);
            var retour = "";
            if (duree >= 3600) {
                retour += Math.floor(duree / 3600) + "h";
            }
            retour +=
                Math.floor((duree / 60) % 60)
                    .toString()
                    .padStart(2, "0") + ":";
            retour += Math.floor(duree % 60)
                .toString()
                .padStart(2, "0");
            return retour;
        };
        return TempsHelper;
    }());
    exports.default = TempsHelper;
});
//# sourceMappingURL=tempsHelper.js.map