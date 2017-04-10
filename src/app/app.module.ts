import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { Http} from '@angular/http';
import { AppComponent, Home, appRoutes } from './app.component'; 
import { MdlModule } from '@angular-mdl/core';
import { MdlSelectModule } from '@angular-mdl/select';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { TranslateModule, TranslateStaticLoader, TranslateLoader  } from 'ng2-translate/ng2-translate';

import { ThemeDemo } from './theme/theme.component';
import { BadgeDemo } from './badge/badge.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RistorantiComponent } from './ristoranti/ristoranti.component';
import { OfferteComponent } from './offerte/offerte.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { OrdiniComponent } from './ordini/ordini.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DatiPersonaliComponent } from './dati-personali/dati-personali.component';
import { ImpostazioniComponent } from './impostazioni/impostazioni.component';
import { DettaglioRistoranteComponent } from './dettaglio-ristorante/dettaglio-ristorante.component';
import { MenuRistoranteComponent } from './menu-ristorante/menu-ristorante.component';
import { InfoRistoranteComponent } from './info-ristorante/info-ristorante.component';
import { RecensioniRistoranteComponent } from './recensioni-ristorante/recensioni-ristorante.component';
import { DettaglioPiattoComponent } from './dettaglio-piatto/dettaglio-piatto.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { DatePickerModule } from 'ng2-datepicker';
import { DettaglioOrdineComponent } from './dettaglio-ordine/dettaglio-ordine.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAD1ZodtGDUmPIZUI7e_leAERDjh80jNKc',
  authDomain: 'speeats.firebaseapp.com',
  databaseURL: 'https://speeats.firebaseio.com',
  storageBucket: 'speeats.appspot.com',
  messagingSenderId: '955979856036'
};

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    Home,
    ThemeDemo,
    BadgeDemo,
    RistorantiComponent,
    OfferteComponent,
    CarrelloComponent,
    OrdiniComponent,
    LoginComponent,
    LogoutComponent,
    DatiPersonaliComponent,
    ImpostazioniComponent,
    DettaglioRistoranteComponent,
    MenuRistoranteComponent,
    InfoRistoranteComponent,
    RecensioniRistoranteComponent,
    DettaglioPiattoComponent,
    PagamentoComponent,
    DettaglioOrdineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdlModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    MdlSelectModule,
    BrowserAnimationsModule,
    DatePickerModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

