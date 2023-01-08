import { render } from '@testing-library/angular';
import { CropperImageComponent } from './cropper-image.component';

describe('CropperImageComponent', () => {
  it('should have a class matching the selector', async () => {
    const { container } = await render(CropperImageComponent);

    expect(container).toHaveClass('matx-cropper-image');
  });
});
