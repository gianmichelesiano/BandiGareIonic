import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase'

@Component({
  selector: 'app-dettaglio-piatto',
  templateUrl: './dettaglio-piatto.component.html',
  styleUrls: ['./dettaglio-piatto.component.scss']
})
export class DettaglioPiattoComponent implements OnInit {
  public id;
  quantity:number=1
  loading: boolean = true
  downloadURL?: any;
  piatto: FirebaseObjectObservable<any>;
  carrello: FirebaseListObservable<any>;

  constructor( private route: ActivatedRoute, private router: Router, public af: AngularFire, private _location: Location) { 

  }

  ngOnInit() {

   let storage = firebase.storage();
   this.id = this.route.snapshot.params['id'];
   console.log(this.id)
   this.piatto = this.af.database.object('/menu/'+this.id);

   this.piatto.subscribe( item => {
     var pathReference = storage.ref(item.path);
     //console.log(item.path)
     this.downloadURL = pathReference.getDownloadURL()
   })

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

  onLoad() {
    this.loading = false;
  }

  aggiungiAlCarrello(quantity){
  	//console.log(item)
  	console.log(quantity)
  	this.piatto.subscribe( (item) => {
  		console.log(item)
  		this.af.auth.subscribe( (auth) => {
  			console.log(auth.uid)
  			this.carrello = this.af.database.list('carrello/'+auth.uid);
  			this.carrello.push({ 
                          //key:item.$key,
                          nomePiatto:item.nomePiatto, 
                          idRistorante:item.idRistorante, 
                          prezzo:item.prezzo, 
                          path:item.path,
                          quantity:quantity,
                          //nomeRistorante:item.nomeRistorante,
                          prezzoOfferta:item.prezzoOfferta,
                          inOfferta:item.inOfferta,
                          pronto:false,
                          ritirato:false,
                        }).then((item) => { 
                        	console.log(item.key);
                        	this.router.navigate(['/carrello']);

                        });

  		})

  	})
  }

}
