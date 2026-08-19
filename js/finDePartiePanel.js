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
        define(["require", "exports", "./copieHelper", "./entites/configuration", "./dictionnaire", "./entites/lettreStatut", "./instanceConfiguration", "./sauvegardeur", "./statistiquesDisplayer", "./tempsHelper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var copieHelper_1 = __importDefault(require("./copieHelper"));
    var configuration_1 = __importDefault(require("./entites/configuration"));
    var dictionnaire_1 = __importDefault(require("./dictionnaire"));
    var lettreStatut_1 = require("./entites/lettreStatut");
    var instanceConfiguration_1 = __importDefault(require("./instanceConfiguration"));
    var sauvegardeur_1 = __importDefault(require("./sauvegardeur"));
    var statistiquesDisplayer_1 = __importDefault(require("./statistiquesDisplayer"));
    var tempsHelper_1 = __importDefault(require("./tempsHelper"));
    var FinDePartiePanel = /** @class */ (function () {
        function FinDePartiePanel(datePartie, panelManager, gestionnaire) {
            var _this = this;
            var _a;
            this._resumeTexte = "";
            this._resumeTexteLegacy = "";
            this._motATrouver = "";
            this._estVictoire = false;
            this._partieEstFinie = false;
            this._datePartie = new Date(datePartie);
            this._datePartie.setHours(0, 0, 0);
            this._panelManager = panelManager;
            this._statsButton = document.getElementById("configuration-stats-bouton");
            this._gestionnaire = gestionnaire;
            (_a = this._statsButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (function () {
                _this.afficher();
            }).bind(this));
        }
        FinDePartiePanel.prototype.genererResume = function (estBonneReponse, motATrouver, resultats, dureeMs) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var resultatsEmojis, resultatsEmojisLegacy, dateGrille, origine, numeroGrille, afficherChrono, entete;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            resultatsEmojis = resultats.map(function (mot) {
                                return mot
                                    .map(function (resultat) { return resultat.statut; })
                                    .reduce(function (ligne, statut) {
                                    switch (statut) {
                                        case lettreStatut_1.LettreStatut.BienPlace:
                                            return ligne + "🟥";
                                        case lettreStatut_1.LettreStatut.MalPlace:
                                            return ligne + "🟡";
                                        default:
                                            return ligne + "🟦";
                                    }
                                }, "");
                            });
                            resultatsEmojisLegacy = resultats.map(function (mot) {
                                return mot
                                    .map(function (resultat) { return resultat.statut; })
                                    .reduce(function (ligne, statut) {
                                    switch (statut) {
                                        case lettreStatut_1.LettreStatut.BienPlace:
                                            return ligne + '<span class="emoji-carre-rouge">🟥</span>';
                                        case lettreStatut_1.LettreStatut.MalPlace:
                                            return ligne + '<span class="emoji-cercle-jaune">🟡</span>';
                                        default:
                                            return ligne + '<span class="emoji-carre-bleu">🟦</span>';
                                    }
                                }, "");
                            });
                            dateGrille = this._datePartie.getTime();
                            origine = instanceConfiguration_1.default.dateOrigine.getTime();
                            this._motATrouver = motATrouver;
                            this._estVictoire = estBonneReponse;
                            this._partieEstFinie = true;
                            numeroGrille = Math.round((dateGrille - origine) / (24 * 3600 * 1000)) + 1;
                            return [4 /*yield*/, sauvegardeur_1.default.chargerConfig()];
                        case 1:
                            afficherChrono = ((_a = _b.sent()) !== null && _a !== void 0 ? _a : configuration_1.default.Default).afficherChrono;
                            entete = "#SUTOM #" +
                                numeroGrille +
                                " " +
                                (estBonneReponse ? resultats.length : "-") +
                                "/6" +
                                (afficherChrono ? " " + tempsHelper_1.default.genererTempsHumain(dureeMs) : "") +
                                "\n\n";
                            this._resumeTexte = entete + resultatsEmojis.join("\n");
                            this._resumeTexteLegacy = entete + resultatsEmojisLegacy.join("\n");
                            return [2 /*return*/];
                    }
                });
            });
        };
        FinDePartiePanel.prototype.attacherPartage = function () {
            var resumeBouton = document.getElementById("fin-de-partie-panel-resume-bouton");
            copieHelper_1.default.attacheBoutonCopieLien(resumeBouton, this._resumeTexte + "\n\nhttps://sutom.nocle.fr", "Résumé copié dans le presse papier.");
        };
        FinDePartiePanel.prototype.afficher = function () {
            return __awaiter(this, void 0, void 0, function () {
                var titre, contenu, naissance, jour, mois, annee, heures, minutes, description, rejouerButton;
                var _this = this;
                return __generator(this, function (_a) {
                    contenu = "";
                    if (!this._partieEstFinie) {
                        titre = "Statistiques";
                        contenu += '<p class="fin-de-partie-panel-phrase">Vous n\'avez pas encore fini votre partie du jour.</p>';
                    }
                    else {
                        if (this._estVictoire) {
                            titre = "Félicitations";
                            contenu += '<p class="fin-de-partie-panel-phrase">Félicitations, tu as trouvé le prénom de notre fille.</p>';
                            naissance = instanceConfiguration_1.default.naissancePhilomene;
                            jour = String(naissance.getDate()).padStart(2, "0");
                            mois = String(naissance.getMonth() + 1).padStart(2, "0");
                            annee = naissance.getFullYear();
                            heures = String(naissance.getHours()).padStart(2, "0");
                            minutes = String(naissance.getMinutes()).padStart(2, "0");
                            contenu +=
                                '<p class="fin-de-partie-panel-phrase">Philomène est née le ' +
                                    jour +
                                    "/" +
                                    mois +
                                    "/" +
                                    annee +
                                    " à " +
                                    heures +
                                    ":" +
                                    minutes +
                                    ".</p>";
                            description = dictionnaire_1.default.getDescription(this._motATrouver);
                            if (description) {
                                contenu += '<p class="fin-de-partie-panel-phrase">' + description + "</p>";
                            }
                        }
                        else {
                            titre = "Perdu";
                            contenu +=
                                '<p class="fin-de-partie-panel-phrase">' +
                                    "Dommage, tu as perdu. Rejoue pour tenter ta chance sur une nouvelle grille !" +
                                    "</p>";
                            contenu +=
                                '<button id="fin-de-partie-panel-rejouer-bouton" class="bouton" type="button">Rejouer</button>';
                        }
                        contenu += statistiquesDisplayer_1.default.genererResumeTexte(this._resumeTexteLegacy).outerHTML;
                    }
                    this._panelManager.setContenu(titre, contenu);
                    this._panelManager.setClasses(["fin-de-partie-panel"]);
                    if (this._partieEstFinie)
                        this.attacherPartage();
                    rejouerButton = document.getElementById("fin-de-partie-panel-rejouer-bouton");
                    if (rejouerButton) {
                        rejouerButton.addEventListener("click", (function () {
                            void _this._gestionnaire.reinitialiserPartie();
                            _this._panelManager.cacherPanel();
                        }).bind(this));
                    }
                    this._panelManager.afficherPanel();
                    return [2 /*return*/];
                });
            });
        };
        return FinDePartiePanel;
    }());
    exports.default = FinDePartiePanel;
});
//# sourceMappingURL=finDePartiePanel.js.map