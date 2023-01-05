import { render } from '@testing-library/angular';

import { ProfilePictureComponent } from './profile-picture.component';

describe('ProfilePictureComponent', () => {
  it('should create', async () => {
    const { findByText } = await render(ProfilePictureComponent);

    const textElement = await findByText('profile-picture works!');

    expect(textElement).toBeInTheDocument();
  });
});
