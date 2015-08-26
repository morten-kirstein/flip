import {Component, View, NgFor, NgIf, bootstrap} from 'angular2/angular2';



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


    flipTile(index): void {

		if (this.found.indexOf(index)<0) {

			if (this.selected.length < 2) {
				this.selected.push(index);

				if (this.selected.length == 2) {

					if (this.tiles[this.selected[0]].Name == this.tiles[this.selected[1]].Name) {
						this.found.push(this.selected[0])
						this.found.push(this.selected[1]);

						if (this.found.length == this.tiles.length) {
							// alert("TILLYKKE!");
							this.newGame();
						}

					}
				}

			} else {
				this.selected = new Array<number>();
				this.selected.push(index);
			}

		}


    }
	
	addEployee(name, image):void {
		var employee = new Employee();
		employee.Name = name;
		employee.Image = image;
		this.employees.push(employee);
	}

    constructor() {

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

		this.selected = new Array<number>();
		this.found = new Array<number>(); 
		this.shuffle();

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