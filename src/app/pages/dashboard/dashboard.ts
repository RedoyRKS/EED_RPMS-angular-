import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

type Area = 'program' | 'progress';

interface ModuleCard {
  titleKey: string;
  bnKey: string;
  descKey: string;
  icon: string;
  path: string;
  tone: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [Card, TranslatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);

  protected readonly ready = signal(false);
  protected readonly area = signal<Area>('progress');

  protected readonly programModules: ModuleCard[] = [
    {
      titleKey: 'dash.mod.programSetup',
      bnKey: 'dash.mod.programSetupBn',
      descKey: 'dash.mod.programSetupDesc',
      icon: 'pi pi-sitemap',
      path: '/program-setup',
      tone: 'green',
    },
    {
      titleKey: 'dash.mod.workPlan',
      bnKey: 'dash.mod.workPlanBn',
      descKey: 'dash.mod.workPlanDesc',
      icon: 'pi pi-calendar',
      path: '/work-plan',
      tone: 'blue',
    },
    {
      titleKey: 'dash.mod.instituteMap',
      bnKey: 'dash.mod.instituteMapBn',
      descKey: 'dash.mod.instituteMapDesc',
      icon: 'pi pi-building',
      path: '/institute-mapping',
      tone: 'teal',
    },
    {
      titleKey: 'dash.mod.resource',
      bnKey: 'dash.mod.resourceBn',
      descKey: 'dash.mod.resourceDesc',
      icon: 'pi pi-box',
      path: '/resource-allocation',
      tone: 'purple',
    },
  ];

  protected readonly progressModules: ModuleCard[] = [
    {
      titleKey: 'dash.mod.tender',
      bnKey: 'dash.mod.tenderBn',
      descKey: 'dash.mod.tenderDesc',
      icon: 'pi pi-verified',
      path: '/tender-approval',
      tone: 'green',
    },
    {
      titleKey: 'dash.mod.demand',
      bnKey: 'dash.mod.demandBn',
      descKey: 'dash.mod.demandDesc',
      icon: 'pi pi-file',
      path: '/fund-demand',
      tone: 'blue',
    },
    {
      titleKey: 'dash.mod.fund',
      bnKey: 'dash.mod.fundBn',
      descKey: 'dash.mod.fundDesc',
      icon: 'pi pi-wallet',
      path: '/fund-distribution',
      tone: 'teal',
    },
    {
      titleKey: 'dash.mod.survey',
      bnKey: 'dash.mod.surveyBn',
      descKey: 'dash.mod.surveyDesc',
      icon: 'pi pi-clipboard',
      path: '/post-allocation-survey',
      tone: 'purple',
    },
  ];

  async ngOnInit(): Promise<void> {
    await this.i18n.loadScope('dashboard');
    this.ready.set(true);
  }

  protected modules(): ModuleCard[] {
    return this.area() === 'progress' ? this.progressModules : this.programModules;
  }

  protected open(path: string): void {
    void this.router.navigateByUrl(path);
  }

  protected setArea(area: Area): void {
    this.area.set(area);
  }
}

// ok.