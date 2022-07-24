import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private isNavbarCollapsed: boolean = true;
  private subject = new Subject<any>();

  constructor() { }

  public toggleCollapse():void{
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.subject.next(this.isNavbarCollapsed);
  }

  public onToggle():Observable<any>{
    return this.subject.asObservable();
  }

}
