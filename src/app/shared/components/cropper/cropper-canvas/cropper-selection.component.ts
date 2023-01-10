import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'matx-cropper-selection',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperSelectionComponent {
  @HostBinding('class') get hostClasses() {
    return 'matx-cropper-selection';
  }
}
