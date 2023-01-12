import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
@Directive({
  selector: '[matxFileDragDrop]',
  standalone: true,
})
export class FileDragDropDirective {
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @Output()
  readonly filesDropped = new EventEmitter<File[]>();

  @Input() accept: string[] = [];

  @Input()
  get multiple(): boolean {
    return this.#multiple;
  }
  set multiple(value: BooleanInput) {
    this.#multiple = coerceBooleanProperty(value);
  }
  #multiple = false;

  @HostBinding('class') get hostClasses() {
    return 'matx-file-drag-drop';
  }

  @HostListener('dragenter')
  onDragEnter() {
    this.#setActiveClasses(true);

    return false;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    if (!this.#isMouseInsideClientBounds(event)) {
      this.#setActiveClasses(false);
    }

    return false;
  }

  @HostListener('document:dragover', ['$event'])
  onDocumentDragOver(event: DragEvent) {
    if (!this.#isMouseInsideClientBounds(event)) {
      // This will prevent the image from being opened
      // in a new tab if the user drops the image outside the
      // bounds of this component
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'none';
        event.dataTransfer.dropEffect = 'none';
      }
    }

    return false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    this.#setActiveClasses(false);
    const inputFiles = event.dataTransfer?.files;
    if (inputFiles) {
      const files = [];
      for (let i = 0; i < inputFiles.length; i++) {
        const file = inputFiles[i];
        if (this.#validateFile(file)) {
          files.push(file);
        }
      }
      if (files.length) {
        if (this.multiple) {
          this.filesDropped.emit(files);
        } else {
          this.filesDropped.emit([files[0]]);
        }
      }
    }

    return false;
  }

  #validateFile(file: File) {
    if (!this.accept?.length) {
      return true;
    }
    return this.accept.some((value) => {
      return file.type.match(value)?.length;
    });
  }

  #setActiveClasses(add: boolean) {
    if (add) {
      if (
        !this.#elementRef.nativeElement.classList.contains(
          'matx-file-drag-drop--active'
        )
      ) {
        this.#elementRef.nativeElement.classList.add(
          'matx-file-drag-drop--active'
        );
      }
    } else {
      this.#elementRef.nativeElement.classList.remove(
        'matx-file-drag-drop--active'
      );
    }
  }

  #isMouseInsideClientBounds(event: MouseEvent) {
    const { clientX, clientY } = event;
    // not sure if doing this constantly is a good idea
    // calling 'getBoundingClientRect' causes a layout cycle
    // This doesn't seem to be a problem because the browser has probably optimized this
    // TODO - investigate using a ResizeObserver and getting the client rectangle only
    // on resize and cache it
    const rect = this.#elementRef.nativeElement.getBoundingClientRect();

    return this.#isPointInsideRectangle(rect, clientX, clientY);
  }

  #isPointInsideRectangle(rect: DOMRect, x: number, y: number) {
    const { top, bottom, left, right } = rect;

    return x >= left && x <= right && y >= top && y <= bottom;
  }
}
