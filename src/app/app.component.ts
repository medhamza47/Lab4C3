import { DecimalPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';
import { StudentService } from './student.service';

function emptyDraft() {
  return { firstName: '', lastName: '', email: '', grade: null as number | null, active: true };
}

@Component({
  selector: 'app-root',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  readonly service = inject(StudentService);
  private readonly destroyRef = inject(DestroyRef);
  readonly searchChanges = new Subject<string>();
  private readonly query = signal('');
  readonly filteredStudents = computed(() => this.service.students().filter(student =>
    `${student.firstName} ${student.lastName} ${student.email}`.toLowerCase().includes(this.query())));
  draft = emptyDraft();

  ngOnInit(): void {
    this.searchChanges.pipe(
      map(value => value.trim().toLowerCase()),
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(query => this.query.set(query));
  }

  add(): void {
    const { firstName, lastName, email, grade, active } = this.draft;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || grade === null || grade < 0 || grade > 20) return;
    this.service.add({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim(), grade, active });
    this.draft = emptyDraft();
  }
}
