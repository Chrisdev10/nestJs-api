import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-label-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss'],
})
export class LabelInputComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl<any>;
  inputFocus: boolean = false;
}
