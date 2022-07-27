import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Background, BackgroundRead } from 'src/app/models';
import { DataHandlerService } from 'src/app/services';
import { BaseFormComponent } from '../../base-form';


@Component({
  selector: 'app-form',
  templateUrl: './background-form.component.html',
  styleUrls: ['./background-form.component.css', '../../base-form/base-form.component.css']
})
export class BackgroundFormComponent extends BaseFormComponent implements OnInit, OnDestroy {

  institutions: string[] = this.dataHandler.institutionList;

  override form: FormGroup = this.formBuilder.group(
    { 
      id: 0,
      linkedType: {id: 0},
      linkedPerson: {id: 1},
      institution: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
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
    private dataHandler: DataHandlerService
  ) { super() }

  ngOnInit(): void {
    this.endDate?.addValidators(this.minDate(this.startDate));
    this.setInstitutions(this.dataHandler.institutionList);
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

  setData(data: BackgroundRead) {
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

  setInstitutions(list: string[]): void {
    this.institutions = [...new Set(list)];
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const background: Background = this.form.value;
    if (background.id == 0 && this.form.valid) {
      this.modal.close(background);
    } else if (!this.form.pristine && !this.form.untouched && this.form.valid) {
      this.dataHandler.editBackground(background);
    }
    this.form.reset();
    this.ngbmodal.dismissAll();
  }

}
