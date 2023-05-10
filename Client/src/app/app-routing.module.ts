import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppComponent } from './app.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { CourseEnrollmentComponent } from './course-enrollment/course-enrollment.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { LearnerDashboardComponent } from './learner-dashboard/learner-dashboard.component';
import { LoginComponent } from './login/login.component';
import { MaterialComponent } from './material/material.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path:'register', component:RegisterComponent},
  {path: 'adminDashboard', component:AdminDashboardComponent},
  {path: 'courses', component:CourseComponent},
  {path: 'materials', component:MaterialComponent},
  {path: 'assessments', component:AssessmentsComponent},
  {path: 'courseEnrollment', component:CourseEnrollmentComponent},
  {path: 'learnerDashboard', component:LearnerDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
