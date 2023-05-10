import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-course-enrollment',
  templateUrl: './course-enrollment.component.html',
  styleUrls: ['./course-enrollment.component.css']
})
export class CourseEnrollmentComponent implements OnInit {
  displayform: boolean = false;

  constructor(private http: HttpClient) { }
  token: string = history.state.name
  enrollmentArray : Array<CourseEnroll> = []
  enrollmentID: string = ""
  username: string = ""
  courseID: string = ""
  ngOnInit(): void {
    let options = {
      headers: new HttpHeaders().set('Authorization', this.token)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.get<Array<CourseEnroll>>('http://localhost:5000/api/courses/getEnrollment',options).subscribe(response =>{
      this.enrollmentArray=response;
    })
  }
  removeEnrollment(eID: string){

  }
  enrolluser(){
    let options = {
      headers: new HttpHeaders().set('Authorization', this.token)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams()
    body.set("enrollmentID", this.enrollmentID)
    body.set("courseID", this.courseID)
    body.set("learnerID", this.username)
    this.http.post('http://localhost:5000/api/courses/enrollLearner',body.toString(),options).subscribe(response =>{
      console.log(response)
    })
  }
  toggleform(){
    this.displayform=!this.displayform;
  }

}
interface CourseEnroll{
  enrollmentID: string,
  learnerID: string,
  courseID: string,
  Assessments: [{
    assessment: string,
    obtainedMarks: number,
    weightage: number
  }],
  materials: [{mId: string}],
  isCompleted: boolean,
  progress: number
}