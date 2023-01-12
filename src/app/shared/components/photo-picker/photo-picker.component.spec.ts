import { By } from '@angular/platform-browser';
import { fireEvent, render } from '@testing-library/angular';
import { FileBrowserDirective } from '../file-browser/file-browser.directive';
import { FileDragDropDirective } from '../file-drag-drop/file-drag-drop.directive';
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
    const filesChanged = jest.fn();
    const { container } = await render(
      `<matx-photo-picker
        (filesChanged)="filesChanged($event)"
      ></matx-photo-picker>`,
      {
        componentProperties: { ...Primary.args, filesChanged },
        imports: [PhotoPickerComponent],
      }
    );

    const files = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
    ];
    // the firstElementChild is the PhotoPickerComponent nativeElement
    fireEvent.drop(container.firstElementChild as Element, {
      dataTransfer: {
        files: files,
      },
    });

    expect(filesChanged).toHaveBeenCalledWith(files);
  });

  it('should emit a filesChange event after file selection', async () => {
    const filesChanged = jest.fn();
    await render(
      `<matx-photo-picker
        (filesChanged)="filesChanged($event)"
      ></matx-photo-picker>`,
      {
        componentProperties: { ...Primary.args, filesChanged },
        imports: [PhotoPickerComponent],
      }
    );

    // This input is inside a child component
    // Need to replace this with a ComponentHarness
    const inputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const files = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
    ];
    fireEvent.change(inputElement, { target: { files } });

    expect(filesChanged).toHaveBeenCalledWith(files);
  });

  it('should set inputs to dropzone', async () => {
    const accept = ['application/pdf', 'image/jpeg'];
    const multiple = true;
    const { fixture } = await render(PhotoPickerComponent, {
      componentInputs: { accept, multiple },
    });

    const dropzone = fixture.debugElement.injector.get(FileDragDropDirective);

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
      By.directive(FileBrowserDirective)
    );
    // the button above is type of MatButton component
    // so we need to get the directive from its injector
    const fileBrowse = button.injector.get(FileBrowserDirective);

    expect(fileBrowse.accept).toEqual(accept);
    expect(fileBrowse.multiple).toEqual(multiple);
  });
});
