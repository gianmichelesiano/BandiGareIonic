import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import {Location} from '@angular/common';


@Component({
  selector: 'app-info-ristorante',
  templateUrl: './info-ristorante.component.html',
  styleUrls: ['./info-ristorante.component.scss']
})
export class InfoRistoranteComponent implements OnInit {
  idRistorante :string
  ristorante: FirebaseObjectObservable<any>;
  constructor(private route: ActivatedRoute, private router: Router, public af: AngularFire, private _location: Location) { 
      

  }

  ngOnInit() {
  }

}
