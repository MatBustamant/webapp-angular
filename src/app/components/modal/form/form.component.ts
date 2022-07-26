import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Background, BackgroundRead } from 'src/app/models';
import { PersonaService } from 'src/app/services';
import { BaseFormComponent } from '../../base-form';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css', '../../base-form/base-form.component.css']
})
export class FormComponent extends BaseFormComponent implements OnInit, OnDestroy {

  originalItem!: any;
  institutions: string[] = this.personaService.institutions;

  override form: FormGroup = this.formBuilder.group(
    { 
      id: 0,
      linkedType: {id: 0},
      linkedPerson: {id: 1},
      institution: ['', [Validators.required]],
      img: '',
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      startDate: ['', [Validators.required, this.maxDate(this.today)]],
      endDate: ['', [this.maxDate(this.today)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    private modal: NgbActiveModal,
    private personaService: PersonaService
  ) { super() }

  ngOnInit(): void {
    this.endDate?.addValidators(this.minDate(this.startDate));
  }

  ngOnDestroy(): void {
    this.form.reset();
  }

  get title() {
    return this.form.get('title');
  }

  get startDate() {
    return this.form.get('startDate');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  get description() {
    return this.form.get('description');
  }

  get institution() {
    return this.form.get('institution');
  }

  // isInvalidField(field:string) {
  //   const fieldName = this.form.get(field);
  //   return (fieldName?.invalid && fieldName?.touched);
  // }

  // isEmptyField(field:string) {
  //   const fieldName = this.form.get(field);
  //   return (fieldName?.value=="" || fieldName?.value == null);
  // }

  setData(data: BackgroundRead) {
    this.originalItem = data;
      this.form.patchValue({
        id: data.id,
        linkedType: {id: data.linkedType.id},
        linkedPerson: {id: 1},
        institution: data.institution,
        img: data.img,
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description
      })
  }

  setType(type: number) {
    this.form.patchValue({
      linkedType: {id: type}
    })
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const background: Background = this.form.value;
    if (background.id == 0 && this.form.valid) {
      this.modal.close(background);
    } else if (!this.form.pristine && !this.form.untouched && this.form.valid) {
      this.personaService.editBackground(background);
    }
    this.form.reset();
    this.ngbmodal.dismissAll();
  }

}
