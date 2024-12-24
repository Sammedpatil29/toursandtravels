import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detailspage',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './detailspage.component.html',
  styleUrl: './detailspage.component.css'
})
export class DetailspageComponent implements OnInit{
 
  readonly dialog = inject(MatDialog);

  constructor(private route:ActivatedRoute, private dataService:DataService, private sanitizer: DomSanitizer) {
    const navigation = window.history.state;
    this.item = navigation?.item;
  }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.route.queryParams.subscribe(params => {
      this.place = params['title'];
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

videoLink:any = "https://www.youtube.com/embed/D_bgCyM1nRY?si=oXJKr0cP2YM2yJfp&amp;controls=0&autoplay=1&loop=1&playlist=D_bgCyM1nRY"
  openDialog(event:any) {
    window.scrollTo(0,0)
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: event
      }
    });
  }

  getVideoLinkWithLoop(videoLink: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${videoLink}&autoplay=1&loop=1&playlist=${this.getVideoIdFromLink(videoLink)}`);
  }

  // Extracts video ID from the YouTube embed link
  getVideoIdFromLink(videoLink: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
    const match = videoLink.match(regex);
    return match ? match[1] : '';
  }

}
