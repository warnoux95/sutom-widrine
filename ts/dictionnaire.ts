import GistDatabase from "./gistDatabase";

export default class Dictionnaire {
  private static readonly _db = GistDatabase.instance;

  private static readonly _descriptionsParPrenom: { [prenom: string]: string } = {    PHILOMENE:
      '<strong>Philomène</strong> est un prénom féminin d\'origine grecque, issu de <em>Philoménê</em>, signifiant « celle qui aime la force » ou « amie de la puissance ». Élégant et intemporel, il évoque une personnalité sensible, déterminée et bienveillante. Rare aujourd\'hui, Philomène séduit par son charme classique et son caractère authentique. Souvent associé à la douceur, à l\'intelligence et à la persévérance, ce prénom inspire confiance et sérénité. Il traverse les générations avec une touche de raffinement, tout en restant original et plein de caractère.',
  };

  /** Le prénom à deviner est FIXE : un prénom féminin de 9 lettres. */
  private static readonly _motATrouverFixe = "PHILOMENE";

  public constructor() {}

  public static async getMot(idPartie: string, datePartie: Date): Promise<string> {
    // Le prénom à deviner est toujours le même : PHILOMENE.
    // Il est défini en dur, il n'est plus lu depuis le Gist.
    return this._motATrouverFixe;
  }

  public static getDescription(mot: string): string | null {
    const motNettoye = this.nettoyerMot(mot);
    return this._descriptionsParPrenom[motNettoye] ?? null;
  }

  public static async estMotValide(mot: string, premiereLettre: string, longueur: number): Promise<boolean> {
    mot = this.nettoyerMot(mot);
    let dictionnaire = await this.chargerDictionnaire();
    return mot.length === longueur && dictionnaire.includes(mot);
  }

  private static async chargerDictionnaire(): Promise<Array<string>> {
    // Le dictionnaire est intégré au code : uniquement des prénoms
    // féminins de 9 lettres (le prénom à deviner est forcément de
    // 9 lettres). Il n'est plus chargé depuis le Gist.
    return [
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
    ];
  }

  public static nettoyerMot(mot: string): string {
    return mot
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }
}
