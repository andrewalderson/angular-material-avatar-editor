import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'matx-local-image-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-image-loader.component.html',
  styleUrls: ['./local-image-loader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalImageLoaderComponent {
  @HostBinding('class') get hostClasses() {
    return 'matx-local-image-loader';
  }
}
