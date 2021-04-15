import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoomidService {

    public currentData: BehaviorSubject<number> = new BehaviorSubject(0);
    currentDataPassed = this.currentData.asObservable();

    updatedData(roomId: number) {
      this.currentData.next(roomId);
    }
}
