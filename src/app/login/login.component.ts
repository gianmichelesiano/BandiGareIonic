import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  showLogin:boolean = true;
  errore:string = ''
  email:string = '';
  password:string = '';
  name:string = '';

  constructor( public af: AngularFire, private router: Router ) { }

  ngOnInit() {
  }

  doLogin() {
  	if(this.showLogin) {

        if(this.email === '' || this.password === '') {
        		this.errore = 'I campi non possono essere vuoti'
        	   //let result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes');
       	} else if (!this.validateEmail(this.email)) {
       		   console.log('qua')
               this.errore = 'Inserire un mail valida'
        }
        else {
					this.af.auth.login({email: this.email,password: this.password,},{provider: AuthProviders.Password,method: AuthMethods.Password,})
					.then((userInfo) => {
						console.log('login fatto');
					    console.log(userInfo);
					    this.router.navigate(['/']);
					})
					.catch((error) => {
						this.errore = error.message
					});
        }
  	}
  }

  doRegister() {

  	 if(!this.showLogin) {
  	 	console.log('registr')
	  	 if(this.email === '' || this.password === '') {
	        this.errore = 'I campi non possono essere vuoti'
	        	   //let result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes');
	       	} else if (!this.validateEmail(this.email)) {
	       		   console.log('qua')
	               this.errore = 'Inserire un mail valida'
	        }
	        else {
	        	this.af.auth.createUser({email: this.email, password:  this.password})
	        	.then(() => {
	                     this.errore = "Registratione eseguita"
		                 this.af.auth.login({email: this.email,password: this.password,},{provider: AuthProviders.Password,method: AuthMethods.Password,})
						.then((userInfo) => {
							console.log('login fatto');
						    console.log(userInfo);
						    this.router.navigate(['/']);
			
						})
						.catch((error) => {
							this.errore = error.message
						});

				 }).catch((error) => {
				 	  console.log(error)
				 	  console.log(error.message)
				 	  if (error['code'] == "auth/weak-password"){
				 	  	this.errore = 'La password deve avere almeno 6 caratteri'
				 	  } else if (error['code'] == "auth/email-already-in-use"){
				 	  	this.errore = 'email già in uso'
				 	  } else {
				 	  	this.errore = "Registration error"
				 	  }
	                  
				 });
	        }
	  } else {
	  	this.errore = ''
	  	this.showLogin = false;
	  }
  	

  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
