import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/components/base-form';
import { Skill, SkillRead } from 'src/app/models';
import { CRUDService, ModalManagementService, PersonaService } from 'src/app/services';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent extends BaseFormComponent implements OnInit {

  // subscription:Subscription;

  private originalSkill!: SkillRead;

  // @ViewChild('skillmodal')
  // private editForm?: TemplateRef<any>;

  override form: FormGroup = this.formBuilder.group(
    {
      id: [0],
      linkedType: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      lvl: [0, [Validators.required, Validators.min(0), Validators.max(1), Validators.pattern('^(?:0(?:[.][0-9]?)?|1(?:[.]0?)?)$')]],
      image: ['https://via.placeholder.com/50']
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private ngbmodal: NgbModal,
    private modal: NgbActiveModal,
    private personaService: PersonaService
  ) {
    super()
    // this.subscription = this.modalManagement.data.subscribe((data) => {this.setData(data)});
    // this.modalManagement.action.subscribe((instruction)=>{
    //     if (instruction === 'editSkill') {
    //       this.open(this.editForm);
    //     }
    // });
  }

  ngOnInit(): void {
  }

  // unsubscribe(): boolean {
  //   this.subscription.unsubscribe;
  //   return true;
  // }

  // open(content: any) {
  //   const modalRef = this.ngbmodal.open(content, { size: 'lg' , centered: true , windowClass: 'blured-window' });
  // }

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

  // isInvalidField(field:string) {
  //   const fieldName = this.form.get(field);
  //   return (fieldName?.invalid && fieldName?.touched);
  // }

  // isEmptyField(field:string) {
  //   const fieldName = this.form.get(field);
  //   return (fieldName?.value=="");
  // }

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
          this.personaService.editSkill(skill, this.originalSkill);
        }
      }
    }
    this.form.reset();
    this.ngbmodal.dismissAll();
  }

}
