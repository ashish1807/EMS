import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { ChangeRowColorDirective } from './directives/change-row-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    AddEditEmployeeComponent,
    EmployeeDashboardComponent,
    PageNotFoundComponent,
    NavBarComponent,
    EmployeeTableComponent,
    ChangeRowColorDirective,
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
