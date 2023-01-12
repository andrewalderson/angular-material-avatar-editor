import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { fireEvent, render } from '@testing-library/angular';
import { Subject, takeUntil } from 'rxjs';
import { FileDragDropDirective } from './file-drag-drop.directive';

describe('FileDragDropDirective', () => {
  it('should add a class matching the selector to the host element by default', async () => {
    const { container } = await render(FileDragDropHostComponent);

    expect(container).toHaveClass('matx-file-drag-drop');
  });
  it('should add the active class on dragenter and remove it on dragleave', async () => {
    const { container } = await render(FileDragDropHostComponent);

    expect(container).not.toHaveClass('matx-file-drag-drop--active');

    fireEvent.dragEnter(container);

    expect(container).toHaveClass('matx-file-drag-drop--active');

    fireEvent.dragLeave(container);

    expect(container).not.toHaveClass('matx-file-drag-drop--active');
  });

  it('should add the active class on dragenter and remove it on drop', async () => {
    const { container } = await render(FileDragDropHostComponent);

    expect(container).not.toHaveClass('matx-file-drag-drop--active');

    fireEvent.dragEnter(container);

    expect(container).toHaveClass('matx-file-drag-drop--active');

    fireEvent.drop(container);

    expect(container).not.toHaveClass('matx-file-drag-drop--active');
  });

  it('should emit single file on a drop operation when multipel is false', async () => {
    const { container, fixture } = await render(FileDragDropHostComponent, {
      componentInputs: {
        multiple: false,
      },
    });

    jest.spyOn(fixture.componentInstance.filesChanged, 'emit');

    const files = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
      new File(['(⌐□_□)'], 'homersimpson.png', { type: 'image/jpeg' }),
    ];
    fireEvent.drop(container, {
      dataTransfer: {
        files: files,
      },
    });

    expect(fixture.componentInstance.filesChanged.emit).toHaveBeenCalledWith([
      files[0],
    ]);
  });

  it('should emit multiple files on a drop operations when multiple is true', async () => {
    const { container, fixture } = await render(FileDragDropHostComponent, {
      componentInputs: {
        multiple: true,
      },
    });

    jest.spyOn(fixture.componentInstance.filesChanged, 'emit');

    const files = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
      new File(['(⌐□_□)'], 'homersimpson.png', { type: 'image/jpeg' }),
    ];
    fireEvent.drop(container, {
      dataTransfer: {
        files: files,
      },
    });

    expect(fixture.componentInstance.filesChanged.emit).toHaveBeenCalledWith(
      files
    );
  });

  it('should not emit files when they are of the wrong type', async () => {
    const { container, fixture } = await render(FileDragDropHostComponent, {
      componentInputs: {
        multiple: false,
        accept: ['application/pdf'],
      },
    });

    jest.spyOn(fixture.componentInstance.filesChanged, 'emit');

    const files = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
      new File(['(⌐□_□)'], 'homersimpson.png', { type: 'image/jpeg' }),
    ];
    fireEvent.drop(container, {
      dataTransfer: {
        files: files,
      },
    });

    expect(fixture.componentInstance.filesChanged.emit).not.toHaveBeenCalled();
  });
});

@Component({
  selector: 'matx-file-droag-drop-host',
  template: '',
  standalone: true,
  hostDirectives: [FileDragDropDirective],
})
class FileDragDropHostComponent implements AfterViewInit, OnDestroy {
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
  #accept: string[] = [];

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
}
