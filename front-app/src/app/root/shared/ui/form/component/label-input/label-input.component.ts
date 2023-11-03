import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-label-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss'],
})
export class LabelInputComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl<any>;
  inputFocus: boolean = false;
}
