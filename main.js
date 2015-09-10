var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/angular2', 'firebaseService'], function (require, exports, angular2_1, firebaseService_1) {
    var HighScore = (function () {
        function HighScore() {
        }
        HighScore.prototype.contructor = function (name, score) {
            this.Name = name;
            this.Score = score;
        };
        return HighScore;
    })();
    var Employee = (function () {
        function Employee() {
        }
        Employee.prototype.contructor = function (name, image) {
            this.Name = name;
            this.Image = image;
        };
        return Employee;
    })();
    var AppComponent = (function () {
        function AppComponent() {
            this.employees = new Array();
            this.tiles = new Array();
            this.selected = new Array();
            this.found = new Array();
            this.score = 0;
            this.HighScore = new firebaseService_1.FirebaseService().highscore;
            //this.addHighScore("sfdfssfd", 40);
            this.addEployee("NIKOLAJ SCHOUBOE", "/assets/nikolaj-schouboe-impact.jpg");
            this.addEployee("MARTIN CHRISTENSEN", "/assets/martin-christensen-impact.jpg");
            this.addEployee("MIKKEL STÆRK", "/assets/IMG_4182.jpg");
            this.addEployee("ANNE SØGAARD", "/assets/anne-soegaard-impact.jpg");
            this.addEployee("MORTEN MOTH", "/assets/IMG_4228.jpg");
            this.addEployee("PER SØNDERGAARD JENSEN", "/assets/per-soendergaard-jensen-impact.jpg");
            this.addEployee("KASPER HYLDAL PEDERSEN", "/assets/kasper-hyldal-pedersen-impact.jpg");
            this.addEployee("JEPPE SKOVSEN", "/assets/jeppe-skovsen-impact.jpg");
            this.addEployee("TALIBANEREN", "/assets/0bb366d.jpg");
            for (var i = 0; i < this.employees.length; i++) {
                this.tiles.push(this.employees[i]);
                this.tiles.push(this.employees[i]);
            }
            this.shuffle();
        }
        AppComponent.prototype.flipTile = function (index) {
            if (this.found.indexOf(index) < 0) {
                this.score += 1;
                if (this.selected.length < 2) {
                    this.selected.push(index);
                    if (this.selected.length == 2) {
                        if (this.tiles[this.selected[0]].Name == this.tiles[this.selected[1]].Name) {
                            this.found.push(this.selected[0]);
                            this.found.push(this.selected[1]);
                            if (this.found.length == this.tiles.length) {
                                this.getHighscore(this.score);
                            }
                        }
                    }
                }
                else {
                    this.selected = new Array();
                    this.selected.push(index);
                }
            }
        };
        AppComponent.prototype.getHighscore = function (score) {
            var _this = this;
            var isThisHighscore = false;
            this.HighScore.orderByChild("Score").limitToFirst(5).once("value", function (val) {
                //   console.log(this, val);
                _this.checkHighscore(val);
            });
        };
        AppComponent.prototype.checkHighscore = function (items) {
            var isThisHighscore = false;
            var currentScore = this.score;
            items.forEach(function (data) {
                var item = data.val();
                if (currentScore < item.Score) {
                    isThisHighscore = true;
                }
                console.log(item.Name, item.Score);
            });
            if (isThisHighscore) {
                var name = prompt("TILLYKKE du nåede highscore listen! din score blev: " + this.score.toString(), "Skriv dit navn her");
                this.addHighScore(name, this.score);
            }
            else {
                alert("din score blev: " + this.score.toString() + ", du kom desværre ikke på highscore listen");
            }
            this.newGame();
        };
        AppComponent.prototype.addEployee = function (name, image) {
            var employee = new Employee();
            employee.Name = name;
            employee.Image = image;
            this.employees.push(employee);
        };
        AppComponent.prototype.newGame = function () {
            this.score = 0;
            this.selected = new Array();
            this.found = new Array();
            this.shuffle();
        };
        AppComponent.prototype.addHighScore = function (name, score) {
            var highscore = new HighScore();
            highscore.Name = name;
            highscore.Score = score;
            this.HighScore.push(highscore);
        };
        AppComponent.prototype.shuffle = function () {
            var currentIndex = this.tiles.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = this.tiles[currentIndex];
                this.tiles[currentIndex] = this.tiles[randomIndex];
                this.tiles[randomIndex] = temporaryValue;
            }
        };
        AppComponent = __decorate([
            angular2_1.Component({
                selector: 'my-app'
            }),
            angular2_1.View({
                directives: [angular2_1.NgFor, angular2_1.NgIf],
                templateUrl: 'mainForm.html'
            })
        ], AppComponent);
        return AppComponent;
    })();
    exports.AppComponent = AppComponent;
    angular2_1.bootstrap(AppComponent);
});
//# sourceMappingURL=main.js.map