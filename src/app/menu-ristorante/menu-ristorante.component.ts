import { Component } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase'


interface Piatto {
    $key?: string;
    nomePiatto:string;
    tipologiaPiatto:string;
    ricetta:string;
    prezzo:string;
    downloadURL?: string;
    path: string;  
}

@Component({
  selector: 'app-menu-ristorante',
  templateUrl: './menu-ristorante.component.html',
  styleUrls: ['./menu-ristorante.component.scss']
})
export class MenuRistoranteComponent {

  loading: boolean = true
  public idRistorante: string;
  menu: FirebaseListObservable<any>;
   quantity:number=1

  piattiList : Observable<Piatto[]>;

  constructor(public af: AngularFire, private router: Router, private route: ActivatedRoute) { 


    let storage = firebase.storage();

    this.idRistorante = this.route.snapshot.params['id'];

    //this.menu = af.database.list('/menu/'+this.idRistorante);

    this.menu = af.database.list('/menu', {
      query: {
        orderByChild: 'idRistorante',
        equalTo: this.idRistorante
      }
    });



    this.piattiList = this.menu.map( itemList =>
        itemList.map( item => {
            var pathReference = storage.ref(item.path);
            let result = {
                          $key: item.$key, 
                          downloadURL: pathReference.getDownloadURL(), 
                          idRistorante:this.idRistorante,  
                          //nomeRistorante: this.nomeRistorante,
                          path: item.path, 
                          nomePiatto: item.nomePiatto, 
                          tipologiaPiatto: item.tipologiaPiatto, 
                          ricetta: item.ricetta, 
                          prezzo: item.prezzo,
                          inOfferta: item.inOfferta,
                          prezzoOfferta: item.prezzoOfferta,
                          dataScadenza: item.dataScadenza
                        };
            console.log(result);
            return result;
        })
    );
  }

  dettaglioPiatto(idPiatto){
  	console.log(idPiatto)
  	//this.router.navigate(['/dettaglioPiatto', idPiatto, this.idRistorante]);
    this.router.navigate(['/dettaglioPiatto', idPiatto]);
  }



  onLoad() {
    this.loading = false;
  }

  tornaRistorante(){
    //console.log('macmsc')
    this.router.navigate(['/dettaglioRistorante', this.idRistorante]);
    
  }

  add(){
    return this.quantity++;
  }

  remove(){
    if (this.quantity > 0){
        return this.quantity--;
    } else {
        return 0;
    }
  }

}
