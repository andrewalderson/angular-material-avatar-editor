import { By } from '@angular/platform-browser';
import { faker } from '@faker-js/faker';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component';
import { UserProfileService } from '../../data-access/user-profile.service';

import { ProfilePictureComponent } from './profile-picture.component';
import { Primary } from './profile-picture.component.stories';

describe('ProfilePictureComponent', () => {
  it('should not render the avatar if the profile is not defined', async () => {
    await render(ProfilePictureComponent, {
      componentProperties: Primary.args,
      providers: [
        {
          provide: UserProfileService,
          useValue: {
            profile$: of(null),
          },
        },
      ],
    });
    expect(document.querySelector('matx-avatar')).not.toBeInTheDocument();
  });
  it('should render the avatar if the profile is defined', async () => {
    await render(ProfilePictureComponent, {
      componentProperties: Primary.args,
      providers: [
        {
          provide: UserProfileService,
          useValue: {
            profile$: of({}),
          },
        },
      ],
    });
    expect(document.querySelector('matx-avatar')).toBeInTheDocument();
  });
  it('should set the name attibute of the avatar component when the profile name is defined', async () => {
    const userProfileName = faker.name.fullName();
    const { fixture } = await render(ProfilePictureComponent, {
      componentProperties: Primary.args,
      providers: [
        {
          provide: UserProfileService,
          useValue: {
            profile$: of({
              name: userProfileName,
            }),
          },
        },
      ],
    });

    // TODO - create TestHarness for avatar component and use it here
    const avatar = fixture.debugElement.query(By.css('matx-avatar'))
      .componentInstance as AvatarComponent;

    expect(avatar.name).toEqual(userProfileName);
  });
  it('should set the src attibute of the avatar component when the profile src is defined', async () => {
    const userProfilePicture = faker.internet.avatar();
    const { fixture } = await render(ProfilePictureComponent, {
      componentProperties: Primary.args,
      providers: [
        {
          provide: UserProfileService,
          useValue: {
            profile$: of({
              picture: userProfilePicture,
            }),
          },
        },
      ],
    });

    // TODO - create TestHarness for avatar component and use it here
    const avatar = fixture.debugElement.query(By.css('matx-avatar'))
      .componentInstance as AvatarComponent;

    expect(avatar.src).toEqual(userProfilePicture);
  });
});
