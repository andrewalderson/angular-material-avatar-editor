import { render } from '@testing-library/angular';

import { CropperSelectionComponent } from './cropper-selection.component';

describe('CropperSelectionComponent', () => {
  it('should have a class matching the selector', async () => {
    const { container } = await render(CropperSelectionComponent);

    expect(container).toHaveClass('matx-cropper-selection');
  });
});
