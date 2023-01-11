import { Component, Input, ViewChild } from '@angular/core';
import { fireEvent, render } from '@testing-library/angular';
import { FileBrowseDirective } from './file-browse.directive';

describe('FileBrowseDirective', () => {
  it('should forward button clicks to the file input', async () => {
    const { fixture, findByRole } = await render(FileBrowseHostComponent);

    const buttonElement = await findByRole('button');
    const inputElement = fixture.componentInstance.fileBrowse
      ?.input as HTMLInputElement;

    const inputClickFn = jest.fn();

    inputElement.click = inputClickFn;

    fireEvent.click(buttonElement);

    expect(inputClickFn).toHaveBeenCalled();
  });

  it('should set the properties on teh input element', async () => {
    const multiple = true;
    const accept = ['image/jpeg', 'image/png'];

    const { fixture } = await render(FileBrowseHostComponent, {
      componentInputs: { multiple, accept },
    });

    const inputElement = fixture.componentInstance.fileBrowse
      ?.input as HTMLInputElement;

    expect(inputElement.type).toEqual('file');
    expect(inputElement.accept).toEqual(accept.join(','));
    expect(inputElement.multiple).toEqual(multiple);
  });

  it('should emit single file when multiple is false', async () => {
    const { fixture } = await render(FileBrowseHostComponent, {
      componentInputs: { multiple: false },
    });

    const inputElement = fixture.componentInstance.fileBrowse
      ?.input as HTMLInputElement;

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

    const inputElement = fixture.componentInstance.fileBrowse
      ?.input as HTMLInputElement;

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
  selector: 'matx-file-browse-host',
  template: `<button
    matxFileBrowse
    [accept]="accept"
    [multiple]="multiple"
    (filesChanged)="onFilesChanged($event)"
  ></button>`,
  imports: [FileBrowseDirective],
  standalone: true,
})
class FileBrowseHostComponent {
  @ViewChild(FileBrowseDirective) fileBrowse?: FileBrowseDirective;

  @Input() accept: string[] = [];

  @Input() multiple = false;

  onFilesChanged = jest.fn();
}
