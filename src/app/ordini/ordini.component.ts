import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit {

  ordini: FirebaseListObservable<any>;

  constructor(public af: AngularFire, private router: Router) {
     this.af.auth.subscribe( (auth) => {
     	 let idCliente = auth.uid
     	 this.ordini = this.af.database.list('/ordini/', {
                      query: {
                        orderByChild: 'idCliente',
                        equalTo: idCliente
                      }
     	 });
     })
        	 


   }

  ngOnInit() {
  }

  dettaglioOrdine(idOrdine){
  	console.log(idOrdine)
    this.router.navigate(['/dettaglioOrdine', idOrdine]);
  }

}
