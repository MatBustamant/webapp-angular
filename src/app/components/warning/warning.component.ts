import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warning',
  template: `
  <div class="modal-header">
    <h2 class="modal-title" id="modal-title">Borrar elemento</h2>
    <button type="button" class="btn" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
  <div class="modal-body">
    <p>¿Está seguro de que desea borrar este elemento?</p>
    <p>Toda la información asociada será eliminada de manera permanente.
    <strong><span class="text-danger">Esta operación no puede revertirse.</span></strong>
  </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('Cancel')">Cancelar</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok')">Ok</button>
  </div>
  `,
  styles: ['p, h2, i {color: white;}' ]
})
export class WarningComponent implements OnInit {

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
