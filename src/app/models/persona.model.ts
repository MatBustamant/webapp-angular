import { Background } from "./background.model";
import { Project } from "./project.model";
import { SkillLevel } from "./skill-level.model";

export interface Persona {
    id:number;

    name:string;

    surname:string;

    age:number;

    occupation:string;
    
    backgroundList:Background[];

    projectList:Project[];

    skillList:SkillLevel[];
}