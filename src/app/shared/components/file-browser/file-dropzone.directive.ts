import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
@Directive({
  selector: '[matxFileDropzone]',
  standalone: true,
})
export class FileDropzoneDirective {
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

  @HostListener('dragenter')
  onDragEnter() {
    this.#setDroppableClasses(true);

    return false;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    if (!this.#isWithinClientBounds(event)) {
      this.#setDroppableClasses(false);
    }

    return false;
  }

  @HostListener('document:dragover', ['$event'])
  onDocumentDragOver(event: DragEvent) {
    if (!this.#isWithinClientBounds(event)) {
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
    this.#setDroppableClasses(false);
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

  #setDroppableClasses(add: boolean) {
    if (add) {
      if (
        !this.#elementRef.nativeElement.classList.contains('matx-file-dropzone')
      ) {
        this.#elementRef.nativeElement.classList.add('matx-file-dropzone');
      }
    } else {
      this.#elementRef.nativeElement.classList.remove('matx-file-dropzone');
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
