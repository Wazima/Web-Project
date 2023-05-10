import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { MaterialComponent } from './material/material.component';
import { LearnerDashboardComponent } from './learner-dashboard/learner-dashboard.component';
import { CourseEnrollmentComponent } from './course-enrollment/course-enrollment.component';
import { AssessmentsComponent } from './assessments/assessments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    HomeComponent,
    CourseComponent,
    MaterialComponent,
    LearnerDashboardComponent,
    CourseEnrollmentComponent,
    AssessmentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
