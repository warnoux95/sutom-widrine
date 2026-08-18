var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./donneesJoueurs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var donneesJoueurs_1 = __importDefault(require("./donneesJoueurs"));
    /**
     * Classement stocké dans le fichier UNIQUE `leaderboard.json` du Gist,
     * indexé par le pseudo du joueur (en majuscules).
     *
     * Chaque entrée ne contient que TROIS champs : `nombreEssais` (total de
     * mots proposés, toutes parties confondues), `temps` (meilleur temps
     * final en millisecondes) et `aTrouveLeMot` (true si le joueur a déjà
     * trouvé le mot). La configuration et les statistiques ne sont PAS
     * enregistrées dans le Gist.
     * La lecture + écriture est enchaînée dans la file d'écriture du Gist
     * (GitHub rejette les écritures simultanées, erreur 409).
     */
    var GistLeaderboard = /** @class */ (function () {
        function GistLeaderboard() {
        }
        /**
         * Incrémente de 1 le compteur d'essais du joueur dans le Gist,
         * à chaque mot validé dans la grille. Le temps et le booléen
         * `aTrouveLeMot` sont préservés.
         */
        GistLeaderboard.prototype.incrementerEssais = function (prenom) {
            return donneesJoueurs_1.default.mettreAJour(prenom, function (entree) { return ({
                nombreEssais: (entree.nombreEssais || 0) + 1,
                temps: entree.temps || 0,
                aTrouveLeMot: entree.aTrouveLeMot === true,
            }); });
        };
        /**
         * Enregistre le résultat d'une partie pour un joueur : garde le
         * meilleur temps (le plus petit) et passe `aTrouveLeMot` à true si
         * le mot a été trouvé (il reste true ensuite). Le compteur d'essais
         * est déjà incrémenté à chaque proposition.
         */
        GistLeaderboard.prototype.enregistrerResultat = function (prenom, dureeMs, aTrouveLeMot) {
            return donneesJoueurs_1.default.mettreAJour(prenom, function (entree) {
                var _a;
                var tempsExistant = entree.temps > 0 ? entree.temps : Number.MAX_SAFE_INTEGER;
                return {
                    // On ne doit pas écraser le compteur d'essais déjà incrémenté
                    // à chaque proposition.
                    nombreEssais: (_a = entree.nombreEssais) !== null && _a !== void 0 ? _a : 0,
                    temps: Math.min(tempsExistant, dureeMs),
                    aTrouveLeMot: entree.aTrouveLeMot === true || aTrouveLeMot,
                };
            });
        };
        return GistLeaderboard;
    }());
    exports.default = GistLeaderboard;
});
//# sourceMappingURL=gistLeaderboard.js.map