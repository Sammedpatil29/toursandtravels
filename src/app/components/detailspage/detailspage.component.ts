import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailspage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailspage.component.html',
  styleUrl: './detailspage.component.css'
})
export class DetailspageComponent implements OnInit{
 

  

  constructor() {
    const navigation = window.history.state;
    this.item = navigation?.item;
  }

  ngOnInit(): void {
    window.scrollTo(0,0)
  }
  item: any;
  page: any = 'details'
 
  onButtonClick(item:any) {
    // const messa = encodeURIComponent(this.message);
    let message = `Hi, I want to book *${item.package_name}*%0ADetails:%0APlace: ${item.place}%0APackage: ${item.days}`;
    const whatsappUrl = `https://wa.me/9490391100?text=${message}`;
    
    // Open WhatsApp with the pre-filled message
    window.open(whatsappUrl, '_blank');
  }
}
