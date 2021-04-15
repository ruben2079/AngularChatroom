import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentUsername = this.username.asObservable();

  updatedData(status: string) {
    this.username.next(status);
  }
}
