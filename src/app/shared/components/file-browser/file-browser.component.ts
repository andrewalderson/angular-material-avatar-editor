import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';
import { DroppableDirective } from './droppable.directive';

@Component({
  selector: 'matx-file-browser',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [DroppableDirective],
})
export class FileBrowserComponent implements AfterViewInit, OnDestroy {
  #droppable = inject(DroppableDirective, { self: true });

  #destroyed = new Subject<void>();

  @Output() fileSelected = new EventEmitter<File>();

  @HostBinding('class') get hostClasses() {
    return 'matx-file-browser';
  }

  ngAfterViewInit(): void {
    this.#droppable.fileDropped
      .pipe(takeUntil(this.#destroyed))
      .subscribe((file) => this.fileSelected.emit(file));
  }

  ngOnDestroy(): void {
    this.#destroyed.next();
    this.#destroyed.complete();
  }

  _setSelectedFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
