import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'matx-cropper-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cropper-image.component.html',
  styleUrls: ['./cropper-image.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperImageComponent {
  @HostBinding('class') get hostClasses() {
    return 'matx-cropper-image';
  }
}
