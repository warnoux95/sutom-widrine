/**
 * Accès au Gist GitHub EN DIRECT depuis le navigateur (version STATIQUE).
 *
 * ⚠️ VERSION POUR SERVEUR SANS NODE : le token et le gistId sont embarqués
 * dans le JS client, donc VISIBLES par quiconque ouvre la console du
 * navigateur. Acceptable uniquement pour un serveur interne d'entreprise
 * dont la sécurité est négligée. Ne pas utiliser sur un site public.
 *
 * Même contrat que la version proxy (`/api/gist-file`) :
 *   - lireFichier(nom)   → Promise<string|null> : contenu du fichier
 *   - ecrireFichier(nom, contenu) → Promise<boolean> (PATCH GitHub)
 * Singleton + file d'écriture (mutex) pour éviter les erreurs 409.
 */
var GIST_TOKEN_CONFIG = "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";

define([], function () {
    "use strict";

    var GIST_ID = "a76cd1c3e253e531a7ddeaf5f58296b4";
    var GIST_TOKEN = GIST_TOKEN_CONFIG;

    function lireFichier(nomFichier) {
        var url = "https://api.github.com/gists/" + GIST_ID;
        return fetch(url, {
            headers: {
                Authorization: "Bearer " + GIST_TOKEN,
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
    }

    function ecrireFichier(nomFichier, contenu) {
        var fichiers = {};
        fichiers[nomFichier] = { content: contenu };
        return fetch("https://api.github.com/gists/" + GIST_ID, {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + GIST_TOKEN,
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