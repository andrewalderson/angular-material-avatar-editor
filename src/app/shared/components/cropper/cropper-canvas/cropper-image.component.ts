import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'matx-cropper-image',
  standalone: true,
  imports: [CommonModule],
  template: `<img
    [src]="src"
    [style.visibility]="imageVisibility"
    (error)="_onImageError()"
    (load)="_onImageLoad($event)"
  />`,
  styles: [
    `
      .matx-cropper-image {
        display: block;
        position: absolute;
      }

      .matx-cropper-image > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperImageComponent {
  @HostBinding('class') get hostClasses() {
    return 'matx-cropper-image';
  }

  @Input()
  get src() {
    return this.#src;
  }
  set src(value: string | undefined) {
    this.#src = value;
    this.#imageVisibility = 'hidden';
    this.#changeDetectorRef.markForCheck();
  }
  #src?: string;

  get imageVisibility() {
    return this.#imageVisibility;
  }
  // prevent user seeing layout shift while the loaded image is sized
  #imageVisibility: 'hidden' | 'visible' = 'hidden';

  #element: HTMLElement = inject(ElementRef).nativeElement;
  #changeDetectorRef = inject(ChangeDetectorRef);

  _onImageError() {
    // TODO implement error handling
  }

  _onImageLoad(event: Event) {
    const image = event.target as HTMLImageElement;
    this.#element.style.width = `${image.naturalWidth}px`;
    this.#element.style.height = `${image.naturalHeight}px`;
    this.#imageVisibility = 'visible';
    this.#changeDetectorRef.markForCheck();
  }
}
