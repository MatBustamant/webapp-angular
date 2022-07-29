export interface Project {
    id: number | null;
    linkedPerson: {id: number};
    title: string;
    startDate: string;
    endDate: string | null;
    description: string;
    link: string;
    img: string | null;
}
export interface ProjectRead extends Omit<Project, "linkedPerson">{
}
