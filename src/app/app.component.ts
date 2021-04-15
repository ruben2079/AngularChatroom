import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string = "";
  router: string;

  constructor(private _router: Router){
    this.router = _router.url;
  }

  loginUser(){
    if(this.username != ""){
      //set username in local storage
      localStorage.setItem('onlineusername', this.username);
      //remove seconds and minutes from locastorage
      localStorage.removeItem('onlinecounterseconds');
      localStorage.removeItem('onlinecounterminutes');
      
      this._router.navigate(['/chatroom/0']);
    } else {
      alert("Please enter username.")
    }
  }
}
