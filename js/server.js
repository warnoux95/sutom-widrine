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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "express", "http", "https"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var express_1 = __importDefault(require("express"));
    var http_1 = __importDefault(require("http"));
    var https_1 = __importDefault(require("https"));
    var app = (0, express_1.default)();
    var port = parseInt(String(process.env.SUTOM_PORT), 10) || 4200;
    /**
     * Identifiants du Gist : stockés UNIQUEMENT côté serveur.
     * Le token et le gistId ne doivent JAMAIS apparaître dans l'URL du
     * navigateur ni dans les requêtes du client (aucun paramètre d'URL).
     *
     * ⚠️ À sécuriser : ces valeurs sont en dur dans le code serveur.
     */
    var GIST_TOKEN = "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";
    var GIST_ID = "a76cd1c3e253e531a7ddeaf5f58296b4";
    /**
     * Mot de passe unique protégeant la page du classement
     * (`/classement.html`). Stocké UNIQUEMENT côté serveur : il ne doit
     * jamais apparaître dans l'URL, le HTML ou le JS client.
     *
     * ⚠️ À sécuriser : valeur en dur dans le code serveur.
     */
    var CLASSEMENT_MOT_DE_PASSE = "warnoux95";
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var server;
        return __generator(this, function (_a) {
            app.use(function (_requete, reponse, suivant) {
                reponse.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
                reponse.setHeader("Pragma", "no-cache");
                reponse.setHeader("Expires", "0");
                suivant();
            });
            app.use("/", express_1.default.static("public/"));
            app.use("/js", express_1.default.static("public/js/"));
            app.use("/node_modules/requirejs/require.js", express_1.default.static("node_modules/requirejs/require.js"));
            app.use(express_1.default.json());
            // Proxy générique pour l'API GitHub Gists.
            // Le client n'envoie jamais le token ni le gistId : ils sont en dur
            // ci-dessus (GIST_TOKEN / GIST_ID).
            //   GET   /api/gist-file?filename=xxx   → lit le fichier du Gist
            //   PATCH /api/gist-file { filename, content } → écrit un fichier du Gist
            app.all("/api/gist-file", function (requete, reponse) {
                var _a;
                var _b, _c;
                var methode = requete.method || "GET";
                var chemin = "/gists/" + GIST_ID;
                var options = {
                    hostname: "api.github.com",
                    path: chemin,
                    method: methode,
                    headers: {
                        Authorization: "Bearer " + GIST_TOKEN,
                        Accept: "application/vnd.github+json",
                        "Content-Type": "application/json",
                        "User-Agent": "sutom",
                    },
                };
                var requeteApi = https_1.default.request(options, function (reponseApi) {
                    var donnees = "";
                    reponseApi.on("data", function (chunk) {
                        donnees += chunk;
                    });
                    reponseApi.on("end", function () {
                        var _a, _b;
                        var body = {};
                        try {
                            body = donnees ? JSON.parse(donnees) : {};
                        }
                        catch (_erreur) {
                            body = { raw: donnees };
                        }
                        if (reponseApi.statusCode && reponseApi.statusCode >= 200 && reponseApi.statusCode < 300) {
                            if (methode === "GET") {
                                // Extraire le fichier demandé du Gist
                                var filename = requete.query.filename;
                                if (!filename) {
                                    reponse.status(400).json({ error: "Paramètre filename requis pour GET" });
                                    return;
                                }
                                var fichier = (_a = body.files) === null || _a === void 0 ? void 0 : _a[filename];
                                if (!fichier) {
                                    reponse.status(404).json({ error: "Fichier introuvable dans le Gist", filename: filename });
                                    return;
                                }
                                reponse.status(200).json({ content: (_b = fichier.content) !== null && _b !== void 0 ? _b : "" });
                                return;
                            }
                            reponse.status(200).json(body);
                        }
                        else {
                            reponse.status(reponseApi.statusCode || 500).json(body);
                        }
                    });
                });
                requeteApi.on("error", function (erreur) {
                    reponse.status(502).json({ error: "Erreur de communication avec GitHub", details: String(erreur) });
                });
                if (methode === "PATCH") {
                    var filename = (_b = requete.body) === null || _b === void 0 ? void 0 : _b.filename;
                    var content = (_c = requete.body) === null || _c === void 0 ? void 0 : _c.content;
                    if (!filename || content === undefined) {
                        reponse.status(400).json({ error: "filename et content requis pour PATCH" });
                        return;
                    }
                    var payload = {
                        description: "SUTOM database",
                        public: false,
                        files: (_a = {},
                            _a[filename] = { content: content },
                            _a),
                    };
                    requeteApi.write(JSON.stringify(payload));
                }
                requeteApi.end();
            });
            // Classement des joueurs : protégé par mot de passe (côté serveur).
            // Seul le mot de passe est envoyé par le client (POST, jamais dans l'URL).
            //  POST /api/classement { password } → 200 { classement: [...] } ou 401
            app.post("/api/classement", function (requete, reponse) {
                var _a;
                var password = (_a = requete.body) === null || _a === void 0 ? void 0 : _a.password;
                if (password !== CLASSEMENT_MOT_DE_PASSE) {
                    reponse.status(401).json({ error: "Mot de passe incorrect." });
                    return;
                }
                // Lecture du fichier unique du Gist (même mécanique que le proxy).
                var optionsLecture = {
                    hostname: "api.github.com",
                    path: "/gists/" + GIST_ID,
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + GIST_TOKEN,
                        Accept: "application/vnd.github+json",
                        "User-Agent": "sutom",
                    },
                };
                var requeteClassement = https_1.default.request(optionsLecture, function (reponseApi) {
                    var donnees = "";
                    reponseApi.on("data", function (chunk) {
                        donnees += chunk;
                    });
                    reponseApi.on("end", function () {
                        var _a, _b;
                        try {
                            var body = donnees ? JSON.parse(donnees) : {};
                            var contenu = (_b = (_a = body.files) === null || _a === void 0 ? void 0 : _a["leaderboard.json"]) === null || _b === void 0 ? void 0 : _b.content;
                            if (!contenu) {
                                reponse.status(404).json({ error: "Fichier leaderboard.json introuvable dans le Gist" });
                                return;
                            }
                            var joueurs_1 = JSON.parse(contenu);
                            var classement = Object.keys(joueurs_1 || {})
                                .map(function (nomJoueur) {
                                var _a, _b, _c;
                                var entree = joueurs_1[nomJoueur] || {};
                                return {
                                    nomJoueur: nomJoueur,
                                    nombreEssais: (_a = entree.nombreEssais) !== null && _a !== void 0 ? _a : 0,
                                    temps: (_c = (_b = entree.temps) !== null && _b !== void 0 ? _b : entree.meilleurTempsMs) !== null && _c !== void 0 ? _c : 0,
                                    aTrouveLeMot: entree.aTrouveLeMot === true,
                                };
                            })
                                // Tri par meilleur temps d'abord ; les joueurs sans temps (0)
                                // passent en fin de liste.
                                .sort(function (a, b) {
                                var tempsA = a.temps > 0 ? a.temps : Number.MAX_SAFE_INTEGER;
                                var tempsB = b.temps > 0 ? b.temps : Number.MAX_SAFE_INTEGER;
                                return tempsA - tempsB;
                            });
                            reponse.status(200).json({ classement: classement });
                        }
                        catch (_erreur) {
                            reponse.status(500).json({ error: "Impossible de lire le classement" });
                        }
                    });
                });
                requeteClassement.on("error", function (erreur) {
                    reponse.status(502).json({ error: "Erreur de communication avec GitHub", details: String(erreur) });
                });
                requeteClassement.end();
            });
            // Remise à zéro du leaderboard : protégée par le même mot de passe.
            // Écrit `{}` dans leaderboard.json (tous les joueurs sont supprimés).
            //  POST /api/classement/reset { password } → 200 { ok: true } ou 401
            app.post("/api/classement/reset", function (requete, reponse) {
                var _a;
                var password = (_a = requete.body) === null || _a === void 0 ? void 0 : _a.password;
                if (password !== CLASSEMENT_MOT_DE_PASSE) {
                    reponse.status(401).json({ error: "Mot de passe incorrect." });
                    return;
                }
                var optionsEcriture = {
                    hostname: "api.github.com",
                    path: "/gists/" + GIST_ID,
                    method: "PATCH",
                    headers: {
                        Authorization: "Bearer " + GIST_TOKEN,
                        Accept: "application/vnd.github+json",
                        "Content-Type": "application/json",
                        "User-Agent": "sutom",
                    },
                };
                var requeteReset = https_1.default.request(optionsEcriture, function (reponseApi) {
                    var donnees = "";
                    reponseApi.on("data", function (chunk) {
                        donnees += chunk;
                    });
                    reponseApi.on("end", function () {
                        if (reponseApi.statusCode && reponseApi.statusCode >= 200 && reponseApi.statusCode < 300) {
                            reponse.status(200).json({ ok: true, classement: [] });
                        }
                        else {
                            reponse.status(reponseApi.statusCode || 500).json({
                                error: "Impossible de remettre le classement à zéro",
                                details: donnees ? JSON.parse(donnees) : undefined,
                            });
                        }
                    });
                });
                requeteReset.on("error", function (erreur) {
                    reponse.status(502).json({ error: "Erreur de communication avec GitHub", details: String(erreur) });
                });
                requeteReset.write(JSON.stringify({
                    description: "SUTOM database",
                    public: false,
                    files: {
                        "leaderboard.json": { content: "{}\n" },
                    },
                }));
                requeteReset.end();
            });
            server = http_1.default.createServer(app);
            server.listen(port, function () {
                console.log("Jeu d\u00E9marr\u00E9 : http://localhost:".concat(port));
            });
            return [2 /*return*/];
        });
    }); })();
});
//# sourceMappingURL=server.js.map