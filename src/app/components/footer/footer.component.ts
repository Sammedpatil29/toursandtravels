import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() International: any[] = [];  // Array of international trips
  @Input() Domestic: any[] = [];
  @Input() Temple: any[] = [];
email: string = 'srimahaadevtoursntravels@gmail.com';

constructor(private router:Router){}

openAllPackages(category:any) {
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
