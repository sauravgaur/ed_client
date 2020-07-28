import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotifyService {

  private successResponse = new Subject<string>();
  successResponse$ = this.successResponse.asObservable();
  
  constructor() { }

  // Service message commands
  setSuccessResponse(messageObj: any) {
    this.successResponse.next(messageObj);
  }
}
