import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PersonaRead } from '../models';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  persona: Subject<PersonaRead> = new Subject<PersonaRead>();

  constructor(private crud: CRUDService) {
    this.loadPersona();
   }

  loadPersona(): void {
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
