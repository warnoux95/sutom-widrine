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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
        define(["require", "exports", "./dictionnaire", "./grille", "./input", "./entites/lettreResultat", "./entites/lettreStatut", "./finDePartiePanel", "./notificationMessage", "./entites/sauvegardeStats", "./sauvegardeur", "./entites/configuration", "./panelManager", "./reglesPanel", "./configurationPanel", "./audioPanel", "./themeManager", "./gistLeaderboard", "./instanceConfiguration"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dictionnaire_1 = __importDefault(require("./dictionnaire"));
    var grille_1 = __importDefault(require("./grille"));
    var input_1 = __importStar(require("./input"));
    var lettreResultat_1 = __importDefault(require("./entites/lettreResultat"));
    var lettreStatut_1 = require("./entites/lettreStatut");
    var finDePartiePanel_1 = __importDefault(require("./finDePartiePanel"));
    var notificationMessage_1 = __importDefault(require("./notificationMessage"));
    var sauvegardeStats_1 = __importDefault(require("./entites/sauvegardeStats"));
    var sauvegardeur_1 = __importDefault(require("./sauvegardeur"));
    var configuration_1 = __importDefault(require("./entites/configuration"));
    var panelManager_1 = __importDefault(require("./panelManager"));
    var reglesPanel_1 = __importDefault(require("./reglesPanel"));
    var configurationPanel_1 = __importDefault(require("./configurationPanel"));
    var audioPanel_1 = __importDefault(require("./audioPanel"));
    var themeManager_1 = __importDefault(require("./themeManager"));
    var gistLeaderboard_1 = __importDefault(require("./gistLeaderboard"));
    var instanceConfiguration_1 = __importDefault(require("./instanceConfiguration"));
    var Gestionnaire = /** @class */ (function () {
        function Gestionnaire() {
            this._grille = null;
            this._input = null;
            this._propositions = [];
            this._resultats = [];
            this._motATrouver = "";
            this._compositionMotATrouver = {};
            this._maxNbPropositions = 6;
            this._datePartieEnCours = new Date();
            this._idPartieEnCours = instanceConfiguration_1.default.idPartieParDefaut;
            this._stats = sauvegardeStats_1.default.Default;
            this._config = configuration_1.default.Default;
            this._chronoElement = null;
            this._intervalleChrono = null;
            this._debutChrono = null;
            this._initialisationTerminee = false;
            this._leaderboard = new gistLeaderboard_1.default();
            // On applique le thème par défaut immédiatement, avant que la modal
            // d'accueil ne s'affiche : ainsi le fond velours et le texte blanc
            // sont en place dès le chargement (le thème réel sera appliqué
            // de nouveau dans demarrerAvecPseudo une fois la config chargée).
            this._themeManager = new themeManager_1.default(configuration_1.default.Default);
            this._panelManager = new panelManager_1.default();
            this._chronoElement = document.getElementById("chrono-partie");
            this.initialiserChrono();
            this.afficherReglesSiNecessaire();
        }
        /**
         * Appelé par la popup des règles quand le joueur valide son pseudo.
         * Toute l'initialisation du jeu démarre ici : le mot (fixe,
         * PHILOMENE), la configuration et les statistiques du joueur (depuis
         * le Gist), puis la grille et le clavier.
         */
        Gestionnaire.prototype.demarrerAvecPseudo = function (prenom) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            sauvegardeur_1.default.prenomCourant = prenom;
                            _c = this;
                            return [4 /*yield*/, sauvegardeur_1.default.chargerConfig()];
                        case 1:
                            _c._config = (_a = (_f.sent())) !== null && _a !== void 0 ? _a : configuration_1.default.Default;
                            _d = this;
                            return [4 /*yield*/, sauvegardeur_1.default.chargerSauvegardeStats()];
                        case 2:
                            _d._stats = (_b = (_f.sent())) !== null && _b !== void 0 ? _b : sauvegardeStats_1.default.Default;
                            this._datePartieEnCours = new Date();
                            this._dateFinPartie = undefined;
                            this._audioPanel = new audioPanel_1.default(this._config);
                            this._themeManager = new themeManager_1.default(this._config);
                            this._finDePartiePanel = new finDePartiePanel_1.default(this._datePartieEnCours, this._panelManager, this);
                            this._configurationPanel = new configurationPanel_1.default(this._panelManager, this._audioPanel, this._themeManager);
                            _e = this;
                            return [4 /*yield*/, dictionnaire_1.default.getMot(this._idPartieEnCours, this._datePartieEnCours)];
                        case 3:
                            _e._motATrouver = _f.sent();
                            this._input = new input_1.default(this, this._config, this._motATrouver.length);
                            this._panelManager.setInput(this._input);
                            this._grille = new grille_1.default(this._motATrouver.length, this._maxNbPropositions, this._audioPanel);
                            this._configurationPanel.setInput(this._input);
                            this._compositionMotATrouver = this.decompose(this._motATrouver);
                            this._initialisationTerminee = true;
                            this.demarrerChrono();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Gestionnaire.prototype.initialiserChrono = function () {
            if (this._chronoElement) {
                this._chronoElement.textContent = "00:00";
                // Le chrono est toujours visible au-dessus de la grille.
                this._chronoElement.style.display = "flex";
            }
        };
        Gestionnaire.prototype.formatChrono = function (dureeMs) {
            var totalSecondes = Math.floor(dureeMs / 1000);
            var minutes = Math.floor(totalSecondes / 60).toString().padStart(2, "0");
            var secondes = (totalSecondes % 60).toString().padStart(2, "0");
            return "".concat(minutes, ":").concat(secondes);
        };
        Gestionnaire.prototype.mettreAJourChrono = function () {
            if (!this._chronoElement)
                return;
            if (!this._debutChrono) {
                this._chronoElement.textContent = "00:00";
                return;
            }
            var dureeMs = new Date().getTime() - this._debutChrono.getTime();
            this._chronoElement.textContent = this.formatChrono(dureeMs);
        };
        Gestionnaire.prototype.afficherChrono = function (visible) {
            if (!this._chronoElement)
                return;
            this._chronoElement.style.display = visible ? "flex" : "none";
        };
        Gestionnaire.prototype.demarrerChrono = function () {
            var _this = this;
            if (!this._chronoElement)
                return;
            this._debutChrono = new Date();
            // Le chrono est toujours affiché au-dessus de la grille (l'option
            // « afficherChrono » ne concerne que le temps sur le résumé partagé).
            this.afficherChrono(true);
            this.mettreAJourChrono();
            this._intervalleChrono = window.setInterval(function () { return _this.mettreAJourChrono(); }, 1000);
        };
        Gestionnaire.prototype.arreterChrono = function () {
            if (this._intervalleChrono) {
                window.clearInterval(this._intervalleChrono);
                this._intervalleChrono = null;
            }
        };
        /**
         * Reprend le chrono existant sans remettre son départ à zéro : la
         * réinitialisation de la partie (bouton « Rejouer ») ne doit pas
         * remettre le temps à 00:00, il continue de tourner.
         */
        Gestionnaire.prototype.relancerChrono = function () {
            var _this = this;
            if (!this._chronoElement)
                return;
            if (!this._debutChrono)
                this._debutChrono = new Date();
            // Le chrono est toujours affiché au-dessus de la grille (l'option
            // « afficherChrono » ne concerne que le temps sur le résumé partagé).
            this.afficherChrono(true);
            this.mettreAJourChrono();
            this._intervalleChrono = window.setInterval(function () { return _this.mettreAJourChrono(); }, 1000);
        };
        Gestionnaire.prototype.decompose = function (mot) {
            var composition = {};
            for (var position = 0; position < mot.length; position++) {
                var lettre = mot[position];
                if (composition[lettre])
                    composition[lettre]++;
                else
                    composition[lettre] = 1;
            }
            return composition;
        };
        Gestionnaire.prototype.verifierMot = function (mot, chargementPartie) {
            if (chargementPartie === void 0) { chargementPartie = false; }
            return __awaiter(this, void 0, void 0, function () {
                var resultats, isBonneReponse, partieTerminee, duree;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mot = dictionnaire_1.default.nettoyerMot(mot);
                            if (mot.length !== this._motATrouver.length) {
                                notificationMessage_1.default.ajouterNotification("Le mot proposé est trop court.");
                                return [2 /*return*/, false];
                            }
                            if (mot.includes(".")) {
                                notificationMessage_1.default.ajouterNotification("Votre mot ne doit contenir que des lettres.");
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, dictionnaire_1.default.estMotValide(mot, this._motATrouver[0], this._motATrouver.length)];
                        case 1:
                            if (!(_a.sent())) {
                                notificationMessage_1.default.ajouterNotification("Ce mot n'est pas dans notre dictionnaire.");
                                return [2 /*return*/, false];
                            }
                            if (!this._datePartieEnCours)
                                this._datePartieEnCours = new Date();
                            resultats = this.analyserMot(mot);
                            isBonneReponse = resultats.every(function (item) { return item.statut === lettreStatut_1.LettreStatut.BienPlace; });
                            this._propositions.push(mot);
                            this._resultats.push(resultats);
                            if (!!chargementPartie) return [3 /*break*/, 3];
                            return [4 /*yield*/, this._leaderboard.incrementerEssais(sauvegardeur_1.default.prenomCourant)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            partieTerminee = isBonneReponse || this._propositions.length === this._maxNbPropositions;
                            if (!(!chargementPartie && partieTerminee)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this._leaderboard.enregistrerResultat(sauvegardeur_1.default.prenomCourant, this.calculerDureePartie(), isBonneReponse)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            if (!partieTerminee) return [3 /*break*/, 7];
                            this.arreterChrono();
                            if (!this._dateFinPartie)
                                this._dateFinPartie = new Date();
                            duree = (this._dateFinPartie.getTime() - this._datePartieEnCours.getTime()) % 86400000;
                            this._finDePartiePanel.genererResume(isBonneReponse, this._motATrouver, this._resultats, duree);
                            if (!!chargementPartie) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.enregistrerPartieDansStats(duree)];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            if (this._grille) {
                                this._grille.validerMot(mot, resultats, isBonneReponse, chargementPartie, function () {
                                    if (_this._input) {
                                        _this._input.updateClavier(resultats);
                                        if (isBonneReponse || _this._propositions.length === _this._maxNbPropositions) {
                                            _this._finDePartiePanel.afficher();
                                        }
                                        else {
                                            // La partie n'est pas finie, on débloque
                                            _this._input.debloquer(input_1.ContexteBloquage.ValidationMot);
                                        }
                                    }
                                });
                            }
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        Gestionnaire.prototype.actualiserAffichage = function (mot) {
            if (this._grille)
                this._grille.actualiserAffichage(dictionnaire_1.default.nettoyerMot(mot));
        };
        Gestionnaire.prototype.analyserMot = function (mot) {
            var resultats = new Array();
            mot = mot.toUpperCase();
            var composition = __assign({}, this._compositionMotATrouver);
            for (var position = 0; position < this._motATrouver.length; position++) {
                var lettreATrouve = this._motATrouver[position];
                var lettreProposee = mot[position];
                if (lettreATrouve === lettreProposee) {
                    composition[lettreProposee]--;
                }
            }
            for (var position = 0; position < this._motATrouver.length; position++) {
                var lettreATrouve = this._motATrouver[position];
                var lettreProposee = mot[position];
                var resultat = new lettreResultat_1.default();
                if (lettreATrouve === lettreProposee) {
                    resultat.lettre = lettreProposee;
                    resultat.statut = lettreStatut_1.LettreStatut.BienPlace;
                }
                else if ((composition[lettreProposee] || 0) > 0) {
                    resultat.lettre = lettreProposee;
                    resultat.statut = lettreStatut_1.LettreStatut.MalPlace;
                    composition[lettreProposee]--;
                }
                else {
                    resultat.lettre = lettreProposee;
                    resultat.statut = lettreStatut_1.LettreStatut.NonTrouve;
                }
                resultats.push(resultat);
            }
            return resultats;
        };
        Gestionnaire.prototype.enregistrerPartieDansStats = function (duree) {
            return __awaiter(this, void 0, void 0, function () {
                var estVictoire, nbEssais, statsTemps;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._stats.partiesJouees++;
                            estVictoire = this._resultats.some(function (resultat) { return resultat.every(function (item) { return item.statut === lettreStatut_1.LettreStatut.BienPlace; }); });
                            if (estVictoire) {
                                this._stats.partiesGagnees++;
                                nbEssais = this._resultats.length;
                                if (nbEssais >= 1 && nbEssais <= 6) {
                                    this._stats.repartition[nbEssais]++;
                                }
                            }
                            else {
                                this._stats.repartition["-"]++;
                            }
                            this._stats.lettresRepartitions.bienPlace += this._resultats.reduce(function (accumulateur, mot) {
                                accumulateur += mot.filter(function (item) { return item.statut == lettreStatut_1.LettreStatut.BienPlace; }).length;
                                return accumulateur;
                            }, 0);
                            this._stats.lettresRepartitions.malPlace += this._resultats.reduce(function (accumulateur, mot) {
                                accumulateur += mot.filter(function (item) { return item.statut == lettreStatut_1.LettreStatut.MalPlace; }).length;
                                return accumulateur;
                            }, 0);
                            this._stats.lettresRepartitions.nonTrouve += this._resultats.reduce(function (accumulateur, mot) {
                                accumulateur += mot.filter(function (item) { return item.statut == lettreStatut_1.LettreStatut.NonTrouve; }).length;
                                return accumulateur;
                            }, 0);
                            this._stats.dernierePartie = this._datePartieEnCours;
                            if (this._config.afficherChrono) {
                                statsTemps = this._stats.temps;
                                if (!statsTemps || statsTemps === null) {
                                    statsTemps = { moyenne: duree, nbParties: 1 };
                                }
                                else {
                                    statsTemps = {
                                        moyenne: (statsTemps.nbParties * statsTemps.moyenne + duree) / (statsTemps.nbParties + 1),
                                        nbParties: statsTemps.nbParties + 1,
                                    };
                                }
                                this._stats.temps = statsTemps;
                            }
                            return [4 /*yield*/, sauvegardeur_1.default.sauvegarderStats(this._stats)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Gestionnaire.prototype.calculerDureePartie = function () {
            var _a;
            var dateReference = (_a = this._dateFinPartie) !== null && _a !== void 0 ? _a : new Date();
            return (dateReference.getTime() - this._datePartieEnCours.getTime()) % 86400000;
        };
        Gestionnaire.prototype.afficherReglesSiNecessaire = function () {
            var _this = this;
            // Le panneau des règles est TOUJOURS affiché au démarrage : il est
            // obligatoire, car il demande le pseudo du joueur (utilisé pour
            // enregistrer ses résultats dans le Gist) et explique les règles.
            // Les notes de mise à jour, si elles sont en attente, s'affichent
            // après la fermeture de ce panneau.
            this._reglesPanel = new reglesPanel_1.default(this._panelManager, function (prenom) {
                void _this.demarrerAvecPseudo(prenom);
            });
            this._reglesPanel.afficher();
        };
        Gestionnaire.prototype.reinitialiserPartie = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this._dateFinPartie = undefined;
                    this._propositions.splice(0);
                    this._resultats.splice(0);
                    this._motATrouver = "";
                    this._compositionMotATrouver = {};
                    this._finDePartiePanel = new finDePartiePanel_1.default(this._datePartieEnCours, this._panelManager, this);
                    this.choisirMot()
                        .then(function (mot) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this._motATrouver = mot;
                            this._input = new input_1.default(this, this._config, this._motATrouver.length);
                            this._panelManager.setInput(this._input);
                            this._grille = new grille_1.default(this._motATrouver.length, this._maxNbPropositions, this._audioPanel);
                            this._configurationPanel.setInput(this._input);
                            this._compositionMotATrouver = this.decompose(this._motATrouver);
                            // On ne relance pas le chrono depuis zéro : le temps de la partie
                            // continue entre « Rejouer » et la partie suivante.
                            this.relancerChrono();
                            return [2 /*return*/];
                        });
                    }); })
                        .catch(function () { return notificationMessage_1.default.ajouterNotification("Aucun mot n'a été trouvé pour aujourd'hui"); });
                    return [2 /*return*/];
                });
            });
        };
        Gestionnaire.prototype.choisirMot = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, dictionnaire_1.default.getMot(this._idPartieEnCours, this._datePartieEnCours)];
                });
            });
        };
        return Gestionnaire;
    }());
    exports.default = Gestionnaire;
});
//# sourceMappingURL=gestionnaire.js.map