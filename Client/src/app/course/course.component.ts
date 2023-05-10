import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router) {
   }
   token: string = history.state.name
  Courses: Array<course> = []
  title :string=''
  ID :string=''
  Duration: string=''
  Instructor :string=''
  Difficulty: string=''

  displayform=false
  
  ngOnInit(): void {
    let options = {
      headers: new HttpHeaders().set('Authorization',this.token.toString())
    };
    this.http.get<Array<course>>('http://localhost:5000/api/courses/getCourse',options).subscribe(response =>{
      console.log(response)
      this.Courses=response
    })
  }
  toggleform(){
    this.displayform=!this.displayform;
  }

  addproj(){
    console.log(this.title)
    console.log(this.ID)
    console.log(this.Instructor)
    console.log(this.Difficulty)
    console.log(this.Duration)
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                              .set('Authorization',this.token.toString())
    };
    let body = new URLSearchParams();
    body.set('name',this.title);
    body.set('id',this.ID);
    body.set('instructor',this.Instructor);
    body.set('difficulty',this.Difficulty);
    body.set('duration',this.Duration);
    this.http.post('http://localhost:5000/api/courses/addCourse',body.toString(),options).subscribe(response =>{
      console.log(response)
    })
    this.displayform=!this.displayform;
  }
  removeCourse(courseID: string){
    console.log(courseID)
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Authorization',this.token.toString())
    };
    let body = new URLSearchParams();
    body.set('id',courseID);
    this.http.post('http://localhost:5000/api/courses/removeCourse',body.toString(),options).subscribe(response =>{
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
