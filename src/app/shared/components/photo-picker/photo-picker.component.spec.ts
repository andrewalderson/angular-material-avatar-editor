import { render } from '@testing-library/angular';
import { PhotoPickerComponent } from './photo-picker.component';

import { Primary } from './photo-picker.component.stories';

describe('PhotoPickerComponent', () => {
  it('should add a class matching the selector to the host element by default', async () => {
    const { container } = await render(PhotoPickerComponent, {
      componentProperties: Primary.args,
    });

    expect(container).toHaveClass('matx-photo-picker');
  });
});
