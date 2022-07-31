import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/components';
import { Persona } from 'src/app/models';
import { DataHandlerService, StorageService, ToastManagementService } from 'src/app/services';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.css', '../../../base-form/base-form.component.css']
})
export class AboutFormComponent extends BaseFormComponent implements OnInit {

  imguploaded: boolean = false;

  override form: FormGroup = this.formBuilder.group(
    {
      id: 1,
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      occupation: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      image: ['', [Validators.required, Validators.pattern(
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
        )]],
      about: ['', [Validators.maxLength(500)]]
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    public modal: NgbActiveModal,
    private dataHandler: DataHandlerService,
    private storageService: StorageService,
    private toastService: ToastManagementService
    ) { super() }

  ngOnInit(): void {
  }

  setData(data: Persona) {
    this.form.patchValue({
      id: 1,
      name: data.name,
      surname: data.surname,
      occupation: data.occupation,
      image: data.image,
      about: data.about
    });
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

  get image() {
    return this.form.get('image');
  }

  get about() {
    return this.form.get('about');
  }

  uploadImg(event: any) {
    this.toastService.show("Espere un momento.")
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
    const persona: Persona = this.form.value;
    if (this.imguploaded && this.form.valid) {
      this.dataHandler.editAbout(persona);
    } else if(!this.form.pristine && !this.form.untouched && this.form.valid) {
      this.dataHandler.editAbout(persona);
    }
    this.form.reset();
    this.ngbmodal.dismissAll();
  }

}
