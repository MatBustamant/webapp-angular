import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { AboutFormComponent, BackgroundFormComponent, ProjectFormComponent, SkillFormComponent, WarningComponent } from '../components';
import { BackgroundRead, ProjectRead, SkillRead } from '../models';

const OPTIONS = { size: 'lg' , centered: true , windowClass: 'blured-window' };

@Injectable({
  providedIn: 'root'
})
export class ModalManagementService {

  public action: Subject<any> = new Subject<any>();
  public data: Subject<any> = new Subject<any>()

  constructor( private ngbmodal:NgbModal ) { }

  public openBackground(data: BackgroundRead | null, type: number): Observable<any> {
    const modalRef = this.ngbmodal.open(BackgroundFormComponent, OPTIONS);
    let tipo = (type == 1) ? "educación" : "experiencia";
    if (data == null) {
      modalRef.componentInstance.setType(type);
      modalRef.componentInstance.accion = `Crear ${tipo}`;
    } else if (data != null) {
      modalRef.componentInstance.setData(data);
      modalRef.componentInstance.accion = `Editar ${tipo}`;
    }
    return modalRef.closed;
  }

  public openAbout(data: any): void {
    const modalRef = this.ngbmodal.open(AboutFormComponent, OPTIONS);
    modalRef.componentInstance.setData(data);
    modalRef.componentInstance.accion = "Editar datos personales";
  }

  public openSkill(data: SkillRead | null): Observable<any> {
    const modalRef = this.ngbmodal.open(SkillFormComponent, OPTIONS);
    if (data != null) {
      modalRef.componentInstance.setData(data);
      modalRef.componentInstance.accion = "Editar skill";
    } else { modalRef.componentInstance.accion = "Crear skill" }
    return modalRef.closed;
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
