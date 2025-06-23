export interface Profile {
    id: number; // Changed from string to number to match backend
    firstName: string;
    lastName: string;
    email: string;
    role: 'student' | 'faculty' | 'admin' | 'guest'; // More specific typing
    createdAt: string;
    updatedAt: string;
    student?: Student;
}

export interface CreateProfileInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'student' | 'faculty' | 'admin' | 'guest';
}

export interface Student {
    id: string;
    enrollmentDate: string;
    degreeProgram: string;
    gpa: string;
    createdAt: string;
    updatedAt: string;
}
