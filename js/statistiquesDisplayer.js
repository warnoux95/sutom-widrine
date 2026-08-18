var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./copieHelper", "./tempsHelper"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var copieHelper_1 = __importDefault(require("./copieHelper"));
    var tempsHelper_1 = __importDefault(require("./tempsHelper"));
    var StatistiquesDisplayer = /** @class */ (function () {
        function StatistiquesDisplayer() {
        }
        StatistiquesDisplayer.genererResumeTexte = function (texte) {
            var area = document.createElement("div");
            var titre = document.createElement("h3");
            titre.innerText = "Résumé de la partie";
            titre.appendChild(copieHelper_1.default.creerBoutonPartage("fin-de-partie-panel-resume-bouton", "Partager"));
            area.appendChild(titre);
            var resumeArea = document.createElement("pre");
            resumeArea.id = "fin-de-partie-panel-resume";
            resumeArea.innerHTML = texte;
            area.appendChild(resumeArea);
            return area;
        };
        StatistiquesDisplayer.genererHtmlStats = function (stats) {
            var statsArea = document.createElement("div");
            statsArea.className = "stats-area";
            var titre = document.createElement("h3");
            titre.innerText = "Statistiques";
            titre.appendChild(copieHelper_1.default.creerBoutonPartage("fin-de-partie-panel-stats-bouton", "Partager"));
            statsArea.appendChild(titre);
            var statsParties = document.createElement("div");
            statsParties.className = "stats-parties";
            var max = this.getMax(stats.repartition);
            statsParties.appendChild(this.creerBar("1", stats.repartition[1], max));
            statsParties.appendChild(this.creerBar("2", stats.repartition[2], max));
            statsParties.appendChild(this.creerBar("3", stats.repartition[3], max));
            statsParties.appendChild(this.creerBar("4", stats.repartition[4], max));
            statsParties.appendChild(this.creerBar("5", stats.repartition[5], max));
            statsParties.appendChild(this.creerBar("6", stats.repartition[6], max));
            statsParties.appendChild(this.creerBar("-", stats.repartition["-"], max));
            statsParties.appendChild(this.creerLigneValeur("Nombre total de parties jouées", this.intToString(stats.partiesJouees)));
            statsArea.appendChild(statsParties);
            var statsNumeriques = document.createElement("div");
            statsNumeriques.className = "stats-numeriques-area";
            statsNumeriques.appendChild(this.creerStatNumerique("Victoires", this.intToString(stats.partiesGagnees), this.intToString(stats.partiesJouees)));
            statsNumeriques.appendChild(this.creerStatNumerique("Moyenne coups", this.intToString(this.getMoyenne(stats.repartition))));
            statsNumeriques.appendChild(this.creerStatNumerique('Lettres <span class="emoji-carre-rouge">🟥</span>', this.intToString(stats.lettresRepartitions.bienPlace)));
            statsNumeriques.appendChild(this.creerStatNumerique('Lettres <span class="emoji-cercle-jaune">🟡</span>', this.intToString(stats.lettresRepartitions.malPlace)));
            statsNumeriques.appendChild(this.creerStatNumerique('Lettres <span class="emoji-carre-bleu">🟦</span>', this.intToString(stats.lettresRepartitions.nonTrouve)));
            if (stats.temps && stats.temps.nbParties > 0)
                statsNumeriques.appendChild(this.creerStatNumerique("Temps moyen", tempsHelper_1.default.genererTempsHumain(stats.temps.moyenne)));
            statsArea.appendChild(statsNumeriques);
            return statsArea;
        };
        StatistiquesDisplayer.creerLigneValeur = function (label, valeur) {
            var ligne = document.createElement("div");
            ligne.className = "stats-ligne";
            ligne.appendChild(this.creerDivLabel(label, true));
            ligne.appendChild(this.creerDivValeur(valeur));
            return ligne;
        };
        StatistiquesDisplayer.creerBar = function (label, valeur, max) {
            var ligne = document.createElement("div");
            ligne.className = "stats-ligne";
            ligne.appendChild(this.creerDivLabel(label));
            var barAreaDiv = document.createElement("div");
            barAreaDiv.className = "stats-bar-area";
            var barDiv = document.createElement("div");
            barDiv.className = "stats-bar";
            var longueurEnPourcent = Math.round((valeur / max) * 100);
            if (valeur === max)
                barDiv.classList.add("bar-max");
            barDiv.style.width = longueurEnPourcent === 0 ? "0px" : "calc(".concat(longueurEnPourcent, "% - 2px)");
            barAreaDiv.appendChild(barDiv);
            ligne.appendChild(barAreaDiv);
            ligne.appendChild(this.creerDivValeur(this.intToString(valeur)));
            return ligne;
        };
        StatistiquesDisplayer.creerDivLabel = function (label, isDouble) {
            if (isDouble === void 0) { isDouble = false; }
            var labelDiv = document.createElement("div");
            labelDiv.classList.add("stats-label");
            if (isDouble)
                labelDiv.classList.add("stats-label-double");
            labelDiv.innerText = label;
            return labelDiv;
        };
        StatistiquesDisplayer.creerDivValeur = function (valeur) {
            var valeurDiv = document.createElement("div");
            valeurDiv.className = "stats-valeur";
            valeurDiv.innerText = valeur.toString();
            return valeurDiv;
        };
        StatistiquesDisplayer.creerStatNumerique = function (label, valeur, valeurSecondaire) {
            var caseDiv = document.createElement("div");
            caseDiv.className = "stats-numerique-case";
            var valeurDiv = document.createElement("div");
            valeurDiv.className = "stats-numerique-case-valeur";
            valeurDiv.innerText = valeur;
            caseDiv.appendChild(valeurDiv);
            if (valeurSecondaire !== undefined) {
                var secondaireDiv = document.createElement("div");
                secondaireDiv.className = "stats-numerique-case-secondaire";
                secondaireDiv.innerText = valeurSecondaire;
                caseDiv.appendChild(secondaireDiv);
            }
            var labelDiv = document.createElement("div");
            labelDiv.className = "stats-numerique-case-label";
            labelDiv.innerHTML = label;
            caseDiv.appendChild(labelDiv);
            return caseDiv;
        };
        StatistiquesDisplayer.intToString = function (valeur) {
            return valeur.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
        };
        StatistiquesDisplayer.getMax = function (repartition) {
            return Math.max(repartition[1], repartition[2], repartition[3], repartition[4], repartition[5], repartition[6], repartition["-"]);
        };
        StatistiquesDisplayer.getMoyenne = function (repartition) {
            return ((repartition[1] * 1 + repartition[2] * 2 + repartition[3] * 3 + repartition[4] * 4 + repartition[5] * 5 + repartition[6] * 6 + repartition["-"] * 6) /
                (repartition[1] + repartition[2] + repartition[3] + repartition[4] + repartition[5] + repartition[6] + repartition["-"]));
        };
        return StatistiquesDisplayer;
    }());
    exports.default = StatistiquesDisplayer;
});
//# sourceMappingURL=statistiquesDisplayer.js.map