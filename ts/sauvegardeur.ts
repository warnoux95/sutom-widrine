import Configuration from "./entites/configuration";
import PartieEnCours from "./entites/partieEnCours";
import SauvegardePartie from "./entites/sauvegardePartie";
import SauvegardeStats from "./entites/sauvegardeStats";
import LienHelper from "./lienHelper";
import NotificationMessage from "./notificationMessage";

export default class Sauvegardeur {
  private static readonly _cleStats = "statistiques";
  private static readonly _clePartieEnCours = "partieEnCours";
  private static readonly _cleConfiguration = "configuration";

  public static sauvegarderStats(stats: SauvegardeStats): void {
    localStorage.setItem(this._cleStats, JSON.stringify(stats));
  }

  public static chargerSauvegardeStats(): SauvegardeStats | undefined {
    const contenuLocation = LienHelper.extraireInformation("s");

    if (contenuLocation) {
      const donneesDepuisLien = Sauvegardeur.chargerInformationDepuisLien(contenuLocation);
      window.location.hash = "";
      if (donneesDepuisLien) {
        NotificationMessage.ajouterNotification("Statistiques chargés avec succès.");
        Sauvegardeur.sauvegarderStats(donneesDepuisLien);
        return donneesDepuisLien;
      }

      NotificationMessage.ajouterNotification("Impossible de charger les statistiques depuis le lien.");
    }

    const dataStats = localStorage.getItem(this._cleStats);
    if (!dataStats) return;

    let stats = JSON.parse(dataStats) as SauvegardeStats;
    return stats;
  }

  public static sauvegarderPartieEnCours(idPartie: string, datePartie: Date, propositions: Array<string>, dateFinPartie?: Date): void {
    let partieEnCours: SauvegardePartie = {
      propositions: propositions,
      datePartie,
      dateFinPartie,
      idPartie,
    };
    localStorage.setItem(this._clePartieEnCours, JSON.stringify(partieEnCours));
  }

  public static chargerSauvegardePartieEnCours(): PartieEnCours | undefined {
    let dataPartieEnCours = localStorage.getItem(this._clePartieEnCours);
    if (!dataPartieEnCours) return;

    let partieEnCours = JSON.parse(dataPartieEnCours) as SauvegardePartie;
    let aujourdhui = new Date();
    let datePartieEnCours = new Date(partieEnCours.datePartie);
    if (
      aujourdhui.getDate() !== datePartieEnCours.getDate() ||
      aujourdhui.getMonth() !== datePartieEnCours.getMonth() ||
      aujourdhui.getFullYear() !== datePartieEnCours.getFullYear()
    ) {
      localStorage.removeItem(this._clePartieEnCours);
      return;
    }
    let dateFinPartie = partieEnCours.dateFinPartie === undefined ? undefined : new Date(partieEnCours.dateFinPartie);

    return {
      datePartie: datePartieEnCours,
      dateFinPartie: dateFinPartie,
      propositions: partieEnCours.propositions,
      idPartie: partieEnCours.idPartie,
    };
  }

  public static sauvegarderConfig(config: Configuration): void {
    localStorage.setItem(this._cleConfiguration, JSON.stringify(config));
  }

  public static chargerConfig(): Configuration | null {
    let dataConfig = localStorage.getItem(this._cleConfiguration);
    if (!dataConfig) return null;

    let config = JSON.parse(dataConfig) as Configuration;
    return config;
  }

  public static genererLien(): string {
    const stats = Sauvegardeur.chargerSauvegardeStats() ?? SauvegardeStats.Default;
    return [
      stats.repartition[1],
      stats.repartition[2],
      stats.repartition[3],
      stats.repartition[4],
      stats.repartition[5],
      stats.repartition[6],
      stats.repartition["-"],
      stats.lettresRepartitions.bienPlace,
      stats.lettresRepartitions.malPlace,
      stats.lettresRepartitions.nonTrouve,
      stats.dernierePartie,
    ].join(",");
  }

  private static chargerInformationDepuisLien(contenu: string): SauvegardeStats | null {
    const [
      UnCoupString,
      DeuxCoupsString,
      TroisCoupsString,
      QuatreCoupsString,
      CinqCoupsString,
      SixCoupsString,
      PerduString,
      LettresBienPlaceesString,
      LettresMalPlaceesString,
      LettresNonTrouveString,
      dernierePartie,
    ] = contenu.split(",");

    const UnCoup = parseInt(UnCoupString);
    const DeuxCoups = parseInt(DeuxCoupsString);
    const TroisCoups = parseInt(TroisCoupsString);
    const QuatreCoups = parseInt(QuatreCoupsString);
    const CinqCoups = parseInt(CinqCoupsString);
    const SixCoups = parseInt(SixCoupsString);
    const Perdu = parseInt(PerduString);
    const LettresBienPlacees = parseInt(LettresBienPlaceesString);
    const LettresMalPlacees = parseInt(LettresMalPlaceesString);
    const LettresNonTrouve = parseInt(LettresNonTrouveString);

    return {
      dernierePartie: new Date(dernierePartie),
      partiesJouees: UnCoup + DeuxCoups + TroisCoups + QuatreCoups + CinqCoups + SixCoups + Perdu,
      partiesGagnees: UnCoup + DeuxCoups + TroisCoups + QuatreCoups + CinqCoups + SixCoups,
      repartition: {
        1: UnCoup,
        2: DeuxCoups,
        3: TroisCoups,
        4: QuatreCoups,
        5: CinqCoups,
        6: SixCoups,
        "-": Perdu,
      },
      lettresRepartitions: {
        bienPlace: LettresBienPlacees,
        malPlace: LettresMalPlacees,
        nonTrouve: LettresNonTrouve,
      },
    };
  }
}
