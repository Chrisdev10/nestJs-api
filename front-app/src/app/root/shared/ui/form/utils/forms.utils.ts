import { WritableSignal } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HandleValueChangeFn, FormError, GetAllFormErrorsFn } from '../type';
/**
 * Extract error from FormGroup and stored them into arrays
 * @param form FormGroup instance
 * @returns Errors array
 */
const getFormValidationErrors: GetAllFormErrorsFn = (
  form: FormGroup
): FormError[] => {
  const result: FormError[] = [];
  Object.keys(form.controls).forEach(key => {
    const controlErrors: ValidationErrors | null = !form.get(key)!.pristine
      ? form.get(key)!.errors
      : null;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(keyError => {
        result.push({
          control: key,
          error: keyError,
          value: controlErrors[keyError],
        });
      });
    }
  });
  return result;
};
/**
 * Error manager. It will store any error into signal and will be evaluated every changes(onChange listener)
 * @param form 
 * @param signal 
 */
export const handleFormError: HandleValueChangeFn = (
  form: FormGroup,
  signal: WritableSignal<FormError[]>
): void => {
  form.valueChanges
    .pipe(
      takeUntilDestroyed(),
      // transform the value to FormError array
      map(() => getFormValidationErrors(form)),
      // send signal with new errors
      tap((errors: FormError[]) => signal.set(errors))
    )
    .subscribe();
};
