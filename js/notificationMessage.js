(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NotificationMessage = /** @class */ (function () {
        function NotificationMessage() {
        }
        NotificationMessage.ajouterNotification = function (message) {
            this.ajouterNotificationDiv(this._notificationArea, this._notificationLabel, message);
        };
        NotificationMessage.ajouterNotificationPanel = function (message, origine) {
            this.ajouterNotificationDiv(this._notificationPanelArea, this._notificationPanelLabel, message);
            var _a = origine.getBoundingClientRect(), topParent = _a.top, leftParent = _a.left;
            this._notificationPanelArea.style.top = "".concat(topParent + 30, "px");
            this._notificationPanelArea.style.left = "".concat(leftParent - this._notificationPanelArea.getBoundingClientRect().width / 2, "px");
        };
        NotificationMessage.ajouterNotificationDiv = function (divArea, divLabel, message) {
            var _this = this;
            if (this._currentTimeout) {
                clearTimeout(this._currentTimeout);
                this._currentTimeout = undefined;
            }
            divLabel.innerHTML = message;
            divArea.style.opacity = "1";
            this._currentTimeout = setTimeout((function () {
                divArea.style.opacity = "0";
                _this._currentTimeout = setTimeout((function () {
                    divLabel.innerHTML = "";
                    _this._currentTimeout = undefined;
                }).bind(_this), 1000);
            }).bind(this), 5000);
        };
        NotificationMessage._notificationArea = document.getElementById("notification-area");
        NotificationMessage._notificationLabel = document.getElementById("notification-label");
        NotificationMessage._notificationPanelArea = document.getElementById("panel-fenetre-notification-area");
        NotificationMessage._notificationPanelLabel = document.getElementById("panel-fenetre-notification-label");
        return NotificationMessage;
    }());
    exports.default = NotificationMessage;
});
//# sourceMappingURL=notificationMessage.js.map