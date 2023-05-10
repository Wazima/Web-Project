import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  constructor(private http: HttpClient) { }
  materials: Array<material> = []
  token: string = history.state.name
  ngOnInit(): void {
    let options = {
      headers: new HttpHeaders().set('Authorization', this.token)
    };
    this.http.get<Array<material>>('http://localhost:5000/api/materials/getMaterial',options).subscribe(response =>{
      console.log(response)
      this.materials=response
    })
  }

}
interface material{
  _id: string,
  name: string,
  type: string,
  link: string,
  __v: number
}
