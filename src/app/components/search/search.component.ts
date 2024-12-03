import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  constructor(private dataService: DataService, private router: Router){}

  ngOnInit(): void {
    this.allData()
  }

  searchTerm: string = '';
  filteredData: any;
allTripData:any;
  allData(){
    this.dataService.getData().subscribe((data:any) => {
this.allTripData = data;
this.filteredData = data;
})
}

search(event:any){
  let input = event.target as HTMLInputElement;
  this.searchTerm = input.value;
  this.filteredData = this.allTripData.filter((data:any) => data.package_name.toLowerCase().includes(this.searchTerm.toLowerCase()))
}

onButtonClick(item:any) {
  // const messa = encodeURIComponent(this.message);
  let message = `Hi, I want to book *${item.package_name}*%0ADetails:%0APlace: ${item.place}%0APackage: ${item.days}`;
  const whatsappUrl = `https://wa.me/9490391100?text=${message}`;
  
  // Open WhatsApp with the pre-filled message
  window.open(whatsappUrl, '_blank');
}

openDetails(item:any) {
  this.router.navigate(['/tripDetails'], { queryParams: { title: item.package_name } });
}

}
