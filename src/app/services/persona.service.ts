import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PersonaRead } from '../models';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public persona: Subject<PersonaRead> = new Subject<PersonaRead>();

  constructor( private crud: CRUDService ) {
    this.loadPersona();
  }

  public loadPersona(): void {
    this.crud.getPersona().subscribe({
      next: (response: PersonaRead) => {
        this.persona.next(response);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
