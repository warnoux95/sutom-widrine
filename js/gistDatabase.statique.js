/**
 * Accès au Gist GitHub EN DIRECT depuis le navigateur (version STATIQUE).
 *
 * ⚠️ VERSION POUR SERVEUR SANS NODE : le token est lu depuis un fichier
 * hébergé sur wa95.free.fr (pas dans ce dépôt, donc pas de révocation
 * GitHub). Acceptable pour un usage interne/intranet.
 *
 * Le token est chargé via <script src="http://wa95.free.fr/token.js">
 * (pas de CORS pour un script). Si le script est indisponible, repli sur
 * le placeholder : lecture du gist public OK, écriture désactivée.
 *
 * Même contrat que la version proxy (`/api/gist-file`) :
 *   - lireFichier(nom)   → Promise<string|null> : contenu du fichier
 *   - ecrireFichier(nom, contenu) → Promise<boolean> (PATCH GitHub)
 * Singleton + file d'écriture (mutex) pour éviter les erreurs 409.
 */
var GIST_TOKEN_CONFIG = "GIST_TOKEN_A_CONFIGURER";

define([], function () {
    "use strict";

    var GIST_ID = "a76cd1c3e253e531a7ddeaf5f58296b4";
    var URL_TOKEN_EXTERNE = "http://wa95.free.fr/token.js";

    // Récupère le token depuis le script externe (chargé une seule fois),
    // avec repli sur la constante ci-dessous si le script est indisponible.
    var GIST_TOKEN = null;

    function chargerToken() {
        if (GIST_TOKEN !== null) return Promise.resolve(GIST_TOKEN);
        return new Promise(function (resoudre) {
            var elementScript = document.createElement("script");
            elementScript.src = URL_TOKEN_EXTERNE;
            elementScript.onload = function () {
                GIST_TOKEN = window.SUTOM_GIST_TOKEN || GIST_TOKEN_CONFIG;
                resoudre(GIST_TOKEN);
            };
            elementScript.onerror = function () {
                GIST_TOKEN = GIST_TOKEN_CONFIG;
                resoudre(GIST_TOKEN);
            };
            document.head.appendChild(elementScript);
        });
    }

    function lireFichier(nomFichier) {
        var url = "https://api.github.com/gists/" + GIST_ID;
        return chargerToken().then(function (token) {
            return fetch(url, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/vnd.github+json",
                    "User-Agent": "sutom",
                },
            })
                .then(function (reponse) {
                    if (!reponse.ok) throw new Error("HTTP " + reponse.status);
                    return reponse.json();
                })
                .then(function (body) {
                    var fichier = body.files && body.files[nomFichier];
                    return fichier ? fichier.content : null;
                })
                .catch(function () {
                    return null;
                });
        });
    }

    function ecrireFichier(nomFichier, contenu) {
        var fichiers = {};
        fichiers[nomFichier] = { content: contenu };
        return chargerToken().then(function (token) {
            return fetch("https://api.github.com/gists/" + GIST_ID, {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/vnd.github+json",
                    "Content-Type": "application/json",
                    "User-Agent": "sutom",
                },
                body: JSON.stringify({
                    description: "SUTOM database",
                    public: false,
                    files: fichiers,
                }),
            })
                .then(function (reponse) {
                    return reponse.ok;
                })
                .catch(function () {
                    return false;
                });
        });
    }

    var GistDatabase = (function () {
        function GistDatabase() {
            this._fileEcriture = Promise.resolve();
        }

        GistDatabase.prototype._enqueue = function (operation) {
            var resultat = this._fileEcriture.then(operation, operation);
            this._fileEcriture = resultat.catch(function () { return undefined; });
            return resultat;
        };

        GistDatabase.prototype.ecrire = function (operation) {
            return this._enqueue(operation);
        };

        GistDatabase.prototype.lireFichier = function (nomFichier) {
            // Lecture DIRECTE (GET GitHub) : ne PAS passer par la file, sinon
            // deadlock quand une opération sérialisée lit à l'intérieur.
            return lireFichier(nomFichier);
        };

        GistDatabase.prototype.ecrireFichier = function (nomFichier, contenu) {
            return ecrireFichier(nomFichier, contenu);
        };

        GistDatabase._instance = new GistDatabase();
        return GistDatabase;
    }());

    Object.defineProperty(GistDatabase, "instance", {
        get: function () { return GistDatabase._instance; },
        enumerable: false,
        configurable: true,
    });

    return GistDatabase;
});
