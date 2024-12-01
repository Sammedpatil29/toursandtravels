import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-detailspage',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './detailspage.component.html',
  styleUrl: './detailspage.component.css'
})
export class DetailspageComponent implements OnInit{
 
  readonly dialog = inject(MatDialog);

  constructor(private route:ActivatedRoute, private dataService:DataService) {
    const navigation = window.history.state;
    this.item = navigation?.item;
  }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.route.queryParams.subscribe(params => {
      this.place = params['title'];
      console.log('Received title:', this.place);
    });

    this.displayData()
  }
  item: any;
  page: any = 'details'
  place: string = '';
  alldata: any;

  displayData(){
    this.dataService.getData().subscribe(data => {
this.alldata = data;
this.item = this.alldata.filter((trip:any) => trip.package_name.toLowerCase() === this.place.toLowerCase())[0];
console.log(this.item)
    })
  }
 
  onButtonClick(item:any) {
    // const messa = encodeURIComponent(this.message);
    let message = `Hi, I want to book *${item.package_name}*%0ADetails:%0APlace: ${item.place}%0APackage: ${item.days}`;
    const whatsappUrl = `https://wa.me/9490391100?text=${message}`;
    
    // Open WhatsApp with the pre-filled message
    window.open(whatsappUrl, '_blank');
  }

  openDialogwide(event:any) {
    window.scrollTo(0,0)
    this.dialog.open(DialogComponent, {
      height: '75vh',
      data: {
        title: event
      }
    });
  }

  openDialog(event:any) {
    window.scrollTo(0,0)
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: event
      }
    });
  }
}
