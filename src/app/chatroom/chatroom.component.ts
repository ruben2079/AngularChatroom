import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from "./../chat.service";
import { Room } from "./../room";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {

  router: string;
  rooms: Room[] = [];


  constructor(private _router: Router, private chat: ChatService){
    this.router = _router.url;
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

}
