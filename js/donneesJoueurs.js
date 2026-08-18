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
        define(["require", "exports", "./gistDatabase"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var gistDatabase_1 = __importDefault(require("./gistDatabase"));
    var NOM_FICHIER = "leaderboard.json";
    function nouvelleEntree() {
        return {
            nombreEssais: 0,
            temps: 0,
            aTrouveLeMot: false,
        };
    }
    /**
     * Migration de tolérance : les entrées écrites avant l'ajout du champ
     * `aTrouveLeMot` (ou avant l'allègement du schéma, avec `meilleurTempsMs`)
     * sont complétées : le temps est recopié depuis `meilleurTempsMs` si
     * besoin, `aTrouveLeMot` vaut false. Les anciens champs (configuration,
     * statistiques…) sont ignorés et disparaîtront à la prochaine écriture.
     */
    function migrerEntree(entree) {
        var _a, _b, _c;
        var migree = nouvelleEntree();
        migree.nombreEssais = (_a = entree.nombreEssais) !== null && _a !== void 0 ? _a : 0;
        migree.temps = (_c = (_b = entree.temps) !== null && _b !== void 0 ? _b : entree.meilleurTempsMs) !== null && _c !== void 0 ? _c : 0;
        migree.aTrouveLeMot = entree.aTrouveLeMot === true;
        return migree;
    }
    var DonneesJoueurs = /** @class */ (function () {
        function DonneesJoueurs() {
        }
        /**
         * Normalise un pseudo : en majuscules, sans espaces superflus.
         * Retourne null si le pseudo est vide.
         */
        DonneesJoueurs.normaliser = function (pseudo) {
            var nom = (pseudo || "").trim().toUpperCase();
            return nom.length === 0 ? null : nom;
        };
        /**
         * Lit le fichier unique du Gist et retourne l'objet complet indexé
         * par pseudo. Retourne un objet vide si le fichier est absent,
         * illisible ou corrompu.
         */
        DonneesJoueurs.lireToutes = function () {
            return __awaiter(this, void 0, void 0, function () {
                var contenu, donnees, normalisees, _i, _a, pseudo;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this._db.lireFichier(NOM_FICHIER)];
                        case 1:
                            contenu = _b.sent();
                            if (!contenu)
                                return [2 /*return*/, {}];
                            try {
                                donnees = JSON.parse(contenu);
                                if (!donnees || typeof donnees !== "object" || Array.isArray(donnees))
                                    return [2 /*return*/, {}];
                                normalisees = {};
                                for (_i = 0, _a = Object.keys(donnees); _i < _a.length; _i++) {
                                    pseudo = _a[_i];
                                    normalisees[pseudo] = migrerEntree(donnees[pseudo]);
                                }
                                return [2 /*return*/, normalisees];
                            }
                            catch (_c) {
                                return [2 /*return*/, {}];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Retourne l'entrée d'un pseudo, ou une entrée vierge si le joueur
         * n'existe pas encore. (N'écrit rien dans le Gist.)
         */
        DonneesJoueurs.obtenir = function (pseudo) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var nom, toutes;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            nom = (_a = DonneesJoueurs.normaliser(pseudo)) !== null && _a !== void 0 ? _a : "";
                            if (!nom)
                                return [2 /*return*/, nouvelleEntree()];
                            return [4 /*yield*/, this.lireToutes()];
                        case 1:
                            toutes = _b.sent();
                            return [2 /*return*/, toutes[nom] ? __assign(__assign({}, nouvelleEntree()), toutes[nom]) : nouvelleEntree()];
                    }
                });
            });
        };
        /**
         * Enchaîne dans la file d'écriture du Gist une opération de type
         * lecture-modification-écriture sur l'entrée d'un pseudo : `modificateur`
         * reçoit l'entrée actuelle et doit retourner la nouvelle entrée.
         */
        DonneesJoueurs.mettreAJour = function (pseudo, modificateur) {
            var _this = this;
            var nom = DonneesJoueurs.normaliser(pseudo);
            if (!nom)
                return Promise.resolve();
            return this._db.ecrire(function () { return __awaiter(_this, void 0, void 0, function () {
                var toutes, entreeActuelle;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.lireToutes()];
                        case 1:
                            toutes = _b.sent();
                            entreeActuelle = (_a = toutes[nom]) !== null && _a !== void 0 ? _a : nouvelleEntree();
                            toutes[nom] = modificateur(entreeActuelle);
                            return [4 /*yield*/, this.ecrireToutes(toutes)];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        /**
         * Écrit l'objet complet (tous les pseudos) dans le fichier unique
         * du Gist. Doit être appelé depuis la file d'écriture (via
         * `mettreAJour` ou `GistDatabase.ecrire`).
         */
        DonneesJoueurs.ecrireToutes = function (donnees) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this._db.ecrireFichier(NOM_FICHIER, JSON.stringify(donnees, null, 2))];
                });
            });
        };
        DonneesJoueurs._db = gistDatabase_1.default.instance;
        return DonneesJoueurs;
    }());
    exports.default = DonneesJoueurs;
});
//# sourceMappingURL=donneesJoueurs.js.map