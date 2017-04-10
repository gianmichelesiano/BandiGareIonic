import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase'

interface Ristorante {
    $key?: string;
    nome:string;
    indirizzo:string;
    ordineMin:string;
    tipologia:string;
    downloadURL?: string;
    path: string;  
}

@Component({
  selector: 'app-ristoranti',
  templateUrl: './ristoranti.component.html',
  styleUrls: ['./ristoranti.component.scss']
})
export class RistorantiComponent implements OnInit {

  loading: boolean = true
  ristoranti: FirebaseListObservable<any>;
  ristoranteList : Observable<Ristorante[]>;
  constructor(af: AngularFire, private router: Router) { 
     let storage = firebase.storage();
     this.ristoranti = af.database.list('/ristoranti');
     this.ristoranteList = this.ristoranti.map( itemList =>
        itemList.map( item => {
            var pathReference = storage.ref(item.path);
            let result = {$key: item.$key, downloadURL: pathReference.getDownloadURL(), path: item.path, nome: item.nome, indirizzo: item.indirizzo, ordineMin: item.ordineMin, tipologia: item.tipologia};
            return result;
        })
     );
  }

  ngOnInit() {
  }



  dettaglioRistorante(id: string){
    this.router.navigate(['/dettaglioRistorante', id]);
  }

  onLoad() {
    this.loading = false;
  }


}
