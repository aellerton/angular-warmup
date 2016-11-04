import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home.component';
import { ProfileComponent } from './profile.component';

import { CanDeactivateGuard } from '../auth/can-deactivate-guard.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { PreloadSelectedModules } from '../selective-preload-strategy';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard', // weird but important. If '.' then going to host:port/ tries to go to dashboard... sometimes
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            canActivateChild: [AuthGuard],
            children: [
              { path: 'profile', component: ProfileComponent },
              { path: '', component: DashboardHomeComponent, pathMatch: 'full' }
            ]
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    PreloadSelectedModules
  ]
})
export class DashboardRoutingModule {}