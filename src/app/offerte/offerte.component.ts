import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable , FirebaseObjectObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


import * as firebase from 'firebase'

interface Offerta {
    $key?: string;
    nomePiatto:string;
    idRistorante:string;
    tipologiaPiatto:string;
    ricetta:string;
    prezzo:string;
    downloadURL?: string;
    path: string;  
}

@Component({
  selector: 'app-offerte',
  templateUrl: './offerte.component.html',
  styleUrls: ['./offerte.component.scss']
})
export class OfferteComponent implements OnInit {

  loading: boolean = true
  listaOfferte = []
  menu: FirebaseObjectObservable<any>;
  offerte : FirebaseListObservable<any>;

  offerteList : Observable<Offerta[]>;

  constructor(public af: AngularFire, private router: Router) { 


      let storage = firebase.storage();

      this.offerte = af.database.list('/menu', {
        query: {
          orderByChild: 'inOfferta',
          equalTo: true
        }
      });

     this.offerteList = this.offerte.map( itemList =>
        itemList.map( item => {
            var pathReference = storage.ref(item.path);
            let result = {$key: item.$key, inOfferta:item.inOfferta, downloadURL: pathReference.getDownloadURL(), path: item.path, nomePiatto: item.nomePiatto, tipologiaPiatto: item.tipologiaPiatto, ricetta: item.ricetta, prezzo: item.prezzo, idRistorante: item.idRistorante};
            let nomeRistorante = af.database.object('/ristoranti/'+item.idRistorante).subscribe( res => {
               console.log(res.nome)
               result['nomeRistorante'] = res.nome
            })
            return result;
        })
     );
      //finisce
  }

  ngOnInit() {
  }

  onLoad() {
    this.loading = false;
  }

  dettaglioPiatto(idPiatto, idRistorante){
  		console.log(idPiatto)
  		console.log(idRistorante)
  		this.router.navigate(['/dettaglioPiatto', idPiatto]);
  }



}
