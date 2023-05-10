import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  name: string = ""
  username: string = ""
  email: string = ""
  password: string = ""
  password2: string = ""
  age: string = ""
  gender: string = ""

  register(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    let body = new URLSearchParams();
    body.set('username', this.username);
    body.set('password', this.password);
    body.set('password2', this.password2);
    body.set('name', this.name);
    body.set('email', this.email);
    body.set('age', this.age);
    body.set('gender', this.gender);
    this.http.post('http://localhost:5000/api/users/register',body.toString(),options).subscribe(response =>{
      console.log(response)
      this.router.navigate(['/login'])
    })
    
   
  }
}
