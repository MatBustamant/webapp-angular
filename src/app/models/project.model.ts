export interface Project {
    id?: number;
    linkedPerson: {id: number};
    title: string;
    duration: string;
    description: string;
    evidence: string;
}
export interface ProjectRead extends Omit<Project, "linkedPerson">{
}
