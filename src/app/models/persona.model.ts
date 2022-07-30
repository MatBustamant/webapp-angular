import { BackgroundRead } from "./background.model";
import { ProjectRead } from "./project.model";
import { SkillRead } from "./skill.model";

export interface Persona {
    id?:number;
    name:string;
    surname:string;
    occupation:string;
    image:string,
    about?:string;
}
export interface PersonaRead extends Persona {
    backgroundList:BackgroundRead[];
    projectList:ProjectRead[];
    skillList:SkillRead[];
}
