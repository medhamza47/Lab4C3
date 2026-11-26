import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Student } from './models/student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private nextId = 3;
  private readonly studentsSignal: WritableSignal<Student[]> = signal([
    { id: 1, firstName: 'Alice', lastName: 'Dupont', email: 'alice@example.com', grade: 16, active: true },
    { id: 2, firstName: 'Bob', lastName: 'Martin', email: 'bob@example.com', grade: 9, active: true },
  ]);
  readonly students = this.studentsSignal.asReadonly();
  readonly total = computed(() => this.students().length);
  readonly admitted = computed(() => this.students().filter(student => student.grade >= 10).length);
  readonly average = computed(() => this.total()
    ? this.students().reduce((sum, student) => sum + student.grade, 0) / this.total()
    : 0);

  constructor() {
    effect(() => console.info('EduManager — étudiants inscrits :', this.total()));
  }

  add(student: Omit<Student, 'id'>): void {
    const id = this.nextId++;
    this.studentsSignal.update(current => [...current, { ...student, id }]);
  }

  remove(id: number): void {
    this.studentsSignal.update(current => current.filter(student => student.id !== id));
  }

  updateGrade(id: number, grade: number): void {
    this.studentsSignal.update(current => current.map(student =>
      student.id === id ? { ...student, grade } : student));
  }

  resetList(): void { this.studentsSignal.set([]); }
}
