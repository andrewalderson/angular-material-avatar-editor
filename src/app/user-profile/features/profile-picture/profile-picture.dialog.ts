import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ProfilePictureComponent } from './profile-picture.component';

@Component({
  selector: 'button[matx-profile-picture-dialog-trigger]',
  standalone: true,
  template: `<ng-content select="matx-profile-picture"></ng-content>
    <div class="focus-overlay">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="currentColor"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="3.2" />
        <path
          d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
        />
      </svg>
    </div>`,
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
        background: rgba(0, 0, 0, 0);
        color: white;
      }
      .focus-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        background: rgba(0, 0, 0, 0.4);
        border-radius: inherit;
        pointer-events: none;
        transition: opacity 0.2s ease-in-out;
      }
      .focus-overlay > svg {
        opacity: 0.8;
      }
      :is(:host:hover, :host:focus) .focus-overlay {
        opacity: 1;
      }
    `,
  ],
  imports: [MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePictureDialogTriggerComponent {
  #dialog = inject(MatDialog);

  @HostListener('click') onClick() {
    this.#dialog.open(ProfilePictureDialog, {
      autoFocus: false,
    });
  }
}

@Component({
  selector: 'matx-profile-picture-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ProfilePictureComponent,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './profile-picture.dialog.html',
  styleUrls: ['./profile-picture.dialog.scss'],
})
export class ProfilePictureDialog {}
