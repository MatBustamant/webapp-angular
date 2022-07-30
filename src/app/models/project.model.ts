export interface Project {
    id: number | null;
    linkedPerson: {id: number};
    title: string;
    startDate: string;
    endDate: string | null;
    description: string;
    link: string;
    image: string;
}
export interface ProjectRead extends Omit<Project, "linkedPerson">{
}
