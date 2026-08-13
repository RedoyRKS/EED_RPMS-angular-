import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type Locale = 'en' | 'bn';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);
  private readonly translations = signal<Record<string, string>>({});
  private readonly loadedScopes = new Set<string>();

  readonly locale = signal<Locale>(
    localStorage.getItem('eed-rpms-locale') === 'bn' ? 'bn' : 'en',
  );

  async loadScope(scope: string): Promise<void> {
    this.loadedScopes.add(scope);
    await this.reloadAll();
  }

  async setLocale(locale: Locale): Promise<void> {
    if (locale === this.locale()) {
      return;
    }

    this.locale.set(locale);
    localStorage.setItem('eed-rpms-locale', locale);
    await this.reloadAll();
  }

  t(key: string): string {
    return this.translations()[key] ?? key;
  }

  private async reloadAll(): Promise<void> {
    const locale = this.locale();
    let merged: Record<string, string> = {};

    for (const scope of this.loadedScopes) {
      try {
        const data = await firstValueFrom(
          this.http.get<Record<string, string>>(`assets/i18n/${scope}/${locale}.json`),
        );
        merged = { ...merged, ...data };
      } catch {
        // keep going if a file is missing
      }
    }

    this.translations.set(merged);
    document.documentElement.lang = locale;
  }
}
