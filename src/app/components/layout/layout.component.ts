import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  constructor(private dataService: DataService){}

  ngOnInit() {
    this.getTripData()
  }
  onclick(){
    let message = "Hi, I need details about your trip plans!!";
    const whatsappUrl=`https://wa.me/9490391100?text=${message}`
    window.open(whatsappUrl, '_blank');
  }

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
}
