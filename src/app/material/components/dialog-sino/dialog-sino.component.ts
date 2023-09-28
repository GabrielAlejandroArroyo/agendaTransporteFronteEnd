import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '@app/core/models/dialogdata';

@Component({
  selector: 'app-dialog-sino',
  templateUrl: './dialog-sino.component.html',
  styleUrls: ['./dialog-sino.component.scss']
})
export class DialogSiNoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSiNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      //console.log(this.data.label);
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}