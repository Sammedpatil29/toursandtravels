import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CommonModule, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  
  constructor(private dataService: DataService, private router: Router) {}
  
  ngOnInit(): void {
    this.getTripData();
    this.getBanners();
    this.dataService.modalState$.subscribe(state => {
      this.isModalOpen = state;
    });

    const swiper = new Swiper('.home1-banner-slider', {
      autoplay: {
        delay: 3000,  // Delay in ms (3 seconds)
        disableOnInteraction: false,  // Keeps autoplay going even when the user interacts with the slider
      },
      navigation: {
        nextEl: '.home1-banner-next',
        prevEl: '.home1-banner-prev',
      },
      loop: true,  // Loops the slides continuously
    });
  }

  bookTrip(banner:any) {
    this.router.navigate(['/tripDetails'], { queryParams: { title: banner } });
  }

  closeModal(): void {
    this.dataService.closeModal(); 
  }

  banners: any[] = [];
  isModalOpen: boolean = false;

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
  } else if (category == "Temple") {
    this.router.navigate(['/packagelist'], { state: { item: this.templePackages, title:category }});
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
