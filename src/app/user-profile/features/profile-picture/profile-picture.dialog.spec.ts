import { fireEvent, render, screen } from '@testing-library/angular';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { ProfilePictureDialogTriggerComponent } from './profile-picture.dialog';

describe('ProfilePictureDialog', () => {
  it('should create', async () => {
    const { container } = await render(ProfilePictureDialogTriggerComponent);

    fireEvent.click(container);
    const dialog = await screen.findByRole('dialog');

    expect(dialog).toBeInTheDocument();
  });

  it('should close the dialog when the close button is clicked', async () => {
    const { container, fixture } = await render(
      ProfilePictureDialogTriggerComponent
    );
    fireEvent.click(container);

    const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    let dialogs = await loader.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toEqual(1);

    const closeButton = await screen.findByRole('button', {
      name: /close/i,
    });
    fireEvent.click(closeButton);

    dialogs = await loader.getAllHarnesses(MatDialogHarness);

    expect(dialogs.length).toEqual(0);
  });
});
