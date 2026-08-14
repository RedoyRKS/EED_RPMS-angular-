import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { SessionService } from '../../core/session.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, Button, Avatar, Menu, TranslatePipe],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell implements OnInit {
  private readonly router = inject(Router);
  private readonly session = inject(SessionService);
  protected readonly i18n = inject(I18nService);
  private readonly profileMenu = viewChild<Menu>('profileMenu');

  protected readonly ready = signal(false);
  protected readonly username = this.session.username;

  protected readonly navItems = [
    { labelKey: 'nav.home', icon: 'pi pi-home', path: '/dashboard' },
    { labelKey: 'nav.eiinList', icon: 'pi pi-list', path: '/eiin-list' },
    { labelKey: 'nav.instituteSearch', icon: 'pi pi-search', path: '/institute-search' },
    { labelKey: 'nav.eiinSearch', icon: 'pi pi-id-card', path: '/eiin-search' },
    { labelKey: 'nav.fundDistribution', icon: 'pi pi-wallet', path: '/fund-distribution' },
  ];

  protected profileItems: MenuItem[] = [];

  async ngOnInit(): Promise<void> {
    await this.i18n.loadScope('common');
    await this.i18n.loadScope('dashboard');
    this.buildProfileMenu();
    this.ready.set(true);
  }

  protected isActive(path: string): boolean {
    return this.router.url === path || this.router.url.startsWith(`${path}/`);
  }

  protected toggleProfile(event: Event): void {
    this.buildProfileMenu();
    this.profileMenu()?.toggle(event);
  }

  protected logout(): void {
    this.session.signOut();
    void this.router.navigateByUrl('/login');
  }

  private buildProfileMenu(): void {
    this.profileItems = [
      {
        label: this.i18n.t('nav.profile'),
        icon: 'pi pi-user',
        command: () => void this.router.navigateByUrl('/profile'),
      },
      {
        label: this.i18n.locale() === 'en' ? 'বাংলা' : 'English',
        icon: 'pi pi-globe',
        command: () => {
          void this.i18n.setLocale(this.i18n.locale() === 'en' ? 'bn' : 'en').then(() => {
            this.buildProfileMenu();
          });
        },
      },
      { separator: true },
      {
        label: this.i18n.t('nav.logout'),
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }
}
