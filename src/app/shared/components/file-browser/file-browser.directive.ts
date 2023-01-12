import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Directive({
  selector: 'button[matxFileBrowser]',
  standalone: true,
})
export class FileBrowserDirective implements OnInit, OnDestroy {
  #document = inject(DOCUMENT);

  #destroyed = new Subject<void>();

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
    // we don't need this to be appended
    // but it makes testing easier
    this.#document.body.append(this.#input);

    fromEvent<Event>(this.#input, 'change')
      .pipe(takeUntil(this.#destroyed))
      .subscribe((event: Event) => {
        const inputFiles = (event.target as HTMLInputElement).files;
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
    this.#input?.remove();
    this.#destroyed.next();
    this.#destroyed.complete();
  }

  #createInputElement() {
    const input = this.#document.createElement('input');
    input.type = 'file';
    input.multiple = this.multiple;
    input.accept = this.accept.join(',');
    input.hidden = true;
    input.ariaHidden = 'true';

    return input;
  }
}
