var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./entites/configuration", "./entites/theme"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var configuration_1 = __importDefault(require("./entites/configuration"));
    var theme_1 = require("./entites/theme");
    var ThemeManager = /** @class */ (function () {
        function ThemeManager(config) {
            var _a;
            this.changerCouleur((_a = config.theme) !== null && _a !== void 0 ? _a : configuration_1.default.Default.theme);
        }
        ThemeManager.prototype.changerCouleur = function (theme) {
            var root = document.documentElement;
            document.body.classList.toggle("pastel-ambiance", theme === theme_1.Theme.Pastel);
            switch (theme) {
                case theme_1.Theme.Pastel:
                    root.style.setProperty("--couleur-fond-rgb", "255, 227, 236");
                    root.style.setProperty("--couleur-police", "#7d5266");
                    root.style.setProperty("--couleur-bordure", "rgba(255, 255, 255, 0.9)");
                    root.style.setProperty("--couleur-icone", "rgb(214, 150, 176)");
                    root.style.setProperty("--couleur-lettre-speciale", "rgb(246, 208, 222)");
                    root.style.setProperty("--couleur-lettre-survole", "rgb(236, 184, 204)");
                    root.style.setProperty("--couleur-lettre-speciale-survole", "rgb(226, 160, 186)");
                    break;
                case theme_1.Theme.Clair:
                case theme_1.Theme.ClairAccessible:
                    root.style.setProperty("--couleur-fond-rgb", "245, 245, 220");
                    root.style.setProperty("--couleur-police", "#000000");
                    root.style.setProperty("--couleur-bordure", "rgb(55, 55, 55)");
                    root.style.setProperty("--couleur-icone", "rgb(55, 55, 55)");
                    root.style.setProperty("--couleur-lettre-speciale", "rgb(210, 210, 210)");
                    root.style.setProperty("--couleur-lettre-survole", "rgb(140, 140, 140)");
                    root.style.setProperty("--couleur-lettre-speciale-survole", "rgb(140, 140, 140)");
                    break;
                default:
                    root.style.setProperty("--couleur-fond-rgb", "43, 43, 43");
                    root.style.setProperty("--couleur-police", "#ffffff");
                    root.style.setProperty("--couleur-bordure", "rgb(200, 200, 200)");
                    root.style.setProperty("--couleur-icone", "rgb(200, 200, 200)");
                    root.style.setProperty("--couleur-lettre-speciale", "rgb(75, 75, 75)");
                    root.style.setProperty("--couleur-lettre-survole", "rgba(75, 75, 75, 0.65)");
                    root.style.setProperty("--couleur-lettre-speciale-survole", "rgba(75, 75, 75, 0.65)");
            }
            switch (theme) {
                case theme_1.Theme.ClairAccessible:
                case theme_1.Theme.SombreAccessible:
                    root.style.setProperty("--couleur-bien-place", "rgb(9, 104, 0)");
                    root.style.setProperty("--couleur-mal-place", "rgb(219, 124, 0)");
                    break;
                case theme_1.Theme.Pastel:
                    root.style.setProperty("--couleur-bien-place", "rgb(219, 68, 130)");
                    root.style.setProperty("--couleur-mal-place", "rgb(255, 170, 60)");
                    break;
                default:
                    root.style.setProperty("--couleur-bien-place", "rgb(231, 0, 42)");
                    root.style.setProperty("--couleur-mal-place", "rgb(255, 189, 0)");
            }
            switch (theme) {
                case theme_1.Theme.ClairAccessible:
                    root.style.setProperty("--couleur-lettre-survole-bien-place", "rgb(5, 61, 0)");
                    root.style.setProperty("--couleur-lettre-survole-mal-place", "rgb(128, 72, 0)");
                    break;
                case theme_1.Theme.SombreAccessible:
                    root.style.setProperty("--couleur-lettre-survole-bien-place", "rgba(9, 104, 0, 0.65)");
                    root.style.setProperty("--couleur-lettre-survole-mal-place", "rgba(219, 124, 0, 0.65)");
                    break;
                case theme_1.Theme.Clair:
                    root.style.setProperty("--couleur-lettre-survole-bien-place", "rgb(153, 0, 28)");
                    root.style.setProperty("--couleur-lettre-survole-mal-place", "rgb(153, 112, 0)");
                    break;
                case theme_1.Theme.Pastel:
                    root.style.setProperty("--couleur-lettre-survole-bien-place", "rgba(219, 68, 130, 0.65)");
                    root.style.setProperty("--couleur-lettre-survole-mal-place", "rgba(255, 170, 60, 0.65)");
                    break;
                default:
                    root.style.setProperty("--couleur-lettre-survole-bien-place", "rgba(231, 0, 42, 0.65)");
                    root.style.setProperty("--couleur-lettre-survole-mal-place", "rgba(255, 189, 0, 0.65)");
            }
        };
        return ThemeManager;
    }());
    exports.default = ThemeManager;
});
//# sourceMappingURL=themeManager.js.map