import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() International: any[] = [];  // Array of international trips
  @Input() Domestic: any[] = [];
  @Input() Temple: any[] = [];

  constructor(private router: Router) { }
gmail:string = 'srimahaadevtoursntravels@gmail.com'

navigate(event:any) {
  this.activeMenu = event;
  if(event == 'AboutUs'){
    this.router.navigate(['/aboutus'])
  } else if(event == 'Home') {
    this.router.navigate(['/home'])
  }
   else if(event == 'hyderabad') {
    this.router.navigate(['/contact'], {queryParams:{branch: event}})
  }
   else if(event == 'proddatur') {
    this.router.navigate(['/contact'], {queryParams:{branch: event}})
  }
   else if(event == 'srikakulam') {
    this.router.navigate(['/contact'], {queryParams:{branch: event}})
  }
   else if(event == 'all') {
    this.router.navigate(['/contact'], {queryParams:{branch: event}})
  }
}

activeMenu: string = 'Home'; // Default active menu

openAllPackages(category:any) {
  this.activeMenu = category;
  window.scrollTo(0, 0);

  // Determine the data based on the category
  let data: any[] = [];
  if (category === 'International') {
    data = this.International;
  } else if (category === 'Domestic') {
    data = this.Domestic;
  } else if (category === 'Temple') {
    data = this.Temple;
  }

  // Navigate to the home page first
  this.router.navigate(['/home']).then(() => {
    // After navigating to the home page, wait for a short period before navigating back
    setTimeout(() => {
      // Navigate back to the current page with the updated data
      this.router.navigate(['/packagelist'], { state: { item: data, title: category } });
    }, 0);  // 500ms delay (you can adjust this duration)
  });

}
}
