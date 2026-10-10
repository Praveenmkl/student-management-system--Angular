
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [
    {
      id: 1,
      name: 'Kasun Perera',
      email: 'kasun@example.com',
      course: 'Computer Science',
      age: 22
    },
    {
      id: 2,
      name: 'Nimali Silva',
      email: 'nimali@example.com',
      course: 'Software Engineering',
      age: 21
    },
    {
      id: 3,
      name: 'Amal Fernando',
      email: 'amal@example.com',
      course: 'Information Technology',
      age: 23
    }
  ];

  getStudents(): Student[] {
    return [...this.students];
  }

  addStudent(student: Omit<Student, 'id'>): void {
    const newStudent: Student = {
      id: Date.now(),
      ...student
    };

    this.students = [...this.students, newStudent];
  }

  updateStudent(updatedStudent: Student): void {
    this.students = this.students.map(student =>
      student.id === updatedStudent.id
        ? updatedStudent
        : student
    );
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(
      student => student.id !== id
    );
  }
}
