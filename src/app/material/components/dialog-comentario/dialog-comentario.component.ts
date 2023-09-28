import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '@app/core/models/dialogdata';

@Component({
  selector: 'app-dialog-comentario',
  templateUrl: './dialog-comentario.component.html',
  styleUrls: ['./dialog-comentario.component.scss']
})
export class DialogComentarioComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComentarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      //console.log(this.data.label);
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
