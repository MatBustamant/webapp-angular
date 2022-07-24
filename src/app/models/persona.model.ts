import { About } from "./about.model";
import { BackgroundRead } from "./background.model";
import { ProjectRead } from "./project.model";
import { SkillRead } from "./skill.model";

export interface Persona {
    id?:number;
    name:string;
    surname:string;
    age:number;
    occupation:string;
}
export interface PersonaRead extends Persona {
    about:About;
    backgroundList:BackgroundRead[];
    projectList:ProjectRead[];
    skillList:SkillRead[];
}
