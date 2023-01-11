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
import { FileDropzoneDirective } from './file-dropzone.directive';

describe('FileDropzoneDirective', () => {
  it('should add the matx-file-dropzone class on dragenter and remove it on dragleave', async () => {
    const { container } = await render(FileDropzoneHostComponent);

    expect(container).not.toHaveClass('matx-file-dropzone');

    fireEvent.dragEnter(container);

    expect(container).toHaveClass('matx-file-dropzone');

    fireEvent.dragLeave(container);

    expect(container).not.toHaveClass('matx-file-dropzone');
  });

  it('should add the matx-file-dropzone class on dragenter and remove it on drop', async () => {
    const { container } = await render(FileDropzoneHostComponent);

    expect(container).not.toHaveClass('matx-file-dropzone');

    fireEvent.dragEnter(container);

    expect(container).toHaveClass('matx-file-dropzone');

    fireEvent.drop(container);

    expect(container).not.toHaveClass('matx-file-dropzone');
  });

  it('should emit single file on a drop operation when multipel is false', async () => {
    const { container, fixture } = await render(FileDropzoneHostComponent, {
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
    const { container, fixture } = await render(FileDropzoneHostComponent, {
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
    const { container, fixture } = await render(FileDropzoneHostComponent, {
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
  selector: 'matx-file-dropzone-host',
  template: '',
  standalone: true,
  hostDirectives: [FileDropzoneDirective],
})
class FileDropzoneHostComponent implements AfterViewInit, OnDestroy {
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
  #accept: string[] = [];

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

  @Output() filesChanged = new EventEmitter<File[]>();

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
}
