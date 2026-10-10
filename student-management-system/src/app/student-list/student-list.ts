
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../models/student.model';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentListComponent {
  @Input() students: Student[] = [];

  @Output() deleteRequested = new EventEmitter<number>();
  @Output() editRequested = new EventEmitter<Student>();

  searchText = '';

  get filteredStudents(): Student[] {
    const search = this.searchText.trim().toLowerCase();

    return this.students.filter(student =>
      student.name.toLowerCase().includes(search)
    );
  }

  onDelete(id: number): void {
    this.deleteRequested.emit(id);
  }

  onEdit(student: Student): void {
    this.editRequested.emit(student);
  }
}
