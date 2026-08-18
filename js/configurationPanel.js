var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./entites/configuration", "./sauvegardeur", "./entites/volumeSon", "./entites/clavierDisposition", "./entites/theme"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var configuration_1 = __importDefault(require("./entites/configuration"));
    var sauvegardeur_1 = __importDefault(require("./sauvegardeur"));
    var volumeSon_1 = require("./entites/volumeSon");
    var clavierDisposition_1 = require("./entites/clavierDisposition");
    var theme_1 = require("./entites/theme");
    var ConfigurationPanel = /** @class */ (function () {
        function ConfigurationPanel(panelManager, audioPanel, themeManager) {
            var _this = this;
            var _a;
            this._panelManager = panelManager;
            this._audioPanel = audioPanel;
            this._themeManager = themeManager;
            this._configBouton = document.getElementById("configuration-config-bouton");
            (_a = this._configBouton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (function () {
                _this.afficher();
            }).bind(this));
        }
        ConfigurationPanel.prototype.afficher = function () {
            var _a, _b, _c, _d, _e, _f;
            return __awaiter(this, void 0, void 0, function () {
                var titre, contenu, config;
                var _this = this;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            titre = "Configuration";
                            contenu = document.createElement("div");
                            contenu.id = "config-liste";
                            return [4 /*yield*/, sauvegardeur_1.default.chargerConfig()];
                        case 1:
                            config = (_a = (_g.sent())) !== null && _a !== void 0 ? _a : configuration_1.default.Default;
                            contenu.appendChild(this.genererConfigItem("volume", "Volume du son (si activé)", [
                                { value: volumeSon_1.VolumeSon.Faible.toString(), label: "Faible" },
                                { value: volumeSon_1.VolumeSon.Normal.toString(), label: "Normal" },
                                { value: volumeSon_1.VolumeSon.Fort.toString(), label: "Fort" },
                            ], ((_b = config.volumeSon) !== null && _b !== void 0 ? _b : configuration_1.default.Default.volumeSon).toString(), function (event) {
                                var _a;
                                event.stopPropagation();
                                var volumeSon = parseInt(event.target.value);
                                _this._audioPanel.setVolumeSonore(volumeSon);
                                void sauvegardeur_1.default.sauvegarderConfig(__assign(__assign({}, ((_a = sauvegardeur_1.default.chargerConfigSync()) !== null && _a !== void 0 ? _a : configuration_1.default.Default)), { volumeSon: volumeSon }));
                                event.stopPropagation();
                            }));
                            contenu.appendChild(this.genererConfigItem("disposition-clavier", "Disposition du clavier", [
                                { value: clavierDisposition_1.ClavierDisposition.Azerty.toString(), label: "AZERTY" },
                                { value: clavierDisposition_1.ClavierDisposition.Bépo.toString(), label: "BÉPO" },
                                { value: clavierDisposition_1.ClavierDisposition.Qwerty.toString(), label: "QWERTY" },
                                { value: clavierDisposition_1.ClavierDisposition.Qwertz.toString(), label: "QWERTZ" },
                            ], ((_c = config.disposition) !== null && _c !== void 0 ? _c : configuration_1.default.Default.disposition).toString(), function (event) {
                                var _a;
                                event.stopPropagation();
                                var disposition = parseInt(event.target.value);
                                if (_this._input)
                                    _this._input.dessinerClavier(disposition);
                                void sauvegardeur_1.default.sauvegarderConfig(__assign(__assign({}, ((_a = sauvegardeur_1.default.chargerConfigSync()) !== null && _a !== void 0 ? _a : configuration_1.default.Default)), { disposition: disposition }));
                                event.stopPropagation();
                            }));
                            contenu.appendChild(this.genererConfigItem("theme", "Thème", [
                                { value: theme_1.Theme.Pastel.toString(), label: "Pastel (Rose poudré)" },
                                { value: theme_1.Theme.Sombre.toString(), label: "Sombre" },
                                { value: theme_1.Theme.Clair.toString(), label: "Clair" },
                                { value: theme_1.Theme.SombreAccessible.toString(), label: "Sombre (Accessible)" },
                                { value: theme_1.Theme.ClairAccessible.toString(), label: "Clair (Accessible)" },
                            ], ((_d = config.theme) !== null && _d !== void 0 ? _d : configuration_1.default.Default.theme).toString(), function (event) {
                                var _a;
                                event.stopPropagation();
                                var theme = parseInt(event.target.value);
                                _this._themeManager.changerCouleur(theme);
                                void sauvegardeur_1.default.sauvegarderConfig(__assign(__assign({}, ((_a = sauvegardeur_1.default.chargerConfigSync()) !== null && _a !== void 0 ? _a : configuration_1.default.Default)), { theme: theme }));
                                event.stopPropagation();
                            }));
                            contenu.appendChild(this.genererConfigItem("afficher-temps", "Afficher le temps sur le résumé (à la prochaine partie)", [
                                { value: false.toString(), label: "Non" },
                                { value: true.toString(), label: "Oui" },
                            ], ((_e = config.afficherChrono) !== null && _e !== void 0 ? _e : configuration_1.default.Default.afficherChrono).toString(), function (event) {
                                var _a;
                                event.stopPropagation();
                                var afficherChrono = event.target.value === true.toString();
                                void sauvegardeur_1.default.sauvegarderConfig(__assign(__assign({}, ((_a = sauvegardeur_1.default.chargerConfigSync()) !== null && _a !== void 0 ? _a : configuration_1.default.Default)), { afficherChrono: afficherChrono }));
                                event.stopPropagation();
                            }));
                            contenu.appendChild(this.genererConfigItem("haptique", "Retour haptique (si votre navigateur est compatible)", [
                                { value: false.toString(), label: "Non" },
                                { value: true.toString(), label: "Oui" },
                            ], ((_f = config.haptique) !== null && _f !== void 0 ? _f : configuration_1.default.Default.haptique).toString(), function (event) {
                                var _a, _b;
                                event.stopPropagation();
                                var haptique = event.target.value === true.toString();
                                void sauvegardeur_1.default.sauvegarderConfig(__assign(__assign({}, ((_a = sauvegardeur_1.default.chargerConfigSync()) !== null && _a !== void 0 ? _a : configuration_1.default.Default)), { haptique: haptique }));
                                event.stopPropagation();
                                // On redessine le clavier pour la prise en compte de l'option
                                if (_this._input)
                                    _this._input.dessinerClavier((_b = config.disposition) !== null && _b !== void 0 ? _b : configuration_1.default.Default.disposition);
                            }));
                            this._panelManager.setContenuHtmlElement(titre, contenu);
                            this._panelManager.setClasses(["config-panel"]);
                            this._panelManager.afficherPanel();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ConfigurationPanel.prototype.genererConfigItem = function (idConfig, nomConfig, options, valeurChoisie, onChange) {
            var div = document.createElement("div");
            div.className = "config-item";
            var label = document.createElement("label");
            label.innerText = nomConfig;
            label.setAttribute("for", "config-".concat(idConfig));
            div.appendChild(label);
            var select = document.createElement("select");
            select.id = "config-".concat(idConfig);
            for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                var optionItem = options_1[_i];
                var optionElement = document.createElement("option");
                optionElement.value = optionItem.value;
                optionElement.innerText = optionItem.label;
                if (optionItem.value === valeurChoisie)
                    optionElement.selected = true;
                select.appendChild(optionElement);
            }
            if (onChange !== undefined)
                select.addEventListener("change", onChange);
            div.appendChild(select);
            return div;
        };
        ConfigurationPanel.prototype.setInput = function (input) {
            this._input = input;
        };
        return ConfigurationPanel;
    }());
    exports.default = ConfigurationPanel;
});
//# sourceMappingURL=configurationPanel.js.map