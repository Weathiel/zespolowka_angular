import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-management-dialog',
  templateUrl: './management-dialog.component.html',
  styleUrls: ['./management-dialog.component.css']
})
export class ManagementDialogComponent {
  // tslint:disable-next-line:component-class-suffix
    constructor(
      public dialogRef: MatDialogRef<ManagementDialogComponent>) {}

      onYesClick(): void {
        this.dialogRef.close(true);
      }

    onNoClick(): void {
      this.dialogRef.close(false);
    }
}
