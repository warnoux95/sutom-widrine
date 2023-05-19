import SauvegardeStats from "./entites/sauvegardeStats";

export default class StatistiquesDisplayer {
  private readonly _stats: SauvegardeStats;

  public constructor(statistiques: SauvegardeStats) {
    this._stats = statistiques;
  }

  public genererHtmlStats(): HTMLElement {
    /*
contenu +=
        '<p>Statistiques</p><div class="stats-area"><div class="stats-ligne"><div class="stats-cellule">Parties :</div>' +
        `<div class="stats-cellule">${stats.partiesGagnees}/${stats.partiesJouees}</div>` +
        "</div>" +
        `<div class="stats-ligne"><div class="stats-cellule">1/6 :</div><div class="stats-cellule">${stats.repartition[1]}</div></div>` +
        `<div class="stats-ligne"><div class="stats-cellule">2/6 :</div><div class="stats-cellule">${stats.repartition[2]}</div></div>` +
        `<div class="stats-ligne"><div class="stats-cellule">3/6 :</div><div class="stats-cellule">${stats.repartition[3]}</div></div>` +
        `<div class="stats-ligne"><div class="stats-cellule">4/6 :</div><div class="stats-cellule">${stats.repartition[4]}</div></div>` +
        `<div class="stats-ligne"><div class="stats-cellule">5/6 :</div><div class="stats-cellule">${stats.repartition[5]}</div></div>` +
        `<div class="stats-ligne"><div class="stats-cellule">6/6 :</div><div class="stats-cellule">${stats.repartition[6]}</div></div>` +
        `<div class="stats-ligne"><div class="stats-cellule">-/6 :</div><div class="stats-cellule">${stats.repartition["-"]}</div></div>` +
        `<div class="stats-ligne"><div class="stats-cellule">Moyenne :</div><div class="stats-cellule">${this.getMoyenne(stats.repartition)}</div></div>` +
        '<div class="stats-ligne"><div class="stats-cellule">Lettres :</div>' +
        '<div class="stats-cellule">' +
        `${stats.lettresRepartitions.bienPlace} 🟥 ` +
        `${stats.lettresRepartitions.malPlace} 🟡 ` +
        `${stats.lettresRepartitions.nonTrouve} 🟦` +
        "</div>" +
        "</div>" +
        "</div>";
        */

    const statsArea = document.createElement("div");
    statsArea.className = "stats-area";

    const titre = document.createElement("h3");
    titre.innerText = "Statistiques";
    statsArea.appendChild(titre);

    const statsParties = document.createElement("div");
    statsParties.className = "stats-parties";

    const max = Math.max(
      this._stats.repartition[1],
      this._stats.repartition[2],
      this._stats.repartition[3],
      this._stats.repartition[4],
      this._stats.repartition[5],
      this._stats.repartition[6],
      this._stats.repartition["-"]
    );

    statsParties.appendChild(this.creerBar("1", this._stats.repartition[1], max));
    statsParties.appendChild(this.creerBar("2", this._stats.repartition[2], max));
    statsParties.appendChild(this.creerBar("3", this._stats.repartition[3], max));
    statsParties.appendChild(this.creerBar("4", this._stats.repartition[4], max));
    statsParties.appendChild(this.creerBar("5", this._stats.repartition[5], max));
    statsParties.appendChild(this.creerBar("6", this._stats.repartition[6], max));
    statsParties.appendChild(this.creerBar("-", this._stats.repartition["-"], max));

    statsArea.appendChild(statsParties);

    const statsNumeriques = document.createElement("div");
    statsNumeriques.className = "stats-numeriques-area";

    statsNumeriques.appendChild(this.creerStatNumerique("Victoires", this._stats.partiesGagnees, this._stats.partiesJouees));
    statsNumeriques.appendChild(this.creerStatNumerique("Moyenne", this.getMoyenne(this._stats.repartition)));
    statsNumeriques.appendChild(this.creerStatNumerique("Lettres 🟥", this._stats.lettresRepartitions.bienPlace));
    statsNumeriques.appendChild(this.creerStatNumerique("Lettres 🟡", this._stats.lettresRepartitions.malPlace));
    statsNumeriques.appendChild(this.creerStatNumerique("Lettres 🟦", this._stats.lettresRepartitions.nonTrouve));

    statsArea.appendChild(statsNumeriques);

    return statsArea;
  }

  private creerBar(label: string, valeur: number, max: number): HTMLElement {
    const ligne = document.createElement("div");
    ligne.className = "stats-ligne";

    const labelDiv = document.createElement("div");
    labelDiv.className = "stats-label";
    labelDiv.innerText = label;
    ligne.appendChild(labelDiv);

    const barAreaDiv = document.createElement("div");
    barAreaDiv.className = "stats-bar-area";

    const barDiv = document.createElement("div");
    barDiv.className = "stats-bar";

    const longueurEnPourcent = Math.round((valeur / max) * 100);
    if (valeur === max) barDiv.classList.add("bar-max");

    barDiv.style.width = longueurEnPourcent === 0 ? "0px" : `calc(${longueurEnPourcent}% - 2px)`;
    barAreaDiv.appendChild(barDiv);
    ligne.appendChild(barAreaDiv);

    const valeurDiv = document.createElement("div");
    valeurDiv.className = "stats-valeur";
    valeurDiv.innerText = valeur.toString();
    ligne.appendChild(valeurDiv);

    return ligne;
  }

  private creerStatNumerique(label: string, valeur: number, valeurSecondaire?: number): HTMLElement {
    const caseDiv = document.createElement("div");
    caseDiv.className = "stats-numerique-case";

    const valeurDiv = document.createElement("div");
    valeurDiv.className = "stats-numerique-case-valeur";
    valeurDiv.innerText = valeur.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
    caseDiv.appendChild(valeurDiv);

    if (valeurSecondaire !== undefined) {
      const secondaireDiv = document.createElement("div");
      secondaireDiv.className = "stats-numerique-case-secondaire";
      secondaireDiv.innerText = valeurSecondaire.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
      caseDiv.appendChild(secondaireDiv);
    }

    const labelDiv = document.createElement("div");
    labelDiv.className = "stats-numerique-case-label";
    labelDiv.innerText = label;
    caseDiv.appendChild(labelDiv);

    return caseDiv;
  }

  private getMoyenne(repartition: { 1: number; 2: number; 3: number; 4: number; 5: number; 6: number; "-": number }): number {
    return (
      (repartition[1] * 1 + repartition[2] * 2 + repartition[3] * 3 + repartition[4] * 4 + repartition[5] * 5 + repartition[6] * 6 + repartition["-"] * 6) /
      (repartition[1] + repartition[2] + repartition[3] + repartition[4] + repartition[5] + repartition[6] + repartition["-"])
    );
  }
}
