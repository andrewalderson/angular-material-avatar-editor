import { fireEvent, render, screen } from '@testing-library/angular';

import { ProfilePictureDialogTriggerComponent } from './profile-picture.dialog';

describe('ProfilePictureDialog', () => {
  it('should create', async () => {
    const { container } = await render(ProfilePictureDialogTriggerComponent);

    fireEvent.click(container);
    const dialog = await screen.findByRole('dialog');

    expect(dialog).toBeInTheDocument();
  });
});
