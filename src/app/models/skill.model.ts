export interface Skill {
    id?: number;
    linkedType: {id: number};
    linkedPerson: {id: number};
    name: string;
    lvl: number;
}
export interface SkillRead extends Omit<Skill,"linkedType" | "linkedPerson"> {
    linkedType: {id: number, name: string};
}
