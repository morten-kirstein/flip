/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/firebase/firebase.d.ts" />

export class FirebaseService {
    highscore: Firebase;
    constructor() {
        this.highscore = new Firebase('https://findimpactfrontend.firebaseio.com/highscore');
    }
}