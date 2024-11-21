import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packagelist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packagelist.component.html',
  styleUrl: './packagelist.component.css'
})
export class PackagelistComponent {
  items: any[];
  title: any;

  constructor(private router:Router) {
    const navigation = window.history.state; // Retrieve data passed via router state
    this.items = navigation?.item || [];
    this.title = navigation?.title;
  }
  
  openDetails(item:any) {
    this.router.navigate(['/tripDetails'], { state: { item: item } });
  }
}
