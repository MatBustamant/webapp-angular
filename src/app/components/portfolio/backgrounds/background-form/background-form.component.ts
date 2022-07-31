import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/components';
import { Background, BackgroundRead } from 'src/app/models';
import { DataHandlerService, StorageService } from 'src/app/services';


@Component({
  selector: 'app-form',
  templateUrl: './background-form.component.html',
  styleUrls: ['./background-form.component.css', '../../../base-form/base-form.component.css']
})
export class BackgroundFormComponent extends BaseFormComponent implements OnInit {

  imguploaded: boolean = false;

  institutions: string[] = this.dataHandler.institutionList;

  override form: FormGroup = this.formBuilder.group(
    { 
      id: 0,
      linkedType: {id: 0},
      linkedPerson: {id: 1},
      institution: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      image: ['', [Validators.required, Validators.pattern(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
        )]],
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
    private dataHandler: DataHandlerService,
    private storageService: StorageService
  ) { super() }

  ngOnInit(): void {
    this.endDate?.addValidators(this.minDate(this.startDate));
    this.setInstitutions(this.dataHandler.institutionList);
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

  get image() {
    return this.form.get('image');
  }

  setData(data: BackgroundRead) {
    this.form.patchValue({
      id: data.id,
      linkedType: {id: data.linkedType.id},
      linkedPerson: {id: 1},
      institution: data.institution,
      image: data.image,
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

  uploadImg(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.storageService.upload(`img_${Date.now()}`, reader.result).then(
        url => {
          this.imguploaded = true;
          let img = this.image;
          img?.setValue("...");
          setTimeout(function()
          {
            img?.setValue(url);
          }, (1 * 1000));
        });
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const background: Background = this.form.value;
    if (background.id == 0 && this.form.valid) {
      this.modal.close(background);
    } else if (!this.form.pristine && !this.form.untouched && this.form.valid) {
      this.dataHandler.editBackground(background);
    } else if (this.imguploaded && this.form.valid) {
      this.dataHandler.editBackground(background);
    }
    this.form.reset();
    this.ngbmodal.dismissAll();
  }

}
