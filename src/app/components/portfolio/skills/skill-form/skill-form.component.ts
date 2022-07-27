import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseFormComponent } from 'src/app/components/base-form';
import { Skill, SkillRead } from 'src/app/models';
import { DataHandlerService } from 'src/app/services';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css', '../../../base-form/base-form.component.css']
})
export class SkillFormComponent extends BaseFormComponent implements OnInit {

  private originalSkill!: SkillRead;

  override form: FormGroup = this.formBuilder.group(
    {
      id: 0,
      linkedType: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      lvl: [0, [Validators.required, Validators.min(0), Validators.max(1), Validators.pattern('^(?:0(?:[.][0-9]?)?|1(?:[.]0?)?)$')]],
      image: 'https://via.placeholder.com/50'
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    private modal: NgbActiveModal,
    private dataHandler: DataHandlerService
  ) { super() }

  ngOnInit(): void {
  }

  setData(data: SkillRead) {
    this.originalSkill = data;
    this.form.patchValue({
      id: data.id,
      linkedType: data.linkedType.id,
      name: data.name,
      lvl: data.lvl
    })
  }

  get linkedType() {
    return this.form.get('linkedType');
  }

  get name() {
    return this.form.get('name');
  }

  get lvl() {
    return this.form.get('lvl');
  }

  get image() {
    return this.form.get('image');
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    let skill: Skill = {
      id: this.form.get('id')?.value,
      linkedType: {id: this.linkedType?.value},
      linkedPerson: {id: 1},
      name: this.name?.value,
      lvl: this.lvl?.value
    }
    if (skill.id == 0) {
      if (this.form.valid) {
        this.modal.close(skill);
      }
    } else {
      if (!this.form.pristine && !this.form.untouched) {
        if(this.form.valid){
          this.dataHandler.editSkill(skill, this.originalSkill);
        }
      }
    }
    this.form.reset();
    this.ngbmodal.dismissAll();
  }

}
