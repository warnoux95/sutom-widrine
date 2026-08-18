var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./notificationMessage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var notificationMessage_1 = __importDefault(require("./notificationMessage"));
    var CopieHelper = /** @class */ (function () {
        function CopieHelper() {
        }
        CopieHelper.attacheBoutonCopieLien = function (bouton, lien, messageSucces) {
            bouton.addEventListener("click", function (event) {
                event.stopPropagation();
                new Promise(function (resolve, reject) {
                    if (window.navigator.clipboard !== undefined) {
                        return resolve(window.navigator.clipboard.writeText(lien));
                    }
                    return reject();
                })
                    .catch(function () {
                    return new Promise(function (resolve, reject) {
                        if (window.navigator.share !== undefined)
                            return resolve(navigator.share({ text: lien }));
                        return reject();
                    });
                })
                    .then(function () {
                    notificationMessage_1.default.ajouterNotificationPanel(messageSucces, bouton);
                })
                    .catch(function (raison) {
                    notificationMessage_1.default.ajouterNotificationPanel("Votre navigateur n'est pas compatible.", bouton);
                });
            });
        };
        CopieHelper.creerBoutonPartage = function (idBouton, label) {
            return this.creerBoutonAvecIcone(idBouton, "#icone-copie", label);
        };
        CopieHelper.creerBoutonAvecIcone = function (idBouton, icone, label) {
            var lien = document.createElement("a");
            lien.id = idBouton;
            lien.className = "bouton-partage";
            lien.href = "#";
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            var useSvg = document.createElementNS("http://www.w3.org/2000/svg", "use");
            useSvg.setAttribute("href", icone);
            useSvg.setAttribute("stroke", "var(--couleur-icone)");
            useSvg.setAttribute("fill", "var(--couleur-icone)");
            svg.appendChild(useSvg);
            lien.appendChild(svg);
            if (label) {
                var texteBouton = document.createElement("span");
                texteBouton.className = "bouton-partage-texte";
                texteBouton.innerText = label;
                lien.appendChild(texteBouton);
            }
            return lien;
        };
        return CopieHelper;
    }());
    exports.default = CopieHelper;
});
//# sourceMappingURL=copieHelper.js.map