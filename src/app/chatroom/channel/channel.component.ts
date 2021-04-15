import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from "./../../chat.service";
import { GetMessage } from "./../../get-message";

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  username: string;
  textmessages: string[] = [];

  chatMessage: string = "";
  router: string;
  chatroomName: string = "";
  userList: string[] = [];
  messageList: GetMessage[] = [];
  routerRoomId: string = "";

  constructor(private _router: Router, private chat: ChatService) {
    this.router = _router.url;
    this.username = String(localStorage.getItem('onlineusername'));
  }

  ngOnInit(): void {
    this.username = String(localStorage.getItem('onlineusername'));
    this.checkRoomName();
  }

  sendMessage(){
    this.textmessages.push(this.chatMessage);
    this.chatMessage = "";
  }

  checkRoomName(){
    //detect the room name with the router
    this.chat.getRooms().subscribe(data =>{
      for(let i = 0; i < Object.keys(data).length; i++){
        if(this.router.indexOf(Object.keys(data)[i]) > 1){
          this.chatroomName = Object.entries(data)[i][1].name;
          this.getUserList(parseInt(Object.keys(data)[i]));
          this.getMessages(parseInt(Object.keys(data)[i]));
        }
      }
    });
  }
  /*
  displayed users in a chatroom from API using the Object
  constructor to pass the whole array in a property.
  */
  getUserList(id: number){
    this.chat.roomDetail(id).subscribe(data =>{
      this.userList = [...Object.entries(data)[2][1]];
    });
  }
  /*
  displayed messages in a chatroom from API using the Object
  constructor to pass the whole array in a property.
  */
  getMessages(id: number){
    this.messageList = [];
    this.chat.getMessageList(id).subscribe(data =>{
      for(let i = 0; i < Object.keys(data).length; i++){
        this.messageList.push(Object.entries(data)[i][1]);
      }
    });
    this.routerRoomId = this.router.replace("/chatroom/","");
  }

  postMessages(){
    this.textmessages.push(this.chatMessage);
    this.chat.postMessage(this.routerRoomId, {
      name: this.username,
      message: this.chatMessage
    }).subscribe(data => data);
    this.chatMessage = "";
  }
}
