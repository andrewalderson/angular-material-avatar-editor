import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { FileBrowseDirective } from '../file-browser/file-browse.directive';
import { FileDropzoneDirective } from '../file-browser/file-dropzone.directive';

@Component({
  selector: 'matx-photo-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FileBrowseDirective],
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [FileDropzoneDirective],
})
export class PhotoPickerComponent implements AfterViewInit, OnDestroy {
  #dropzone = inject(FileDropzoneDirective, { self: true });

  #destroyed = new Subject<void>();

  @Input()
  get accept() {
    return this.#accept;
  }
  set accept(value: string[]) {
    this.#accept = value;
    if (this.#dropzone) {
      this.#dropzone.accept = this.accept;
    }
  }
  #accept: string[] = ['image/*'];

  @Input()
  get multiple(): boolean {
    return this.#multiple;
  }
  set multiple(value: BooleanInput) {
    this.#multiple = coerceBooleanProperty(value);
    if (this.#dropzone) {
      this.#dropzone.multiple = this.multiple;
    }
  }
  #multiple = false;

  @Output() readonly filesChanged = new EventEmitter<File[]>();

  @HostBinding('class') get hostClasses() {
    return 'matx-photo-picker';
  }

  ngAfterViewInit(): void {
    this.#dropzone.accept = this.accept;
    this.#dropzone.multiple = this.multiple;
    this.#dropzone.filesDropped
      .pipe(takeUntil(this.#destroyed))
      .subscribe((files) => {
        this.filesChanged.emit(files);
      });
  }

  ngOnDestroy(): void {
    this.#destroyed.next();
    this.#destroyed.complete();
  }

  _onFilesChanged(files: File[]) {
    if (files.length) {
      this.filesChanged.emit(files);
    }
  }
}
