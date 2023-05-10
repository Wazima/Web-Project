import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }
  name: string = "Admin"
  courses: number = 0
  materials: number = 0
  learners: number = 0
  certificates: number = 0
  enrolledCourses: number = 0
  token: string = history.state.name
  courseArray: Array<course> = []
  ngOnInit(): void {
    let options = {
      headers: new HttpHeaders().set('Authorization', history.state.name)
    };
    this.http.get<dashboardResponse>('http://localhost:5000/api/users/admin/dashboard',options).subscribe(response =>{
      console.log(response)
      this.courses=response.totalCourses
      this.materials=response.materialCount
      this.learners=response.totalLearners
      this.certificates=response.certificateCount
      this.enrolledCourses=response.enrolledCoursesCount
      this.courseArray=response.allCourses
    })
  }
}
interface course{
  _id: string,
    difficulty: number,
    duration: number,
    id: string,
    instructor: string,
    name: string,
    __v: number
}
interface dashboardResponse{
  allCourses : [course],
  certificateCount: number,
  materialCount: number,
  totalCourses: number,
  totalLearners: number,
  enrolledCoursesCount: number
}