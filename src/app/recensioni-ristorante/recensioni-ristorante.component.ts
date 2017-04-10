import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recensioni-ristorante',
  templateUrl: './recensioni-ristorante.component.html',
  styleUrls: ['./recensioni-ristorante.component.scss']
})
export class RecensioniRistoranteComponent implements OnInit {

  rate : number;
  recensioni: any
  
  constructor() { 

 this.recensioni = [
  	 	{
  	 	  nome: 'Marco',
  	 	  avatar: "assets/avatar/m.png",
  	 	  titolo: 'Fantastico',
          descrizione:"Servizio veramente eccezionale",
  	 	  stelle:5,
  	 	  data : ''
  	 	},
  	 	{
  	 	  nome: 'Maria',
  	 	  avatar: "assets/avatar/f.png",
  	 	  titolo: 'Interessante',
  	 	  descrizione: 'Mi aspettavo qualcosa di meglio sopratutto per quello che dicevano',
  	 	  stelle:3,
  	 	  data : ''
  	 	}
  	 ] 
  	 this.rate = 3
  }

  ngOnInit() {
  }

}
