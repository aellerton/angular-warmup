import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

//import { CoreModule }       from '../core/core.module';
import { QuotesModule } from '../quotes/quotes.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home.component';
import { ProfileComponent } from './profile.component';

//import { AuthGuard } from '../auth/auth-guard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    QuotesModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    ProfileComponent
  ]
})
export class DashboardModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/