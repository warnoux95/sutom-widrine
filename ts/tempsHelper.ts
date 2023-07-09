export default class TempsHelper {
  public static genererTempsHumain(dureeMs: number): string {
    // Note : Durée est en millisecondes.
    let duree = Math.floor(dureeMs / 1000);
    let retour = "";

    if (duree >= 3600) {
      retour += Math.floor(duree / 3600) + "h";
    }

    retour +=
      Math.floor((duree / 60) % 60)
        .toString()
        .padStart(2, "0") + ":";
    retour += Math.floor(duree % 60)
      .toString()
      .padStart(2, "0");

    return retour;
  }
}
