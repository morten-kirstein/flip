import {Component, View, NgFor, NgIf, bootstrap} from 'angular2/angular2';
import {FirebaseService} from 'firebaseService';

class HighScore {

    public Name: string;
    public Score: number;

    contructor(name, score) {
        this.Name = name;
        this.Score = score;
    }
}

class Employee {

	public Name: string;
	public Image: string;

	contructor(name, image) {
		this.Name = name;
		this.Image = image;
	}
}

@Component({
    selector: 'my-app'
})
	@View({
		directives: [NgFor, NgIf],
		templateUrl: 'mainForm.html'
})
export class AppComponent {
    employees: Array<Employee> = new Array<Employee>();
	tiles: Array<Employee> = new Array<Employee>();
	selected: Array<number> = new Array<number>(); 
    found: Array<number> = new Array<number>(); 
    score: number = 0;
    HighScore: Firebase;

    flipTile(index): void {

		if (this.found.indexOf(index)<0) {

            this.score += 1;

			if (this.selected.length < 2) {
				this.selected.push(index);

				if (this.selected.length == 2) {

					if (this.tiles[this.selected[0]].Name == this.tiles[this.selected[1]].Name) {
						this.found.push(this.selected[0])
						this.found.push(this.selected[1]);

                        if (this.found.length == this.tiles.length) {

                            this.getHighscore(this.score);

						}

					}
				}

			} else {
				this.selected = new Array<number>();
				this.selected.push(index);
			}

		}


    }

    getHighscore(score: number) {
        var isThisHighscore = false;
        this.HighScore.orderByChild("Score").limitToFirst(5).once("value", val => {
         //   console.log(this, val);
			this.checkHighscore(val);
        });        
    }

    checkHighscore(items) {
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
            //alert("TILLYKKE! din score blev: " + score.toString());
        } else {
            alert("din score blev: " + this.score.toString() + ", du kom desværre ikke på highscore listen");
        }

        this.newGame();

    }
	
	addEployee(name, image):void {
		var employee = new Employee();
		employee.Name = name;
		employee.Image = image;
		this.employees.push(employee);
	}

    constructor() {


        this.HighScore = new FirebaseService().highscore;
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
    newGame(): void {
        this.score = 0;
		this.selected = new Array<number>();
		this.found = new Array<number>(); 
		this.shuffle();

    }

    addHighScore(name: string, score: number): void {
        var highscore = new HighScore();
        highscore.Name = name;
        highscore.Score = score;

        this.HighScore.push(highscore);
    }


	shuffle():void {
		var currentIndex = this.tiles.length, temporaryValue, randomIndex;
		
		while (0 !== currentIndex) {
			
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
		
			temporaryValue = this.tiles[currentIndex];
			this.tiles[currentIndex] = this.tiles[randomIndex];
			this.tiles[randomIndex] = temporaryValue;
		}

	}

}
bootstrap(AppComponent);