import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  branch:any;
constructor(private route: ActivatedRoute){}

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.branch = params['branch']
  })
}
}
