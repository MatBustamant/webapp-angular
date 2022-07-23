import { Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalManagementService } from 'src/app/services/modal-management.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  modalData!: {
    img: string,
    title: string,
    description: string,
    footer: string
  }

  @ViewChild('content')
  private modalRef?: TemplateRef<any>;

  constructor(private modalManagement: ModalManagementService, private ngbmodal: NgbModal) {
    this.modalManagement.data.subscribe((val)=>{this.modalData = val});
    this.modalManagement.action.subscribe((instruction)=>{
      if (instruction === 'open') {
        this.open(this.modalRef);
      }
    });
   }

  ngOnInit(): void { }

  open(content: any) {
    this.ngbmodal.open(content, { ariaLabelledBy: 'modal-basic-title' , size: 'lg' , centered: true , windowClass: 'blured-window' })
  }
}