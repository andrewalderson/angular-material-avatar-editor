import { faker } from '@faker-js/faker';
import { fireEvent, render } from '@testing-library/angular';
import { CropperImageComponent } from './cropper-image.component';

describe('CropperImageComponent', () => {
  it('should have a class matching the selector', async () => {
    const { container } = await render(CropperImageComponent);

    expect(container).toHaveClass('matx-cropper-image');
  });

  it('should not set the src attribute on the image when it is not supplied', async () => {
    const { findByRole } = await render(CropperImageComponent);

    const imageElement = await findByRole('img', { hidden: true });

    expect(imageElement).toHaveAttribute('src', '');
  });

  it('should set the src attribute on the image when it is supplied', async () => {
    const src = faker.image.imageUrl();
    const { findByRole } = await render(CropperImageComponent, {
      componentProperties: { src },
    });

    const imageElement = await findByRole('img', { hidden: true });

    expect(imageElement).toHaveAttribute('src', src);
  });

  it('should toggle image visibility when src is updated and image is loaded', async () => {
    const { findByRole, fixture } = await render(CropperImageComponent, {
      componentProperties: { src: faker.image.imageUrl(640, 480, 'cats') },
    });

    const imageElement = await findByRole('img', { hidden: true });

    expect(imageElement).toHaveStyle('visibility:hidden');

    fireEvent.load(imageElement);

    expect(imageElement).toHaveStyle('visibility:visible');

    fixture.componentRef.setInput(
      'src',
      faker.image.imageUrl(640, 480, 'dogs')
    );

    expect(imageElement).toHaveStyle('visibility:hidden');

    fireEvent.load(imageElement);

    expect(imageElement).toHaveStyle('visibility:visible');
  });

  it('should not set the image visible when the image fails to load', async () => {
    const { findByRole } = await render(CropperImageComponent, {
      componentProperties: { src: faker.image.imageUrl(640, 480, 'cats') },
    });

    const imageElement = await findByRole('img', { hidden: true });

    expect(imageElement).toHaveStyle('visibility:hidden');

    fireEvent.error(imageElement);

    expect(imageElement).toHaveStyle('visibility:hidden');
  });

  it('should set the width and height of the element to match the image size after it is loaded', async () => {
    const { container, findByRole } = await render(CropperImageComponent, {
      componentProperties: { src: faker.image.imageUrl(640, 480, 'cats') },
    });

    const naturalWidth = faker.datatype.number();
    const naturalHeight = faker.datatype.number();
    const imageElement = (await findByRole('img', {
      hidden: true,
    })) as HTMLImageElement;
    jest
      .spyOn(imageElement, 'naturalWidth', 'get')
      .mockReturnValue(naturalWidth);
    jest
      .spyOn(imageElement, 'naturalHeight', 'get')
      .mockReturnValue(naturalHeight);
    fireEvent.load(imageElement);

    expect(container).toHaveStyle({
      width: `${naturalWidth}px`,
      height: `${naturalHeight}px`,
    });
  });
});
