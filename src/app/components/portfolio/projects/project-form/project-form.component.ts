import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/components/base-form';
import { Project, ProjectRead } from 'src/app/models';
import { DataHandlerService } from 'src/app/services';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css', '../../../base-form/base-form.component.css']
})
export class ProjectFormComponent extends BaseFormComponent implements OnInit {

  override form: FormGroup = this.formBuilder.group(
    { 
      id: 0,
      linkedPerson: {id: 1},
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      startDate: ['', [Validators.required, this.maxDate(this.today)]],
      endDate: ['', [this.maxDate(this.today)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      link: ['', [Validators.required]],
      img: ''
    }
  )

  constructor(
    private formBuilder:FormBuilder,
    private ngbmodal:NgbModal,
    private modal:NgbActiveModal,
    private dataHandler:DataHandlerService
  ) { super() }

  ngOnInit(): void {
    this.endDate?.addValidators(this.minDate(this.startDate));
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

  get link() {
    return this.form.get('link');
  }

  get img() {
    return this.form.get('img');
  }

  get description() {
    return this.form.get('description');
  }

  setData(data: ProjectRead) {
    this.form.patchValue({
      id: data.id,
      linkedPerson: {id: 1},
      title: data.title,
      startDate: data.startDate,
      endDate: data.endDate,
      link: data.link,
      description: data.description,
      img: data.img
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const project: Project = this.form.value;
    if (project.id == 0 && this.form.valid) {
      this.modal.close(project);
    } else if (!this.form.pristine && !this.form.untouched && this.form.valid) {
      this.dataHandler.editProject(project);
    }
    this.form.reset();
    this.ngbmodal.dismissAll();
  }

}
