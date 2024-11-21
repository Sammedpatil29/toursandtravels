import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-detailspage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailspage.component.html',
  styleUrl: './detailspage.component.css'
})
export class DetailspageComponent {
  item: any;

  constructor() {
    const navigation = window.history.state;
    this.item = navigation?.item;
  }
}
