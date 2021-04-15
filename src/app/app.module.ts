import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { NavComponent } from './chatroom/nav/nav.component';
import { ChannelComponent } from './chatroom/channel/channel.component';

import { UsernameService } from "./username.service";
import { ChatService } from "./chat.service";

@NgModule({
  declarations: [
    AppComponent,
    ChatroomComponent,
    NavComponent,
    ChannelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsernameService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
