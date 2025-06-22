export interface Profile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    student?: Student;
}

export interface Student {
    id: string;
    enrollmentDate: string;
    degreeProgram: string;
    gpa: string;
    createdAt: string;
    updatedAt: string;
}
