import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'matx-photo-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoPickerComponent {
  @HostBinding('class') get hostClasses() {
    return 'matx-photo-picker';
  }
}
