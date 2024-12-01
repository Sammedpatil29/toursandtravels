import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-packagelist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packagelist.component.html',
  styleUrl: './packagelist.component.css'
})
export class PackagelistComponent implements OnInit, OnDestroy {
  items: any[];
  title: any;
  private routerSub: Subscription = new Subscription();

  constructor(private router:Router, private route: ActivatedRoute) {
    const navigation = window.history.state; // Retrieve data passed via router state
    this.items = navigation?.item || [];
    this.title = navigation?.title;
  }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.loadPackagesFromState();

    // Subscribe to router events to detect when route changes (including same route with new data)
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadPackagesFromState();
      }
    });
  }

  ngOnDestroy() {
    // Cleanup the subscription when the component is destroyed
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  // Load the packages from the state passed during navigation
  private loadPackagesFromState() {
    const state = window.history.state;

    if (state && state.item && state.title) {
      this.items = state.item;  // Update the packages data
      this.title = state.title;    // Update the title/category
    }}


  
  openDetails(item:any) {
    this.router.navigate(['/tripDetails'], { queryParams: { title: item.package_name } });
  }

  onButtonClick(item:any) {
    // const messa = encodeURIComponent(this.message);
    let message = `Hi, I want to book *${item.package_name}*%0ADetails:%0APlace: ${item.place}%0APackage: ${item.days}`;
    const whatsappUrl = `https://wa.me/9490391100?text=${message}`;
    
    // Open WhatsApp with the pre-filled message
    window.open(whatsappUrl, '_blank');
  }
}
