import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: 'button[matxFileBrowse]',
  standalone: true,
})
export class FileBrowseDirective implements OnInit, OnDestroy {
  #destroyed = new Subject<void>();

  get input() {
    return this.#input;
  }
  #input?: HTMLInputElement;

  @Input() accept: string[] = [];

  @Input()
  get multiple(): boolean {
    return this.#multiple;
  }
  set multiple(value: BooleanInput) {
    this.#multiple = coerceBooleanProperty(value);
  }
  #multiple = false;

  @Output() readonly filesChanged = new EventEmitter<File[]>();

  @HostListener('click') onClick() {
    this.#input?.click();
  }

  ngOnInit() {
    this.#input = this.#createInputElement();

    fromEvent(this.#input, 'change')
      .pipe(takeUntil(this.#destroyed))
      .subscribe(() => {
        const inputFiles = this.#input?.files;
        if (inputFiles) {
          const files = [];
          for (let i = 0; i < inputFiles.length; i++) {
            files.push(inputFiles[i]);
          }

          if (files.length) {
            if (this.multiple) {
              this.filesChanged.next(files);
            } else {
              this.filesChanged.next([files[0]]);
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.#destroyed.next();
    this.#destroyed.complete();
  }

  #createInputElement() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = this.multiple;
    input.accept = this.accept.join(',');

    return input;
  }
}
