import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2';
import { User } from '@ionic/cloud-angular';
import { FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase'
import { Router, ActivatedRoute, Params } from '@angular/router';



interface Ordine {
    $key?: string;
    nomePiatto:string;
    idRistorante:string;
    nomeRistorante:string;
    tipologiaPiatto:string;
    ricetta:string;
    prezzo:string;
    downloadURL?: string;
    path: string; 
    inOfferta:boolean;
    prezzoOfferta: string; 
    pronto: string; 
}

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.scss']
})
export class CarrelloComponent implements OnInit {


  public formControlPagamento = this.fb.group({
    pagamento: ["", Validators.required],

  });


  carrelloPieno: boolean = false
  item:any
  quantity:number
  loading: boolean = true
  total:number=0
  carrello: FirebaseListObservable<any>;
  carrelloObject: FirebaseListObservable<any>;
  ordini: FirebaseListObservable<any>;
  carrelloSnap: FirebaseObjectObservable<any>;
  ordineListPaga : Observable<Ordine[]>;
  ordineList : Observable<Ordine[]>;
  cartTotal: Observable<any>;
  oggettoTotale: FirebaseObjectObservable<any>;
  totaleFin:Observable<number>
  totale : number = 0


  constructor(public fb: FormBuilder, public af: AngularFire, private router: Router) {

  	let storage = firebase.storage();
  	this.af.auth.subscribe( (auth) => {

  		this.carrello = this.af.database.list('carrello/'+auth.uid);
  		    this.ordineList = this.carrello.map( itemList =>
		        itemList.map( item => {
		            this.carrelloPieno = true
		            var pathReference = storage.ref(item.path);
		            let result = {
		                    $key: item.$key, 
		                    downloadURL: pathReference.getDownloadURL(), 
		                    path: item.path, 
		                    nomePiatto: item.nomePiatto, 
		                    quantity: item.quantity, 
		                    prezzo: item.prezzo,
		                    nomeRistorante: item.nomeRistorante,
		                    inOfferta: item.inOfferta,
		                    prezzoOfferta: item.prezzoOfferta,
		                    pronto:false,
		                    consegnato:false,

		                  };
		            return result;
		        })
	        );

		    //Calcolo Totale
		    this.totale = 0
		    this.carrelloSnap = null 
		    this.carrelloSnap = af.database.object('/carrello/'+auth.uid, { preserveSnapshot: true });
		    this.carrelloSnap.subscribe(snapshot => {
		        let listaPiatti = snapshot.val()
		        for (var key in listaPiatti) {
		            let quantity = listaPiatti[key]['quantity']
		            let prezzo = listaPiatti[key]['prezzo']
		            let inOfferta = listaPiatti[key]['inOfferta']
		            if (inOfferta) {
		              prezzo = listaPiatti[key]['prezzoOfferta']
		            }
		            this.totale = this.totale +quantity*prezzo
		        }
		    });
  	})
  			
  		
  }

  ngOnInit() {
  }

  onLoad() {
    this.loading = false;
  }

  deletePiatto(key: string) { 
    	console.log(key)
    	this.carrello.remove(key)
  }

  aggiungi() {
  	console.log("aggiungi")
  	this.router.navigate(['/ristoranti']);
    //this.navCtrl.setRoot(RistListPage)
  }

  svuota(){
  	console.log("svuota")
  	this.af.auth.subscribe( (auth) => {
  		this.af.database.list('/carrello/').remove(auth.uid) 
  	})
    
  }



  vaiPagamento(totale){
  	console.log(totale)
  	this.router.navigate(['/pagamento', totale]);
  }


}
