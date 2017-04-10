import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(public af: AngularFire, private router: Router) { 
  		this.af.auth.logout();
  		this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
