import { render } from '@testing-library/angular';

import { CropperCanvasComponent } from './cropper-canvas.component';
import { Primary } from './cropper-canvas.component.stories';

describe('CropperCanvasComponent', () => {
  it('should have a class matching the selector', async () => {
    const { container } = await render(CropperCanvasComponent, {
      componentProperties: Primary.args,
    });

    expect(container).toHaveClass('matx-cropper-canvas');
  });
});
