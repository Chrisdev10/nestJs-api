import { Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignInForm } from '@Security';
import {
  LabelInputComponent,
  FormError,
  handleFormError,
  InputComponent,
} from '@Shared';
import { ApiService, ConcatPipe } from '@Shared/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    LabelInputComponent,
    ReactiveFormsModule,
    TranslateModule,
    ConcatPipe,
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent {
  formGroup: FormGroup;
  errors: WritableSignal<FormError[]> = signal([]);
  userNameLabel: string = 'username';
  passwordLabel: string = 'password';
  private readonly api: ApiService = inject(ApiService);
  constructor() {
    this.formGroup = new FormGroup<SignInForm>(<SignInForm>{
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
    handleFormError(this.formGroup, this.errors);
  }
  get(key: string): FormControl<any> {
    return this.formGroup.get(key)! as FormControl<any>;
  }

  onSubmit() {
    this.api
      .get(
        `account?login=${this.get('username').value}&pwd=${
          this.get('password').value
        }`
      )
      .subscribe(data => {
        console.log('my data', data);
      });
  }
}
