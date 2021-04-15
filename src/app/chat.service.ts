import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Room } from "./room";
import { Message } from "./message";
import { PostMessages } from "./post-messages";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {

  }

  public getRooms() {
    return this.http.get<Room>("http://localhost:8080/api/rooms").pipe(catchError(error => {
      return throwError(error);
    }));
  }

  public roomDetail(id: number){
    return this.http.get(`http://localhost:8080/api/rooms/${id}`).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  public getMessageList(id: number){
    return this.http.get<Message>(`http://localhost:8080/api/rooms/${id}/messages/`).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  public postMessage(id: string, obj: PostMessages){
    return this.http.post<PostMessages>(`http://localhost:8080/api/rooms/${id}/messages/`, obj).pipe(catchError(error => {
      return throwError(error);
    }));
  }
}
