import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { json } from 'body-parser';
import { stringify } from 'querystring';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit {
  statement :string=''
  option1 :string=''
  option2: string=''
  option3 :string=''
  option4 :string=''
  ans: string=''
  aname :string=''
  aID :string=''
  atime: string=''
  amarks :string=''

  detail: {statement: string, option1: string,option2: string,option3: string,option4: string, answer: string}[] = [
    {"statement": "this is a question", "option1": "1","option2": "2","option3": "3","option4": "4", "answer": '2'}];
  num=1
  

  displayform1=false
  displayform2=false
  displayqs=false

  constructor(private http: HttpClient) { }
  assessments: Array<assessment> = []
  token: string = history.state.name
  ngOnInit(): void {
    let options = {
      headers: new HttpHeaders().set('Authorization', this.token)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.get<Array<assessment>>('http://localhost:5000/api/assessments/getAssessment',options).subscribe(response =>{
      console.log(response)
      this.assessments=response
    })
  }
  removeAssessment(assessmentID: string){
    let options = {
      headers: new HttpHeaders().set('Authorization', this.token)
                    .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams()
    body.set("id",assessmentID)
    this.http.post('http://localhost:5000/api/assessments/removeAssessment',body.toString(),options).subscribe(response =>{
      console.log(response)
    })
  }
  toggleqs(){
    this.displayqs=!this.displayqs;
  }

  toggleform1(){
    this.displayform1=!this.displayform1;
  }
  toggleform2(){
    this.displayform2=!this.displayform2;
    this.displayform1=!this.displayform1;
  }

  addassessment(){
    console.log(this.aID,this.aname)
    let options = {
      headers: new HttpHeaders().set('Authorization', this.token)
                      .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams()
    body.set("id", this.aID);
    body.set("name",this.aname)
    body.set("totalMarks",this.amarks)
    body.set("timeLimitInMinutes",this.atime)
    body.set("questions",JSON.stringify(this.detail))
    // body = {
    //   id: this.aID,
    //   name: this.aname,
    //   questions: this.detail,
    //   totalMarks:this.amarks,
    //   timeLimintInMinutes: this.atime
    // }
    console.log(body)
    this.http.post('http://localhost:5000/api/assessments/addAssessment', body.toString(),options).subscribe(response =>{
      console.log(response)
    })
  }

  addquestion(){
    console.log(this.statement)
    console.log(this.option1)
    console.log(this.option2)
    console.log(this.option3)
    console.log(this.option4)
    console.log(this.ans)
    this.num=this.num+1
    this.detail.push({statement:this.statement,option1:this.option1,
      option2:this.option2,option3:this.option3,option4:this.option4,answer:this.ans})
    this.displayform1=!this.displayform1;
    this.displayform2=!this.displayform2;
  }
}
interface question{
  statement: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  answer: string,
}
interface assessment{
  id : string,
name :string,
questions :[{
    statement: string,
    option1 : string,
    option2 : string,
    option3 : string,
    option4 : string,
    answer : number,
}],
timeLimitInMinutes :number,
totalMarks : number,
averageMarks :number,
maxMarks : number,
minMarks :number
}
