import { render, screen } from '@testing-library/angular';

import { AvatarComponent } from './avatar.component';
import { Default } from './avatar.component.stories';

describe('AvatarComponent', () => {
  it('should add a class matching the selector to the host element by default', async () => {
    await render(`<matx-avatar data-testid="avatar"></matx-avatar>`, {
      componentProperties: Default.args,
      imports: [AvatarComponent],
    });

    const avatar = await screen.findByTestId('avatar');

    expect(avatar).toHaveClass('matx-avatar');
  });
});
