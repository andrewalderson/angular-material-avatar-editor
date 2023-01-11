import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[matxDropable]',
  standalone: true,
})
export class DroppableDirective {
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  readonly fileDropped = new Subject<File>();

  @HostListener('dragenter')
  onDragEnter() {
    this.#setDroppableClasses(true);

    return false;
  }

  // The dragover and dragenter event need to have preventDefault set for the drop event to fire
  // returning false will set this
  @HostListener('dragover')
  onDragOver() {
    return false;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    if (this.#isWithinClientBounds(event)) {
      return;
    }

    this.#setDroppableClasses(false);

    return false;
  }

  // This will prevent the image from being opened
  // in a new tab if the user drops the image outside the
  // bounds of this component
  @HostListener('document:dragover', ['$event'])
  onDocumentDragOver(event: DragEvent) {
    if (this.#isWithinClientBounds(event)) {
      return;
    }

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'none';
      event.dataTransfer.dropEffect = 'none';
    }

    return false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    this.#setDroppableClasses(false);

    let file: File | null = null;
    if (event.dataTransfer?.items) {
      if (event.dataTransfer.items[0].kind === 'file') {
        file = event.dataTransfer.items[0].getAsFile();
      }
    } else if (event.dataTransfer?.files && event.dataTransfer.files.length) {
      file = event.dataTransfer.files[0];
    }
    if (file) {
      this.fileDropped.next(file);
    }

    return false;
  }

  #setDroppableClasses(add: boolean) {
    if (add) {
      if (!this.#elementRef.nativeElement.classList.contains('droppable')) {
        this.#elementRef.nativeElement.classList.add('droppable');
      }
    } else {
      this.#elementRef.nativeElement.classList.remove('droppable');
    }
  }

  #isWithinClientBounds(event: MouseEvent) {
    const rect = this.#elementRef.nativeElement.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  }
}
