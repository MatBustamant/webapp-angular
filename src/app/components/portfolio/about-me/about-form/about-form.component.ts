import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/components/base-form';
import { Persona } from 'src/app/models';
import { DataHandlerService } from 'src/app/services';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.css', '../../../base-form/base-form.component.css']
})
export class AboutFormComponent extends BaseFormComponent implements OnInit {

  override form: FormGroup = this.formBuilder.group(
    {
      id: 1,
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      occupation: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      about: ['', [Validators.maxLength(300)]]
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    private dataHandler: DataHandlerService
    ) { super() }

  ngOnInit(): void {
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

  onSubmit(event: Event): void {
    event.preventDefault();
    const persona: Persona = this.form.value;
    if(!this.form.pristine && !this.form.untouched && this.form.valid) {
      this.dataHandler.editAbout(persona);
    }
    this.form.reset();
    this.ngbmodal.dismissAll();
  }

}
