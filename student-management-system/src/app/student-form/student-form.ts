
import {Component,Input,Output,EventEmitter,OnChanges,SimpleChanges,inject} from'@angular/core';
import {FormBuilder,ReactiveFormsModule,Validators} from '@angular/forms';
import { Student, StudentFormData } from '../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css'
})
export class StudentFormComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() student: Student | null = null;

  @Output() saveStudent = new EventEmitter<StudentFormData>();
  @Output() cancelForm = new EventEmitter<void>();

  studentForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    course: ['', Validators.required],
    age: [18, [Validators.required, Validators.min(16), Validators.max(100)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student']) {
      if (this.student) {
        this.studentForm.reset({
          name: this.student.name,
          email: this.student.email,
          course: this.student.course,
          age: this.student.age
        });
      } else {
        this.studentForm.reset({
          name: '',
          email: '',
          course: '',
          age: 18
        });
      }
    }
  }

  submitForm(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formData: StudentFormData = {
      ...this.studentForm.getRawValue(),
      ...(this.student ? { id: this.student.id } : {})
    };

    this.saveStudent.emit(formData);
  }

  cancel(): void {
    this.cancelForm.emit();
  }
}
