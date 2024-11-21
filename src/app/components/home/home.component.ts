import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(private dataService: DataService, private router: Router) {}
  
  ngOnInit(): void {
    this.getTripData()
  }
  banners = [
    {
      imageUrl: 'assets/img/home1/home1-banner-img1.png',
      tag: 'Europe',
      title: 'Let\'s Travel And Explore Destination.',
      description: 'Life is unpredictable, and we understand that plans might change. Enjoy flexible booking options, so you can reschedule or modify your trip with ease.',
      buttonText: 'Book A Trip',
      buttonLink: 'package-grid.html'
    },
    {
      imageUrl: 'assets/img/home1/home1-banner-img2.png',
      tag: 'Kerala',
      title: 'Adventure Awaits You.',
      description: 'Experience the thrill of the great outdoors with our adventure packages.',
      buttonText: 'Book A Trip',
      buttonLink: 'package-grid.html'
    },
    {
      imageUrl: 'assets/img/home1/home1-banner-img2.png',
      tag: 'Dubai',
      title: 'Adventure Awaits You.',
      description: 'Experience the thrill of the great outdoors with our adventure packages.',
      buttonText: 'Book A Trip',
      buttonLink: 'package-grid.html'
    },
    {
      imageUrl: 'assets/img/home1/home1-banner-img2.png',
      tag: 'Kerala',
      title: 'Adventure Awaits You.',
      description: 'Experience the thrill of the great outdoors with our adventure packages.',
      buttonText: 'Book A Trip',
      buttonLink: 'package-grid.html'
    },
    {
      imageUrl: 'assets/img/home1/home1-banner-img1.png',
      tag: 'Europe',
      title: 'Let\'s Travel And Explore Destination.',
      description: 'Life is unpredictable, and we understand that plans might change. Enjoy flexible booking options, so you can reschedule or modify your trip with ease.',
      buttonText: 'Book A Trip',
      buttonLink: 'package-grid.html'
    },
    {
      imageUrl: 'assets/img/home1/home1-banner-img2.png',
      tag: 'Kerala',
      title: 'Adventure Awaits You.',
      description: 'Experience the thrill of the great outdoors with our adventure packages.',
      buttonText: 'Book A Trip',
      buttonLink: 'package-grid.html'
    },
    // Add more banners here
  ];
  tripPackages:any;
  internationalPackages:any;
  specialPackages:any;
  domesticPackages:any;
  templePackages:any;
  internationalPackagesForHome:any;
  domesticPackagesForHome:any;
  specialPackagesForHome:any;
  templePackagesForHome:any;
getTripData(){
 this.dataService.getData().subscribe((data) => {
this.tripPackages = data;
this.internationalPackages = this.tripPackages.filter((item: { category: string[] }) => item.category.includes('International'));
this.domesticPackages = this.tripPackages.filter((item: { category: string[] }) => item.category.includes('Domestic'));
this.specialPackages = this.tripPackages.filter((item: { category: string[] }) => item.category.includes('Special'));
this.templePackages = this.tripPackages.filter((item: { category: string[] }) => item.category.includes('Temple'));
this.internationalPackagesForHome = this.internationalPackages.slice(0,3)
this.domesticPackagesForHome = this.domesticPackages.slice(0,3)
this.specialPackagesForHome = this.specialPackages.slice(0,3)
this.templePackagesForHome = this.templePackages.slice(0,3)

console.log("data fetched", this.internationalPackagesForHome.length) 
 })
}

openDetails(item:any) {
  this.router.navigate(['/tripDetails'], { state: { item: item } });
}

openAllPackages(category:any) {
  if(category == "International") {
    this.router.navigate(['/packagelist'], { state: { item: this.internationalPackages, title:category } });
  } else if (category == "Domestic") {
    this.router.navigate(['/packagelist'], { state: { item: this.domesticPackages, title:category }});
  }
}
}
