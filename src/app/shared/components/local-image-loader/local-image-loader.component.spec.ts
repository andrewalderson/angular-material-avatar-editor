import { render } from '@testing-library/angular';

import { LocalImageLoaderComponent } from './local-image-loader.component';
import { Primary } from './local-image-loader.component.stories';

describe('LocalImageLoaderComponent', () => {
  it('should add a class matching the selector to the host element by default', async () => {
    const { container } = await render(LocalImageLoaderComponent, {
      componentProperties: Primary.args,
    });

    expect(container).toHaveClass('matx-local-image-loader');
  });
});
