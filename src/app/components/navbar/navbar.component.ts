import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) { }
gmail:string = 'test@gmail.com'

navigate(event:any) {
  if(event == 'AboutUs'){
    this.router.navigate(['/aboutus'])
  } else if(event == 'Home') {
    this.router.navigate(['/home'])
  }
}
}
