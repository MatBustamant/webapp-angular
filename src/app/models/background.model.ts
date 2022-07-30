export interface Background {
    id?: number;
    linkedType: {id:number};
    institution: string;
    linkedPerson: {id:number};
    image: string;
    title?: string;
    startDate: string;
    endDate: string | null;
    description?: string;
}
export interface BackgroundRead extends Omit<Background, "linkedType" | "linkedPerson">{
    linkedType: {id:number, name:string};
}
