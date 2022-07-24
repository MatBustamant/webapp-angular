import { Institution } from "./institution.model";

export interface Background {
    id?: number;
    linkedType: {id:number};
    linkedInstitution: {id:number};
    linkedPerson: {id:number};
    title: string;
    duration: string;
    description: string;
}
export interface BackgroundRead extends Omit<Background, "linkedType" | "linkedInstitution" | "linkedPerson">{
    linkedType: {id:number, name:string};
    linkedInstitution: Institution;
}
