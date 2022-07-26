import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/models';
import { ModalManagementService, PersonaService } from 'src/app/services';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.css']
})
export class AboutFormComponent implements OnInit {

  @Output() personaEditada: EventEmitter<Persona> = new EventEmitter<Persona>();

  @ViewChild('formmodal')
  private editForm?: TemplateRef<any>;

  form: FormGroup = this.formBuilder.group(
    {
      id: [1],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      occupation: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      about: ['', [Validators.maxLength(300)]]
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private modalManagement: ModalManagementService,
    private ngbmodal: NgbModal,
    private personaService: PersonaService
    ) {
    this.modalManagement.data.subscribe((data) => {this.setData(data)})
    this.modalManagement.action.subscribe((instruction)=>{
        if (instruction === 'editAbout') {
          this.open(this.editForm);
        }
    });
  }

  ngOnInit(): void {
  }

  open(content: any) {
    this.ngbmodal.open(content, { size: 'lg' , centered: true , windowClass: 'blured-window' })
  }

  setData(data: Persona) {
    this.form.patchValue({
      id: 1,
      name: data.name,
      surname: data.surname,
      occupation: data.occupation,
      about: data.about
    })
  }

  get name() {
    return this.form.get('name');
  }

  get surname() {
    return this.form.get('surname');
  }

  get occupation() {
    return this.form.get('occupation');
  }

  get about() {
    return this.form.get('about');
  }

  isInvalidField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.invalid && fieldName?.touched);
  }

  isEmptyField(field:string) {
    const fieldName = this.form.get(field);
    return (fieldName?.value=="");
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const persona: Persona = this.form.value;
    if(this.form.valid){
      this.personaService.editPersona(persona).subscribe({
        next: (response: Persona) => {
          this.personaEditada.emit(response);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
      this.form.reset();
      this.ngbmodal.dismissAll();
    }
  }

}
