import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/components';
import { Project, ProjectRead } from 'src/app/models';
import { DataHandlerService, StorageService, ToastManagementService } from 'src/app/services';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css', '../../../base-form/base-form.component.css']
})
export class ProjectFormComponent extends BaseFormComponent implements OnInit {

  imguploaded: boolean = false;

  override form: FormGroup = this.formBuilder.group(
    { 
      id: 0,
      linkedPerson: {id: 1},
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      startDate: ['', [Validators.required, this.maxDate(this.today)]],
      endDate: ['', [this.maxDate(this.today)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      link: ['', [Validators.required, Validators.pattern(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i)]],
      image: ['', [Validators.required, Validators.pattern(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
        )]],
    }
  )

  constructor(
    private formBuilder:FormBuilder,
    private ngbmodal:NgbModal,
    private modal:NgbActiveModal,
    private dataHandler:DataHandlerService,
    private storageService:StorageService,
    private toastService:ToastManagementService
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

  get image() {
    return this.form.get('image');
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
      image: data.image
    });
  }

  uploadImg(event: any) {
    this.toastService.show("Espere un momento.");
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.storageService.upload(`img_${Date.now()}`, reader.result).then(
        url => {
          this.imguploaded = true;
          let img = this.image;
          let toast = this.toastService;
          img?.setValue("...");
          setTimeout(function()
          {
            img?.setValue(url);
            toast.show("Imágen subida con éxito.", {classname: 'success'});
          }, (1 * 1000));
        });
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const project: Project = this.form.value;
    if (project.id == 0 && this.form.valid) {
      this.modal.close(project);
    } else if (!this.form.pristine && !this.form.untouched && this.form.valid) {
      this.dataHandler.editProject(project);
    } else if (this.imguploaded && this.form.valid) {
      this.dataHandler.editProject(project);
    }
    this.form.reset();
    this.ngbmodal.dismissAll();
  }

}
