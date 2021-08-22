import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  showAddTask: boolean;
  subscription: Subscription;
  form: FormGroup;

  constructor(private uiService: UiService, private readonly fb: FormBuilder) {
    this.subscription = this.uiService
    .onToggle()
    .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      text: ['', Validators.required],
      day: [''],
      reminder: false
    })
  }

  get text(): AbstractControl {
    return this.form.get('text');
  }

  get day(): AbstractControl {
    return this.form.get('day');
  }

  get reminder(): AbstractControl {
    return this.form.get('reminder');
  }

  onSubmit() {
    if (!this.text.value) {
      alert('Please add a task!');
      return;
    }

    const newTask = {
      text: this.text.value,
      day_time: this.day.value,
      reminder: this.reminder.value
    }

    // @todo - emit event
    this.onAddTask.emit(newTask);
    this.initForm()
  }
}
