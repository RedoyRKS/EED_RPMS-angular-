import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { I18nService, Locale } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { SessionService } from '../../core/session.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputText, Password, Button, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly session = inject(SessionService);
  protected readonly i18n = inject(I18nService);

  protected readonly ready = signal(false);
  protected readonly loading = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  async ngOnInit(): Promise<void> {
    await this.i18n.loadScope('common');
    await this.i18n.loadScope('login');
    this.ready.set(true);
  }

  protected setLocale(locale: Locale): void {
    void this.i18n.setLocale(locale);
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.session.signIn(this.form.controls.username.value.trim());
    window.setTimeout(() => {
      this.loading.set(false);
      void this.router.navigateByUrl('/dashboard');
    }, 400);
  }
}
