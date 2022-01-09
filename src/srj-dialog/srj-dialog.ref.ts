import { Observable, Subject } from 'rxjs';

export class SrjDialogRef {
  private readonly afterDialogClosed = new Subject<any>();
  private readonly afterEventEmited = new Subject<any>();
  private readonly afterEventReceived = new Subject<any>();
  afterClosed: Observable<any> = this.afterDialogClosed.asObservable();
  afterEvent: Observable<any> = this.afterEventEmited.asObservable();
  eventReceived: Observable<any> = this.afterEventReceived.asObservable();
  constructor() {}

  close(result?: any) {
    this.afterDialogClosed.next(result);
  }

//this function is used to emit an event to the parent reference
  emitEvent(result?:any){
    this.afterEventEmited.next(result)
  }
//this function is used to send an event to the dialog from the parent reference
  sendEvent(result?:any){
    this.afterEventReceived.next(result);
  }
}
