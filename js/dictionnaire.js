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
    var Dictionnaire = /** @class */ (function () {
        function Dictionnaire() {
        }
        Dictionnaire.getMot = function (idPartie, datePartie) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Le prénom à deviner est toujours le même : PHILOMENE.
                    // Il est défini en dur, il n'est plus lu depuis le Gist.
                    return [2 /*return*/, this._motATrouverFixe];
                });
            });
        };
        Dictionnaire.getDescription = function (mot) {
            var _a;
            var motNettoye = this.nettoyerMot(mot);
            return (_a = this._descriptionsParPrenom[motNettoye]) !== null && _a !== void 0 ? _a : null;
        };
        Dictionnaire.estMotValide = function (mot, premiereLettre, longueur) {
            return __awaiter(this, void 0, void 0, function () {
                var dictionnaire;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mot = this.nettoyerMot(mot);
                            return [4 /*yield*/, this.chargerDictionnaire()];
                        case 1:
                            dictionnaire = _a.sent();
                            return [2 /*return*/, mot.length === longueur && dictionnaire.includes(mot)];
                    }
                });
            });
        };
        Dictionnaire.chargerDictionnaire = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Le dictionnaire est intégré au code : uniquement des prénoms
                    // féminins de 9 lettres (le prénom à deviner est forcément de
                    // 9 lettres). Il n'est plus chargé depuis le Gist.
                    return [2 /*return*/, [
                            "ALEXANDRA",
                            "ANNABELLE",
                            "AUGUSTINE",
                            "CHARLOTTE",
                            "CATHERINE",
                            "CELESTINE",
                            "CHRISTINE",
                            "CONSTANCE",
                            "EMILIENNE",
                            "ELIZABETH",
                            "FRANCIANE",
                            "FRANCOISE",
                            "GABRIELLE",
                            "GENEVIEVE",
                            "HENRIETTE",
                            "JOSEPHINE",
                            "MADELEINE",
                            "PRISCILLA",
                            "STEPHANIE",
                            "VALENTINE",
                            "VERONIQUE",
                            "PHILOMENE",
                            // Prénoms ajoutés (liste élargie) — tous de 9 lettres.
                            "CUNEGONDE",
                            "MARCELINE",
                            "JACOBETTE",
                            "VALERIANE",
                            "DOMINIQUE",
                            "ROSALINDE",
                            "SERAPHINE",
                            "VICTORINE",
                            "ANGELIQUE",
                            "MARGARETA",
                            "CASSANDRA",
                            "CASSANDRE",
                            "MICHELINE",
                            "GERALDINE",
                            "GEORGETTE",
                            "EGLANTINE",
                            "ESMERALDA",
                            "PASCALINE",
                            "FATOUMATA",
                            "RAPHAELLE",
                            "JAQUELINE",
                            "JEANNETTE",
                            "LAURIANNE",
                            "BENEDICTE",
                            "MAGDALENA",
                            "GUADALUPE",
                            "GHISLAINE",
                            "CLAUDETTE",
                            "CLOTHILDE",
                        ]];
                });
            });
        };
        Dictionnaire.nettoyerMot = function (mot) {
            return mot
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase();
        };
        Dictionnaire._db = gistDatabase_1.default.instance;
        Dictionnaire._descriptionsParPrenom = { PHILOMENE: '<strong>Philomène</strong> est un prénom féminin d\'origine grecque, issu de <em>Philoménê</em>, signifiant « celle qui aime la force » ou « amie de la puissance ». Élégant et intemporel, il évoque une personnalité sensible, déterminée et bienveillante. Rare aujourd\'hui, Philomène séduit par son charme classique et son caractère authentique. Souvent associé à la douceur, à l\'intelligence et à la persévérance, ce prénom inspire confiance et sérénité. Il traverse les générations avec une touche de raffinement, tout en restant original et plein de caractère.',
        };
        /** Le prénom à deviner est FIXE : un prénom féminin de 9 lettres. */
        Dictionnaire._motATrouverFixe = "PHILOMENE";
        return Dictionnaire;
    }());
    exports.default = Dictionnaire;
});
//# sourceMappingURL=dictionnaire.js.map