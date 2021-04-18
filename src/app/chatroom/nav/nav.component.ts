import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from "./../../chat.service";
import { Room } from "./../../room";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  router: string;
  username: string;
  counter: number = 0;
  minutes: number = 0;
  counterMinutes: number = 0;
  rooms: Room[] = [];
  routerRoomId: string[] = [];

  constructor(private _router: Router, private chat: ChatService){
    this.router = _router.url;
    this.username = String(localStorage.getItem('onlineusername'));
  }

  ngOnInit(): void {

    //Get the value from the local storage to get the minutes
    if (localStorage.getItem("onlinecounterminutes") !== null) {
      this.minutes = Number(localStorage.getItem("onlinecounterminutes"));
    }

    this.displayNav();
    this.displayTimer();
  }

  displayNav(){
    /*
    Required to use the method keys and entries from
    Object constructor to iterate the data
    */
    this.chat.getRooms().subscribe(data =>{
      for(let i = 0; i < Object.keys(data).length; i++){
        this.rooms.push({
          id: parseInt(Object.keys(data)[i]),
          name: Object.entries(data)[i][1].name
        });
      }
    });
  }

  displayTimer(){
    setInterval(()=> {
      let isSecondStored = localStorage.getItem("onlinecounterseconds");
      let isMinuteStored = localStorage.getItem("onlinecounterminutes");

      //check if localstore for onlinecounterseconds exists
      if (isSecondStored !== null) {
        this.counter = Number(localStorage.getItem("onlinecounterseconds"));
      }
      this.counter++;

      localStorage.setItem('onlinecounterseconds', this.counter.toString());
      let onlineCounter = localStorage.getItem('onlinecounterseconds');

      if(Number(onlineCounter) == 60){
        //check if localstore for onlinecounterminutes exists
        if (isMinuteStored !== null) {
          this.counterMinutes = Number(localStorage.getItem("onlinecounterminutes"));
        }
        this.counterMinutes++;
        this.onlineCounter(this.counterMinutes);
        localStorage.removeItem('onlinecounterseconds');
        this.counter = 0;
      }
    },1000);
  }

  onlineCounter(counter: number){
    localStorage.setItem('onlinecounterminutes', counter.toString());
    let onlineCounterMinutes = localStorage.getItem('onlinecounterminutes');
    this.minutes = Number(onlineCounterMinutes);
  }

  chooseRoom(roomId: number, event: MouseEvent){
    this._router.navigate([`/chatroom/${roomId}`]);
    event.preventDefault();
  }
}
