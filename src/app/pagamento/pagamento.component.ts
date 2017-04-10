import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import {Http, Response, Jsonp} from "@angular/http";  


@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})


export class PagamentoComponent implements OnInit {

  public uomo = new FormControl('uomo');
  carrello: FirebaseListObservable<any>;

  nome :string
  cognome :string
  indirizzo :string
  cap :string
  telefono :string
  pagamento :string

  totale:number


  public datiPersonaliForm = this.fb.group({
    nome: ["", Validators.required],
    cognome: ["", Validators.required],
    indirizzo: ["", Validators.required],
    cap: ["", Validators.required],
    telefono: ["", Validators.required],

    pagamento: ["", Validators.required],

  });
  datiPersonali: FirebaseObjectObservable<any>;


  constructor(public fb: FormBuilder, public af: AngularFire,  private router: Router, private route: ActivatedRoute) { 
    
    this.totale = this.route.snapshot.params['id'];
    console.log("this.totale")
    console.log(this.totale)

     this.af.auth.subscribe( (auth) => {
      if(auth == null) {
          console.log("Not Logged in.");
          this.router.navigate(['/login']);
      }
      else {
      	   console.log(auth.uid)
      	   this.datiPersonali = this.af.database.object('/datiPersonali/'+auth.uid);
      	   console.log(this.datiPersonali)
      	   this.datiPersonali.subscribe( utente => {
      	   	 console.log(utente)
      	   	 this.datiPersonaliForm = this.fb.group({
					  nome: [utente.nome, Validators.required],
					  cognome: [utente.cognome, Validators.required],
                      indirizzo: [utente.indirizzo, Validators.required],
                      cap: [utente.cap, Validators.required],
                      telefono: [utente.telefono, Validators.required],
                      pagamento: [utente.sesso, Validators.required],
									  });
      	   })

           
        }
     })

  			//this.datiPersonali = af.database.object('/datiPersonali');
  }

  ngOnInit() {



  }

  paga(event) {
    	let formDati = this.datiPersonaliForm.value
    	console.log(formDati)
    	
    	let idOrdine = ''
        var data = Math.floor(Date.now() / 1000)
        let pagato = true;
        let stato = 0;
        let indirizzoSpedizione = formDati.indirizzo
        let pagamento = formDati.pagamento
        let telefono = formDati.telefono

        this.af.auth.subscribe( (auth) => {
        	  let idCliente = auth.uid
        	  this.af.database.list('/ordini/').push({
        	 	 			       idCliente: idCliente,
	                               stato:stato,
	                               data:data,
	                               totale: this.totale,
	                               pagato:pagato,
	                               indirizzoSpedizione:indirizzoSpedizione,
	                               telefono:telefono,
	                               pagamento:pagamento
        	  }).then((ordine) => {
        	  	  console.log("idCliente")
        	  	  console.log(idCliente)
        	  	  let carrello = this.af.database.list('/carrello/'+idCliente);
        	  	  carrello.subscribe(snapshots => {
        	  	  	     snapshots.forEach(snapshot => {
                                   console.log("snapshot")
                                   console.log(snapshot)
        	  	  	     		   let chiave = snapshot.$key
	                        	   let valore = snapshot
	                        	   let idRistorante = valore['idRistorante']
	                        	   valore['idCliente'] = idCliente
	                        	   valore['idOrdine'] = ordine.key
	                        	   valore['idPiatto'] = chiave
	                        	   valore['data'] = data

	                        	   this.af.database.list('ordiniRistoranti/').push(valore)
        	  	  	     })
        	  	  }).unsubscribe()
        	  	  
        	  	  this.af.database.list('/carrello/').remove(idCliente)
        	  	  this.router.navigate(['/ordini']);
        	  })

        })

   }



}
