import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {TranslateService} from 'ng2-translate';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.scss']
})
export class ImpostazioniComponent implements OnInit {


  public impostazioniForm = this.fb.group({
    lingua: ["", Validators.required],
    moneta: ["", Validators.required],
  });

  public lingue 
  public monete 
  constructor(public translate: TranslateService, public fb: FormBuilder,  private router: Router) { 

    	    this.lingue = [
    	                    {code:'en', name:"English"}, 
                          {code:'it', name:"Italiano"}, 
                          {code:'de', name:"Deutsch"}, 
                      ];

          this.monete = [
                          {code:'EUR', name:"Euro"}, 
                          {code:'CHF', name:"Franco Svizzero"}, 
                          {code:'DOL', name:"Dollaro"}, 
                      ]

  }

  ngOnInit() {
  }

  salvaInformazioni(event) {
  	 
  	 let lingua = this.impostazioniForm.value.lingua;
     let moneta = this.impostazioniForm.value.moneta;
  	 console.log(lingua)
  	 this.translate.setDefaultLang(lingua);
     this.router.navigate(['/']);

  }

}
