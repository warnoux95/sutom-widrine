/**
 * Accès au Gist GitHub EN DIRECT depuis le navigateur (version STATIQUE).
 *
 * ⚠️ VERSION POUR SERVEUR SANS NODE : le token et le gistId sont embarqués
 * dans le JS client, donc VISIBLES par quiconque ouvre la console du
 * navigateur. Acceptable uniquement pour un serveur interne d'entreprise
 * dont la sécurité est négligée. Ne pas utiliser sur un site public.
 *
 * Le token N'EST PAS en dur ici : il est lu depuis js/token.json
 * (injecté par deploy.sh depuis config/token.json, jamais commité).
 * En local (fichier absent) le fallback est le placeholder, donc la
 * lecture du gist public fonctionne mais l'écriture est désactivée.
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

    // Récupère le token depuis js/token.json (chargé au démarrage), avec
    // repli sur la constante ci-dessus si le fichier est absent (local).
    var GIST_TOKEN = null;

    function chargerToken() {
        if (GIST_TOKEN !== null) return Promise.resolve(GIST_TOKEN);
        return fetch("js/token.json", { cache: "no-store" })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (cfg) {
                GIST_TOKEN = (cfg && cfg.token) ? cfg.token : GIST_TOKEN_CONFIG;
                return GIST_TOKEN;
            })
            .catch(function () {
                GIST_TOKEN = GIST_TOKEN_CONFIG;
                return GIST_TOKEN;
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
