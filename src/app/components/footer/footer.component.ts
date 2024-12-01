import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  readonly dialog = inject(MatDialog);

  @Input() International: any[] = [];  // Array of international trips
  @Input() Domestic: any[] = [];
  @Input() Temple: any[] = [];
email: string = 'srimahaadevtoursntravels@gmail.com';

constructor(private router:Router, private dataService:DataService){}

ngOnInit(): void {
  
}

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

openDialog() {
  this.dialog.open(DialogComponent, {
    width: '500px',
  });
}

onclick(){
  let message = "Hi, I need details about your trip plans!!";
  const whatsappUrl=`https://wa.me/9490391100?text=${message}`
  window.open(whatsappUrl, '_blank');
}

}
