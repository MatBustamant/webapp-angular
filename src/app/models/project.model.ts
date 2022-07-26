export interface Project {
    id: number | null;
    linkedPerson: {id: number};
    title: string;
    startDate: String;
    endDate: String | null;
    description: string;
    link: string;
    img: string | null;
}
export interface ProjectRead extends Omit<Project, "linkedPerson" | "startDate" | "endDate">{
    startDate: Date;
    endDate: Date | null;
}
