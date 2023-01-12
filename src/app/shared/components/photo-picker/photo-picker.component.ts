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
import { FileBrowserDirective } from '../file-browser/file-browser.directive';
import { FileDragDropDirective } from '../file-drag-drop/file-drag-drop.directive';

@Component({
  selector: 'matx-photo-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FileBrowserDirective],
  templateUrl: './photo-picker.component.html',
  styleUrls: ['./photo-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [FileDragDropDirective],
})
export class PhotoPickerComponent implements AfterViewInit, OnDestroy {
  #dragdrop = inject(FileDragDropDirective, { self: true });

  #destroyed = new Subject<void>();

  @Input()
  get accept() {
    return this.#accept;
  }
  set accept(value: string[]) {
    this.#accept = value;
    if (this.#dragdrop) {
      this.#dragdrop.accept = this.accept;
    }
  }
  #accept: string[] = ['image/*'];

  @Input()
  get multiple(): boolean {
    return this.#multiple;
  }
  set multiple(value: BooleanInput) {
    this.#multiple = coerceBooleanProperty(value);
    if (this.#dragdrop) {
      this.#dragdrop.multiple = this.multiple;
    }
  }
  #multiple = false;

  @Output() filesChanged = new EventEmitter<File[]>();

  @HostBinding('class') get hostClasses() {
    return 'matx-photo-picker';
  }

  ngAfterViewInit(): void {
    this.#dragdrop.accept = this.accept;
    this.#dragdrop.multiple = this.multiple;
    this.#dragdrop.filesDropped
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
