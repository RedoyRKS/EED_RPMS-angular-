import { Injectable, signal } from '@angular/core';
import commonBn from './common/bn.json';
import commonEn from './common/en.json';
import dashboardBn from '../../pages/dashboard/i18n/bn.json';
import dashboardEn from '../../pages/dashboard/i18n/en.json';
import loginBn from '../../pages/login/i18n/bn.json';
import loginEn from '../../pages/login/i18n/en.json';

export type Locale = 'en' | 'bn';

const catalogs: Record<string, Record<Locale, Record<string, string>>> = {
  common: { en: commonEn, bn: commonBn },
  login: { en: loginEn, bn: loginBn },
  dashboard: { en: dashboardEn, bn: dashboardBn },
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly translations = signal<Record<string, string>>({});
  private readonly loadedScopes = new Set<string>();

  readonly locale = signal<Locale>(
    localStorage.getItem('eed-rpms-locale') === 'bn' ? 'bn' : 'en',
  );

  async loadScope(scope: string): Promise<void> {
    this.loadedScopes.add(scope);
    this.reloadAll();
  }

  async setLocale(locale: Locale): Promise<void> {
    if (locale === this.locale()) {
      return;
    }

    this.locale.set(locale);
    localStorage.setItem('eed-rpms-locale', locale);
    this.reloadAll();
  }

  t(key: string): string {
    return this.translations()[key] ?? key;
  }

  private reloadAll(): void {
    const locale = this.locale();
    let merged: Record<string, string> = {};

    for (const scope of this.loadedScopes) {
      merged = { ...merged, ...(catalogs[scope]?.[locale] ?? {}) };
    }

    this.translations.set(merged);
    document.documentElement.lang = locale;
  }
}
