import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalManagementService {
  public action: Subject<any> = new Subject<any>();
  public data: Subject<any> = new Subject<any>()

  constructor() { }

  openModal(): void {
    this.action.next('open');
  }
}
