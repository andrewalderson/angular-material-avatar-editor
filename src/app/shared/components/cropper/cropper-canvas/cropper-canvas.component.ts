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
  templateUrl: './cropper-canvas.component.html',
  styleUrls: ['./cropper-canvas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperCanvasComponent {
  @HostBinding('class') get hostClasses() {
    return 'matx-cropper-canvas';
  }
}
