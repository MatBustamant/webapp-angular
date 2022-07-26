import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { SkillFormComponent } from '../components';
import { FormComponent } from '../components/modal/form/form.component';
import { ProjectFormComponent } from '../components/portfolio/projects/project-form/project-form.component';
import { WarningComponent } from '../components/warning/warning.component';
import { BackgroundRead, ProjectRead, SkillRead } from '../models';

const OPTIONS = { size: 'lg' , centered: true , windowClass: 'blured-window' };

@Injectable({
  providedIn: 'root'
})
export class ModalManagementService {

  public action: Subject<any> = new Subject<any>();
  public data: Subject<any> = new Subject<any>()

  constructor( private ngbmodal:NgbModal ) { }

  public openModal(): void {
    this.action.next('open');
  }

  public openBackground(data: BackgroundRead | null, type: number): Observable<any> {
    const modalRef = this.ngbmodal.open(FormComponent, OPTIONS);
    let tipo = "";
    if (type == 1 ) { tipo = "educación" } else { tipo = "experiencia" }
    if (data == null) {
      modalRef.componentInstance.setType(type);
      modalRef.componentInstance.accion = `Crear ${tipo}`;
    } else if (data != null) {
      modalRef.componentInstance.setData(data);
      modalRef.componentInstance.accion = `Editar ${tipo}`;
    }
    return modalRef.closed;
  }

  public openAbout(): void {
    this.action.next('editAbout');
  }

  public openSkill(data: SkillRead | null): Observable<any> {
    const modalRef = this.ngbmodal.open(SkillFormComponent, OPTIONS);
    if (data != null) {
      modalRef.componentInstance.setData(data);
      modalRef.componentInstance.accion = "Editar skill";
    } else { modalRef.componentInstance.accion = "Crear skill" }
    return modalRef.closed; //guarda con esto, capaz tenga que editar cosas de mi método de edit skill.
  }

  public openProject(data: ProjectRead | null): Observable<any> {
    const modalRef = this.ngbmodal.open(ProjectFormComponent, OPTIONS);
    if (data != null) {
      modalRef.componentInstance.setData(data);
      modalRef.componentInstance.accion = "Editar proyecto";
    } else { modalRef.componentInstance.accion = "Crear proyecto" }
    return modalRef.closed;
  }

  public warning(): Observable<any> {
    const modalRef = this.ngbmodal.open(WarningComponent, OPTIONS);
    return modalRef.closed;
  }

}
