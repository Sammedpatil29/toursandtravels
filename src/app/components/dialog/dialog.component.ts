import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DataService } from '../../services/data.service';

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
constructor(@Inject(MAT_DIALOG_DATA) public data:any, private _service: DataService, private dialogRef: MatDialogRef<DialogComponent>) {}
send(){
  if(this.customerName == '' || this.phoneNumber == '' || this.place == '' || this.request == ''){
    this.warning = true 
  } else {
    this.warning = false
    let message = `Hi, I am ${this.customerName}, from ${this.place}. can you customise below package for me!\n ${this.request}`;
  const whatsappUrl = `https://wa.me/9490391100?text=${message}`;
  
  // Open WhatsApp with the pre-filled message
  window.open(whatsappUrl, '_blank');
  this.dialogRef.close()
  } 
}

close(){
  this.dialogRef.close()
}

sent: boolean = false;
spinner: boolean = false;
sendMail(){
  let message = {'name': this.customerName, 'contact': this.phoneNumber, 'place': this.place, 'message': this.request};
console.log(message)
if(this.customerName == '' || this.phoneNumber == '' || this.place == '' || this.request == ''){
  this.warning = true 
} else {
  this.warning = false
  this.spinner = true
    this._service.sendMail(message).subscribe((res:any) => {
      this.sent = true
      this.spinner = false
    })
  }
}

}
