import { Component, Input, ViewChild } from '@angular/core';
import { fireEvent, render } from '@testing-library/angular';
import { FileBrowserDirective } from './file-browser.directive';

describe('FileBrowserDirective', () => {
  it('should forward button clicks to the file input', async () => {
    const { findByRole } = await render(FileBrowseHostComponent);

    const buttonElement = await findByRole('button');
    const inputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const inputClickFn = jest.fn();

    inputElement.click = inputClickFn;

    fireEvent.click(buttonElement);

    expect(inputClickFn).toHaveBeenCalled();
  });

  it('should set the properties on the input element', async () => {
    const multiple = true;
    const accept = ['image/jpeg', 'image/png'];

    await render(FileBrowseHostComponent, {
      componentInputs: { multiple, accept },
    });

    const inputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(inputElement.type).toEqual('file');
    expect(inputElement.accept).toEqual(accept.join(','));
    expect(inputElement.multiple).toEqual(multiple);
  });

  it('should emit single file when multiple is false', async () => {
    const { fixture } = await render(FileBrowseHostComponent, {
      componentInputs: { multiple: false },
    });

    const inputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const files = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
      new File(['(⌐□_□)'], 'homersimpson.png', { type: 'image/jpeg' }),
    ];
    fireEvent.change(inputElement, { target: { files } });

    expect(fixture.componentInstance.onFilesChanged).toHaveBeenCalledWith([
      files[0],
    ]);
  });

  it('should emit multiple files when multiple is true', async () => {
    const { fixture } = await render(FileBrowseHostComponent, {
      componentInputs: { multiple: true },
    });

    const inputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const files = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
      new File(['(⌐□_□)'], 'homersimpson.png', { type: 'image/jpeg' }),
    ];
    fireEvent.change(inputElement, { target: { files } });

    expect(fixture.componentInstance.onFilesChanged).toHaveBeenCalledWith(
      files
    );
  });
});

@Component({
  selector: 'matx-file-browser-host',
  template: `<button
    matxFileBrowser
    [accept]="accept"
    [multiple]="multiple"
    (filesChanged)="onFilesChanged($event)"
  ></button>`,
  imports: [FileBrowserDirective],
  standalone: true,
})
class FileBrowseHostComponent {
  @ViewChild(FileBrowserDirective) fileBrowse?: FileBrowserDirective;

  @Input() accept: string[] = [];

  @Input() multiple = false;

  onFilesChanged = jest.fn();
}
