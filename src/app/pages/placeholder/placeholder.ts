import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-placeholder',
  imports: [Card, Button, TranslatePipe],
  template: `
    @if (ready()) {
      <p-card>
        <h2>{{ titleKey | translate }}</h2>
        <p>{{ 'page.comingSoon' | translate }}</p>
        <p-button
          [label]="'nav.home' | translate"
          icon="pi pi-home"
          (onClick)="goHome()"
        />
      </p-card>
    }
  `,
  styles: `
    h2 {
      margin: 0 0 0.5rem;
      color: #12355b;
    }
    p {
      color: #64748b;
      margin: 0 0 1.2rem;
    }
  `,
})
export class Placeholder implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);

  protected readonly ready = signal(false);
  protected titleKey = 'page.comingSoon';

  async ngOnInit(): Promise<void> {
    await this.i18n.loadScope('common');
    await this.i18n.loadScope('dashboard');
    this.titleKey = this.route.snapshot.data['titleKey'] ?? 'page.comingSoon';
    this.ready.set(true);
  }

  protected goHome(): void {
    void this.router.navigateByUrl('/dashboard');
  }
}
