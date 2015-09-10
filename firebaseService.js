/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/firebase/firebase.d.ts" />
define(["require", "exports"], function (require, exports) {
    var FirebaseService = (function () {
        function FirebaseService() {
            this.highscore = new Firebase('https://findimpactfrontend.firebaseio.com/highscore');
        }
        return FirebaseService;
    })();
    exports.FirebaseService = FirebaseService;
});
//# sourceMappingURL=firebaseService.js.map