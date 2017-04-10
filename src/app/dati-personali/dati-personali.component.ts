import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import {Http, Response, Jsonp} from "@angular/http";  




@Component({
  selector: 'app-dati-personali',
  templateUrl: './dati-personali.component.html',
  styleUrls: ['./dati-personali.component.scss']
})
export class DatiPersonaliComponent implements OnInit {

  public uomo = new FormControl('uomo');

  nome :string
  cognome :string
  indirizzo :string
  cap :string
  dataNascita :string
  sesso :string



  public datiPersonaliForm = this.fb.group({
    nome: ["", Validators.required],
    cognome: ["", Validators.required],
    indirizzo: ["", Validators.required],
    cap: ["", Validators.required],
    dataNascita: ["", Validators.required],
    sesso: ["", Validators.required],

  });
  datiPersonali: FirebaseObjectObservable<any>;

  
  constructor(public fb: FormBuilder, public af: AngularFire,  private router: Router) {


    

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
                      dataNascita: [utente.dataNascita, Validators.required],
                      sesso: [utente.sesso, Validators.required],
									  });
      	   })

           
        }
     })

  			//this.datiPersonali = af.database.object('/datiPersonali');
  }

  ngOnInit() {



  }

  salvaDatiPersonali(event) {
    	let formDati = this.datiPersonaliForm.value
    	console.log(formDati)
    	this.datiPersonali.set(formDati)
    	this.router.navigate(['/']);
   }


}
