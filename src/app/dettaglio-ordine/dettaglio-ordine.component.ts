import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Location} from '@angular/common';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dettaglio-ordine',
  templateUrl: './dettaglio-ordine.component.html',
  styleUrls: ['./dettaglio-ordine.component.scss']
})
export class DettaglioOrdineComponent implements OnInit {

  idOrdine: any;
  listaOrdine: FirebaseListObservable<any>;
  listaOrdineObservable: Observable<any[]>;

  constructor(private route: ActivatedRoute, private router: Router, public af: AngularFire, private _location: Location) { 


    this.idOrdine = this.route.snapshot.params['id'];
    console.log(this.idOrdine)

    
    this.listaOrdine = af.database.list('/ordiniRistoranti', {
                            query: {
                                orderByChild: 'idOrdine',
                                equalTo: this.idOrdine
                              }
                            });


    this.listaOrdineObservable = this.listaOrdine
          .map(posts => {
              posts.map(p => {
                  p.ristoranteName = this.af.database.object('/ristoranti/'+p.idRistorante);
              });
              return posts;
     });
    



  }

  ngOnInit() {
  }

  tornaOrdini(){
   this._location.back();
  	//this.router.navigate(['/ordini']);
  }



}

