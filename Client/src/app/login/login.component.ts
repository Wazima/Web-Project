import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  username :string=''
  password :string=''

  login(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')};
    console.log(this.username + " " + this.password)
    let body = new URLSearchParams();
    body.set('username', this.username);
    body.set('password', this.password);
    this.http.post<LoginResponse>('http://localhost:5000/api/users/login',body.toString(),options).subscribe(response =>{
      console.log(response)
      if(response.success && this.username == 'Admin'){
        this.router.navigate(['/adminDashboard'], { state: { id:1 , name:response.token } })
      }
      else{
        console.log("Learner")
        this.router.navigate(['/learnerDashboard'], { state: { id:1 , name:response.token } })
      }
      
    })
   
  }
  
}
interface LoginResponse {
  success: boolean,
  token: string
}

