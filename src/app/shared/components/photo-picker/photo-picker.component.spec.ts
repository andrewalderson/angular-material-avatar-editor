import { By } from '@angular/platform-browser';
import { fireEvent, render } from '@testing-library/angular';
import { FileBrowseDirective } from '../file-browser/file-browse.directive';
import { FileDropzoneDirective } from '../file-browser/file-dropzone.directive';
import { PhotoPickerComponent } from './photo-picker.component';

import { Primary } from './photo-picker.component.stories';

describe('PhotoPickerComponent', () => {
  it('should add a class matching the selector to the host element by default', async () => {
    const { container } = await render(PhotoPickerComponent, {
      componentProperties: Primary.args,
    });

    expect(container).toHaveClass('matx-photo-picker');
  });

  it('should emit a filesChanged event on successful drop', async () => {
    const { container, fixture } = await render(PhotoPickerComponent, {
      componentProperties: Primary.args,
    });
    jest.spyOn(fixture.componentInstance.filesChanged, 'emit');

    const files = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
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

  it('should emit a filesChange event after file selection', async () => {
    const { fixture } = await render(PhotoPickerComponent, {
      componentProperties: Primary.args,
    });

    const button = fixture.debugElement.query(
      By.directive(FileBrowseDirective)
    );
    // the button above is type of MatButton component
    // so we need to get the directive from its injector
    const fileBrowse = button.injector.get(FileBrowseDirective);

    const files = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
    ];

    jest.spyOn(fixture.componentInstance.filesChanged, 'emit');
    fileBrowse.filesChanged.emit(files);

    expect(fixture.componentInstance.filesChanged.emit).toHaveBeenCalledWith(
      files
    );
  });

  it('should set inputs to dropzone', async () => {
    const accept = ['application/pdf', 'image/jpeg'];
    const multiple = true;
    const { fixture } = await render(PhotoPickerComponent, {
      componentInputs: { accept, multiple },
    });

    const dropzone = fixture.debugElement.injector.get(FileDropzoneDirective);

    expect(dropzone.accept).toEqual(accept);
    expect(dropzone.multiple).toEqual(multiple);
  });

  it('should set inputs on file browse', async () => {
    const accept = ['application/pdf', 'image/jpeg'];
    const multiple = true;
    const { fixture } = await render(PhotoPickerComponent, {
      componentInputs: { accept, multiple },
    });

    const button = fixture.debugElement.query(
      By.directive(FileBrowseDirective)
    );
    // the button above is type of MatButton component
    // so we need to get the directive from its injector
    const fileBrowse = button.injector.get(FileBrowseDirective);

    expect(fileBrowse.accept).toEqual(accept);
    expect(fileBrowse.multiple).toEqual(multiple);
  });
});
