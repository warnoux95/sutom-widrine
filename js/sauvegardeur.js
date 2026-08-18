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
        define(["require", "exports", "./entites/configuration"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var configuration_1 = __importDefault(require("./entites/configuration"));
    /**
     * Le pseudo courant (`prenomCourant`) est défini par le Gestionnaire
     * après la saisie dans la popup des règles : il sert de clé dans le
     * fichier `leaderboard.json` du Gist pour le compteur d'essais et le
     * meilleur temps.
     *
     * La configuration et les statistiques du joueur ne sont PAS enregistrées
     * dans le Gist : elles vivent uniquement dans ce cache mémoire, pendant
     * la session. À chaque rechargement, le joueur repart avec la
     * configuration par défaut et des statistiques à zéro.
     * Un cache mémoire permet de garder des accès synchrones pour l'UI.
     */
    var Sauvegardeur = /** @class */ (function () {
        function Sauvegardeur() {
        }
        Object.defineProperty(Sauvegardeur, "prenomCourant", {
            /** Pseudo du joueur courant (clé de l'entrée dans leaderboard.json). */
            get: function () {
                return Sauvegardeur._prenomCourant;
            },
            set: function (pseudo) {
                Sauvegardeur._cacheStats = undefined;
                Sauvegardeur._cacheConfig = undefined;
                Sauvegardeur._prenomCourant = (pseudo || "").trim();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Sauvegarde (en mémoire uniquement, pour la session) les statistiques
         * de la partie en cours. Rien n'est écrit dans le Gist.
         */
        Sauvegardeur.sauvegarderStats = function (stats) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    Sauvegardeur._cacheStats = stats;
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Retourne les statistiques de la session en cours, ou undefined si
         * aucune partie n'a encore été enregistrée. (Rien n'est lu du Gist :
         * chaque session repart à zéro.)
         */
        Sauvegardeur.chargerSauvegardeStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, Sauvegardeur._cacheStats];
                });
            });
        };
        /**
         * Sauvegarde (en mémoire uniquement, pour la session) la configuration
         * du joueur. Rien n'est écrit dans le Gist.
         */
        Sauvegardeur.sauvegarderConfig = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    Sauvegardeur._cacheConfig = config;
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Version asynchrone : retourne la configuration de la session en
         * cours, ou null si elle n'a pas encore été définie (auquel cas le
         * joueur n'a jamais modifié les options : on utilise la configuration
         * par défaut).
         */
        Sauvegardeur.chargerConfig = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [2 /*return*/, (_a = Sauvegardeur._cacheConfig) !== null && _a !== void 0 ? _a : null];
                });
            });
        };
        /**
         * Version synchrone pour les callbacks d'UI : retourne le cache mémoire,
         * ou la configuration par défaut si rien n'est encore défini.
         */
        Sauvegardeur.chargerConfigSync = function () {
            if (Sauvegardeur._cacheConfig !== undefined && Sauvegardeur._cacheConfig !== null) {
                return Sauvegardeur._cacheConfig;
            }
            return configuration_1.default.Default;
        };
        Sauvegardeur._prenomCourant = "";
        return Sauvegardeur;
    }());
    exports.default = Sauvegardeur;
});
//# sourceMappingURL=sauvegardeur.js.map