import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogClose, MatDialogActions, MatDialogTitle, MatDialogContent, CommonModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent{
customerName: string = ''
phoneNumber: string = ''
place: string =  ''
request: string = ''
warning:boolean = false;
send(){
  if(this.customerName == '' || this.phoneNumber == '' || this.place == '' || this.request == ''){
    this.warning = true 
  } else {
    let message = `Hi, I am ${this.customerName}, from ${this.place}. can you customise below package for me!\n ${this.request}`;
  const whatsappUrl = `https://wa.me/9490391100?text=${message}`;
  
  // Open WhatsApp with the pre-filled message
  window.open(whatsappUrl, '_blank');
  }
  
}

}
