// import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { BackgroundRead, ProjectRead } from 'src/app/models';
// import { ModalManagementService, PersonaService } from 'src/app/services';

// type SectionItem = BackgroundRead | ProjectRead;

// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class ModalComponent implements OnInit {

//   modalData: SectionItem = {
//     img: "https://via.placeholder.com/150"
//   };

//   form:FormGroup = this.formBuilder.group(
//     {
//       img: [''],
//       title: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]],
//       description: ['', [Validators.required, Validators.maxLength(500)]]
//     }
//   )

//   @ViewChild('content')
//   private modalRef?: TemplateRef<any>;

//   @ViewChild('formodal')
//   private modalForm?: TemplateRef<any>;

//   constructor(
//     private modalManagement: ModalManagementService,
//     private ngbmodal: NgbModal,
//     private formBuilder: FormBuilder,
//     private personaService: PersonaService
//   ) {
//     this.modalManagement.data.subscribe((val)=>{
//       this.modalData = val
//       this.form.get('img')?.setValue(val.img)
//       this.form.get('title')?.setValue(val.title)
//       this.form.get('description')?.setValue(val.description)
//     });
//     this.modalManagement.action.subscribe((instruction)=>{
//       if (instruction === 'open') {
//         this.open(this.modalRef);
//       }
//       if (instruction === 'openForm') {
//         this.openForm(this.modalForm);
//       }
//     });
//   }

//   ngOnInit(): void {
//   }

//   open(content: any) {
//     this.ngbmodal.open(content, { ariaLabelledBy: 'modal-basic-title' , size: 'lg' , centered: true , windowClass: 'blured-window' })
//   }

//   openForm(form: any) {
//     this.ngbmodal.open(form, { ariaLabelledBy: 'modal-basic-title' , size: 'lg' , centered: true , windowClass: 'blured-window' })
//   }

//   get img() {
//     return this.form.get('img');
//   }

//   get title() {
//     return this.form.get('title');
//   }

//   get description() {
//     return this.form.get('description');
//   }

//   onSubmit(): void {
//     console.log(this.modalData);
//     console.log(this.form.value);
//     const sendItem = this.modalData;
//     sendItem.img = this.img?.value;
//     sendItem.title = this.title?.value;
//     sendItem.description = this.description?.value;
//     console.log(sendItem);
//   }

// }
