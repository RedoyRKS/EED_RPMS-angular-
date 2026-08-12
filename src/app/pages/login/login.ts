import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputPassword } from 'primeng/inputpassword';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputText, InputPassword, FloatLabel, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected readonly submitted = signal(false);

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
