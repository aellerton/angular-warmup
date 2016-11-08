import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './auth/can-deactivate-guard.service';
import { AuthGuard }          from './auth/auth-guard.service';
import { PreloadSelectedModules } from './selective-preload-strategy';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { LoginComponent } from './login.component';
import { NavComponent } from './nav.component';
import { PageNotFoundComponent } from './pagenotfound.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuard]
      },
      { path: '', 
        component: NavComponent,
        children: [
              { path: 'about', component: AboutComponent },
              //{ path: 'login', component: LoginComponent },
              //{ path: 'welcome', component: HomeComponent},
              //{ path: '', redirectTo: '/welcome', pathMatch: 'full'  },
              { path: '', component: HomeComponent, pathMatch: 'full'  },
            ]
      },
      { path: '**', 
        component: PageNotFoundComponent 
      },
    ],
    { preloadingStrategy: PreloadSelectedModules })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    PreloadSelectedModules
  ]
})
export class AppRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/