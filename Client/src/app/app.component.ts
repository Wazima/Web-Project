import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bpro-client';
  constructor(private router: Router){
    router.navigate(['/home'])
  }
  navigate(opt: string){
    if(opt == '1'){
      this.router.navigate(['/register']);
    }
    else{
      this.router.navigate(['/login']);
      console.log('login')
    }
  }
}
