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
    this.getTripData();
    this.getBanners();
  }

  bookTrip(banner:any) {
    this.router.navigate(['/tripDetails'], { queryParams: { title: banner.package_name } });
  }

  banners: any[] = [];

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
  this.router.navigate(['/tripDetails'], { queryParams: { title: item.package_name } });
}

getBanners() {
  this.dataService.getbanners().subscribe((data) => {
    this.banners = data;
    console.log(this.banners)
  })
}

openAllPackages(category:any) {
  if(category == "International") {
    this.router.navigate(['/packagelist'], { state: { item: this.internationalPackages, title:category } });
  } else if (category == "Domestic") {
    this.router.navigate(['/packagelist'], { state: { item: this.domesticPackages, title:category }});
  }
}

onButtonClick(item:any) {
  // const messa = encodeURIComponent(this.message);
  let message = `Hi, I want to book *${item.package_name}*%0ADetails:%0APlace: ${item.place}%0APackage: ${item.days}`;
  const whatsappUrl = `https://wa.me/9490391100?text=${message}`;
  
  // Open WhatsApp with the pre-filled message
  window.open(whatsappUrl, '_blank');
}
}
