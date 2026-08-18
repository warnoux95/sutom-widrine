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
    var ReglesPanel = /** @class */ (function () {
        function ReglesPanel(panelManager, onValider) {
            var _this = this;
            this._panelManager = panelManager;
            this._rulesBouton = document.getElementById("configuration-regles-bouton");
            this._onValider = onValider;
            this._rulesBouton.addEventListener("click", (function () {
                _this.afficher();
            }).bind(this));
        }
        ReglesPanel.prototype.afficher = function () {
            return __awaiter(this, void 0, void 0, function () {
                var titre, prenomActuel, contenu, boutonValider, inputPrenom, valider, validerSurEntree;
                var _this = this;
                return __generator(this, function (_a) {
                    titre = "Règles";
                    prenomActuel = "";
                    contenu = "<p>" +
                        "Vous avez six essais pour deviner le prénom de notre fille, en 9 lettres.<br />" +
                        "</p>" +
                        '<div class="regles-panel-prenom">' +
                        '<label for="prenom-joueur">Votre prénom : </label>' +
                        '<input id="prenom-joueur" type="text" maxlength="30" value="' +
                        prenomActuel +
                        '" placeholder="Entrez votre prénom" autofocus />' +
                        '<button id="prenom-joueur-valider" type="button">Valider</button>' +
                        '</div>' +
                        '<div class="grille">' +
                        '<table role="presentation">' +
                        "<caption>Exemple de proposition</caption>" +
                        '<tr role="group" aria-label="Mot 1 sur 1">' +
                        '<td class="resultat bien-place" aria-label="Lettre S bien placée">S</td>' +
                        '<td class="resultat non-trouve" aria-label="Lettre A non présente">A</td>' +
                        '<td class="resultat non-trouve" aria-label="Lettre L non présente">L</td>' +
                        '<td class="resultat mal-place" aria-label="Lettre U mal placée">U</td>' +
                        '<td class="resultat mal-place" aria-label="Lettre T mal placée">T</td>' +
                        "</tr>" +
                        "</table>" +
                        "</div>" +
                        "<p>" +
                        "Les lettres dans un carré rose sont bien placées.<br />" +
                        "Les lettres dans un cercle orange sont mal placées (mais présentes dans le mot).<br />" +
                        "Les lettres qui restent sur fond crème ne sont pas dans le mot.<br />" +
                        "</div>";
                    this._panelManager.setContenu(titre, contenu);
                    this._panelManager.setClasses(["regles-panel"]);
                    this._panelManager.bloquerFermeture();
                    this._panelManager.setCallbackFermeture(function () {
                        // La fermeture extérieure est bloquée : on ne peut fermer le panneau
                        // qu'avec le bouton « Valider ».
                    });
                    boutonValider = document.getElementById("prenom-joueur-valider");
                    inputPrenom = document.getElementById("prenom-joueur");
                    inputPrenom === null || inputPrenom === void 0 ? void 0 : inputPrenom.focus();
                    valider = function () {
                        var _a;
                        if (!inputPrenom) {
                            return;
                        }
                        var prenom = inputPrenom.value.trim();
                        if (!prenom) {
                            // Champ vide : on reste sur le panneau, le joueur resaisit son prénom.
                            return;
                        }
                        (_a = _this._onValider) === null || _a === void 0 ? void 0 : _a.call(_this, prenom);
                        _this._panelManager.autoriserFermeture();
                        _this._panelManager.cacherPanel();
                        boutonValider === null || boutonValider === void 0 ? void 0 : boutonValider.removeEventListener("click", valider);
                        inputPrenom.removeEventListener("keydown", validerSurEntree);
                    };
                    validerSurEntree = function (evenement) {
                        if (evenement.key === "Enter") {
                            valider();
                        }
                    };
                    if (boutonValider) {
                        boutonValider.addEventListener("click", valider);
                    }
                    inputPrenom === null || inputPrenom === void 0 ? void 0 : inputPrenom.addEventListener("keydown", validerSurEntree);
                    this._panelManager.afficherPanel();
                    return [2 /*return*/];
                });
            });
        };
        return ReglesPanel;
    }());
    exports.default = ReglesPanel;
});
//# sourceMappingURL=reglesPanel.js.map