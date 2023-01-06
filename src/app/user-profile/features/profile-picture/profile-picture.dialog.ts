import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'button[matx-profile-picture-dialog-trigger]',
  standalone: true,
  template: `<ng-content select="matx-profile-picture"></ng-content>`,
  styles: [
    `
      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        width: inherit;
        height: inherit;
        white-space: nowrap;
        text-decoration: none;
        vertical-align: baseline;
        text-align: center;
        margin: 0;
        min-width: 0;
        padding: 0;
        border-radius: 50%;
        flex-shrink: 0;
        border: 0;
        outline: 0;
        cursor: pointer;
        background: transparent;
      }
    `,
  ],
  imports: [MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePictureDialogTriggerComponent {
  #dialog = inject(MatDialog);

  @HostListener('click') onClick() {
    this.#dialog.open(ProfilePictureDialog);
  }
}

@Component({
  selector: 'matx-profile-picture-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-picture.dialog.html',
  styleUrls: ['./profile-picture.dialog.scss'],
})
export class ProfilePictureDialog {}
