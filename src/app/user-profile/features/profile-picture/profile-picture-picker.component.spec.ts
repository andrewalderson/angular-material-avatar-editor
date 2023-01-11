import { render } from '@testing-library/angular';

import { ProfilePicturePickerComponent } from './profile-picture-picker.component';

describe('ProfilePicturePickerComponent', () => {
  it('should create', async () => {
    const { findByText } = await render(ProfilePicturePickerComponent);

    const textElement = await findByText('profile-picture-picker works!');

    expect(textElement).toBeInTheDocument();
  });
});
