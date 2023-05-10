import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learner-dashboard',
  templateUrl: './learner-dashboard.component.html',
  styleUrls: ['./learner-dashboard.component.css']
})
export class LearnerDashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }
  token: string = history.state.name
  Courses: Array<course> = []
  displayform=false
  enrollmentID: string = ""
  username: string = ""
  courseID: string = ""
  toggleform(){
    this.displayform=!this.displayform;
  }
  ngOnInit(): void {
    let options = {
      headers: new HttpHeaders().set('Authorization',this.token.toString())
    };
    this.http.get<Array<course>>('http://localhost:5000/api/courses/getCourse',options).subscribe(response =>{
      console.log(response)
      this.Courses=response
    })
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
  enrollCourse(ncourseID: string){
    let options = {
      headers: new HttpHeaders().set('Authorization', this.token)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams()
    body.set("courseID", ncourseID)
    this.http.post('http://localhost:5000/api/courses/enrollLearner2',body.toString(),options).subscribe(response =>{
      console.log(response)
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
