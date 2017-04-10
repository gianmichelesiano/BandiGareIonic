import { Component } from '@angular/core';
import { MdlDialogService } from '@angular-mdl/core';
import { MdlLayoutComponent } from '../../lib/components';
import { AbstractDemoComponent } from './abstract-demo.component';
import { hostConfig } from './animations/flyInOutTrigger-animation';
import { flyInOutTrigger } from './animations/flyInOutTrigger-animation';
import { ThemeDemo } from './theme/theme.component';
import { BadgeDemo } from './badge/badge.component';  
import { Title } from '@angular/platform-browser';
import { RistorantiComponent } from './ristoranti/ristoranti.component';  
import { OfferteComponent } from './offerte/offerte.component'; 
import { CarrelloComponent } from './carrello/carrello.component'; 
import { OrdiniComponent } from './ordini/ordini.component'; 
import { DatiPersonaliComponent } from './dati-personali/dati-personali.component'; 
import { ImpostazioniComponent } from './impostazioni/impostazioni.component'; 
import { LoginComponent } from './login/login.component'; 
import { LogoutComponent } from './logout/logout.component'; 
import { DettaglioRistoranteComponent } from './dettaglio-ristorante/dettaglio-ristorante.component'; 
import { MenuRistoranteComponent } from './menu-ristorante/menu-ristorante.component'; 
import { InfoRistoranteComponent } from './info-ristorante/info-ristorante.component'; 
import { RecensioniRistoranteComponent } from './recensioni-ristorante/recensioni-ristorante.component'; 
import { DettaglioPiattoComponent } from './dettaglio-piatto/dettaglio-piatto.component'; 
import { PagamentoComponent } from './pagamento/pagamento.component'; 
import { DettaglioOrdineComponent } from './dettaglio-ordine/dettaglio-ordine.component';



import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import {
  ActivatedRoute,
  Router, Routes
} from '@angular/router';


@Component({
  selector: 'home',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'home.html'
})

export class Home extends AbstractDemoComponent {
  public varivile
  constructor( router: Router, route: ActivatedRoute, titleService: Title) {
    super(router, route, titleService);
    
    this.varivile= 33
  }

  ordina(){
    //this.af.database.list('/carrello/').remove(this.user.id)
    //this.navCtrl.setRoot(RistListPage)
    this.router.navigate(['/ristoranti']);


  }
}

export const appRoutes: Routes = [
  { path: '', component: Home },
  { path: 'ristoranti', component: RistorantiComponent, data: {title: 'Ristoranti'} },
  { path: 'offerte', component: OfferteComponent, data: {title: 'Offerte'} },
  { path: 'carrello', component: CarrelloComponent, data: {title: 'Carrello'} },
  { path: 'ordini', component: OrdiniComponent, data: {title: 'Ordini'} },
  { path: 'login', component: LoginComponent, data: {title: 'Login'} },
  { path: 'dati-personali', component: DatiPersonaliComponent, data: {title: 'Dati personali'} },
  { path: 'impostazioni', component: ImpostazioniComponent, data: {title: 'Impostazioni'} },
  { path: 'logout', component: LogoutComponent, data: {title: 'Logout'} },
  { path: 'dettaglioRistorante/:id', component: DettaglioRistoranteComponent },
  { path: 'menuRistorante/:id', component: MenuRistoranteComponent },
  { path: 'infoRistorante/:id', component: InfoRistoranteComponent },
  { path: 'recenzioniRistorante/:id', component: RecensioniRistoranteComponent },
  { path: 'dettaglioPiatto/:id', component: DettaglioPiattoComponent },
  { path: 'pagamento/:id', component: PagamentoComponent },
  { path: 'dettaglioOrdine/:id', component: DettaglioOrdineComponent },

];



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public title = 'Speeat2';
  public nome  = "Nessun utente"
  public avatar = "assets/avatar/n.png" 
  datiPersonali: FirebaseObjectObservable<any>;

  constructor(router: Router, route: ActivatedRoute, titleService: Title, public af: AngularFire) {
    this.af.auth.subscribe( (auth) => {
      if(auth == null) {
          console.log("Not Logged in.");

        }
        else {

          console.log("loggato");
          this.datiPersonali = this.af.database.object('/datiPersonali/'+auth.uid);
          this.datiPersonali.subscribe( utente => {
            this.nome = utente.nome + ' '+ utente.cognome
            this.avatar = "assets/avatar/"+utente.sesso+".png"
          })

        }
    })
  }

  public componentSelected(mainLayout: MdlLayoutComponent) {
    mainLayout.closeDrawerOnSmallScreens();
  }
}
