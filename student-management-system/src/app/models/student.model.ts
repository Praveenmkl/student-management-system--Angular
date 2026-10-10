export interface Student {
    id: number;
    name: string;
    email:string;
    course:string;
    age:number;
}

export type StudentFormData = Omit<Student, 'id'> & {
    id?: number;
};
