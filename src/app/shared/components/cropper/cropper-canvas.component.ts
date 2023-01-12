import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'matx-cropper-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [
    `
      .matx-cropper-canvas {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperCanvasComponent {
  @HostBinding('class') get hostClasses() {
    return 'matx-cropper-canvas';
  }
}
