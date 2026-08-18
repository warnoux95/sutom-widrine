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
        define(["require", "exports", "./entites/configuration", "./sauvegardeur"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var configuration_1 = __importDefault(require("./entites/configuration"));
    var sauvegardeur_1 = __importDefault(require("./sauvegardeur"));
    var AudioPanel = /** @class */ (function () {
        function AudioPanel(configuration) {
            var _this = this;
            var _a;
            this._longueurSon = 220;
            this._hasAudio = false;
            this._configAudioBouton = document.getElementById("configuration-audio-bouton");
            this._iconeAudio = document.getElementById("configuration-audio-icone");
            this._audioLettreBienPlace = document.getElementById("son-lettre-bien-place");
            this._audioLettreMalPlace = document.getElementById("son-lettre-mal-place");
            this._audioLettreNonTrouve = document.getElementById("son-lettre-non-trouve");
            this.setVolumeSonore((_a = configuration.volumeSon) !== null && _a !== void 0 ? _a : configuration_1.default.Default.volumeSon);
            this.toggleSon(configuration.hasAudio, true);
            if (this._configAudioBouton) {
                this._configAudioBouton.addEventListener("click", (function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        event.stopPropagation();
                        this.toggleSon(!this._hasAudio);
                        void sauvegardeur_1.default.sauvegarderConfig(__assign(__assign({}, ((_a = sauvegardeur_1.default.chargerConfigSync()) !== null && _a !== void 0 ? _a : configuration_1.default.Default)), { hasAudio: this._hasAudio }));
                        (_b = this._configAudioBouton) === null || _b === void 0 ? void 0 : _b.blur();
                        return [2 /*return*/];
                    });
                }); }).bind(this));
            }
        }
        AudioPanel.prototype.toggleSon = function (hasAudio, chargement) {
            var _a, _b;
            if (chargement === void 0) { chargement = false; }
            this._hasAudio = hasAudio;
            if (!hasAudio) {
                if (this._iconeAudio) {
                    this._iconeAudio.innerHTML = '<use href="#icone-son-desactive" fill="var(--couleur-icone)"></use>';
                }
                (_a = this._configAudioBouton) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-label", "Activer les bruitages sonores");
            }
            else {
                if (this._iconeAudio) {
                    this._iconeAudio.innerHTML = '<use href="#icone-son-active" fill="var(--couleur-icone)"></use>';
                }
                (_b = this._configAudioBouton) === null || _b === void 0 ? void 0 : _b.setAttribute("aria-label", "Désactiver les bruitages sonores");
                this._audioLettreBienPlace.preload = "auto";
                if (!chargement)
                    this.jouerSonLettreBienPlace();
                this._audioLettreMalPlace.preload = "auto";
                this._audioLettreNonTrouve.preload = "auto";
            }
        };
        AudioPanel.prototype.setVolumeSonore = function (volume) {
            var volumeTag = volume / 100;
            this._audioLettreBienPlace.volume = volumeTag;
            this._audioLettreMalPlace.volume = volumeTag;
            this._audioLettreNonTrouve.volume = volumeTag;
        };
        AudioPanel.prototype.jouerSonLettreBienPlace = function (callback) {
            this.jouerSon(this._audioLettreBienPlace, callback);
        };
        AudioPanel.prototype.jouerSonLettreMalPlace = function (callback) {
            this.jouerSon(this._audioLettreMalPlace, callback);
        };
        AudioPanel.prototype.jouerSonLettreNonTrouve = function (callback) {
            this.jouerSon(this._audioLettreNonTrouve, callback);
        };
        AudioPanel.prototype.jouerSon = function (baliseAudio, callback) {
            var _this = this;
            if (!this._hasAudio) {
                if (callback)
                    setTimeout(callback, this._longueurSon);
                return;
            }
            baliseAudio.currentTime = 0;
            if (callback)
                baliseAudio.addEventListener("ended", callback, { once: true });
            try {
                baliseAudio.play().catch((function () {
                    _this._hasAudio = false;
                    if (callback)
                        setTimeout(callback, _this._longueurSon);
                }).bind(this));
            }
            catch (ex // Parfois, le play ne retourne pas de promise…
            ) {
                this._hasAudio = false;
                if (callback)
                    setTimeout(callback, this._longueurSon);
            }
        };
        return AudioPanel;
    }());
    exports.default = AudioPanel;
});
//# sourceMappingURL=audioPanel.js.map