import { fireEvent, render } from '@testing-library/angular';

import { LocalImageLoaderComponent } from './local-image-loader.component';
import { Primary } from './local-image-loader.component.stories';

describe('LocalImageLoaderComponent', () => {
  it('should add a class matching the selector to the host element by default', async () => {
    const { container } = await render(LocalImageLoaderComponent, {
      componentProperties: Primary.args,
    });

    expect(container).toHaveClass('matx-local-image-loader');
  });

  it('should add the droppable class on dragenter and remove it on dragleave', async () => {
    const { container } = await render(LocalImageLoaderComponent, {
      componentProperties: Primary.args,
    });

    expect(container).not.toHaveClass('droppable');

    fireEvent.dragEnter(container);

    expect(container).toHaveClass('droppable');

    fireEvent.dragLeave(container);

    expect(container).not.toHaveClass('droppable');
  });

  it('should add the droppable class on dragenter and remove it on drop', async () => {
    const { container } = await render(LocalImageLoaderComponent, {
      componentProperties: Primary.args,
    });

    expect(container).not.toHaveClass('droppable');

    fireEvent.dragEnter(container);

    expect(container).toHaveClass('droppable');

    fireEvent.drop(container);

    expect(container).not.toHaveClass('droppable');
  });

  it('should allow drop operation on the container', async () => {
    const { container, fixture } = await render(LocalImageLoaderComponent, {
      componentProperties: { ...Primary.args },
    });

    jest.spyOn(fixture.componentInstance.fileSelected, 'emit');

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    fireEvent.drop(container, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(fixture.componentInstance.fileSelected.emit).toHaveBeenCalledWith(
      file
    );
  });

  it('should allow user to select file', async () => {
    const { fixture, findByTestId } = await render(LocalImageLoaderComponent, {
      componentProperties: { ...Primary.args },
    });

    jest.spyOn(fixture.componentInstance.fileSelected, 'emit');

    const fileButton = await findByTestId('browseButton');
    const fileInput = await findByTestId('fileInput');

    jest.spyOn(fileInput, 'click');

    fileButton.click();

    expect(fileInput.click).toHaveBeenCalled();

    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fixture.componentInstance.fileSelected.emit).toHaveBeenCalledWith(
      file
    );
  });
});
