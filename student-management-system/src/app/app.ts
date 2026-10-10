
import { Component, inject } from '@angular/core';

import { StudentService } from './services/student.service';
import { Student, StudentFormData } from './models/student.model';
import { StudentListComponent } from './student-list/student-list';
import { StudentFormComponent } from './student-form/student-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentListComponent, StudentFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private studentService = inject(StudentService);

  students: Student[] = this.studentService.getStudents();

  showForm = false;
  editingStudent: Student | null = null;

  loadStudents(): void {
    this.students = this.studentService.getStudents();
  }

  openAddForm(): void {
    this.editingStudent = null;
    this.showForm = true;
  }

  onEditStudent(student: Student): void {
    this.editingStudent = student;
    this.showForm = true;
  }

  onSaveStudent(data: StudentFormData): void {
    if (data.id !== undefined) {
      this.studentService.updateStudent({
        id: data.id,
        name: data.name,
        email: data.email,
        course: data.course,
        age: data.age
      });
    } else {
      this.studentService.addStudent({
        name: data.name,
        email: data.email,
        course: data.course,
        age: data.age
      });
    }

    this.loadStudents();
    this.closeForm();
  }

  onDeleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
    this.loadStudents();
  }

  closeForm(): void {
    this.showForm = false;
    this.editingStudent = null;
  }
}
