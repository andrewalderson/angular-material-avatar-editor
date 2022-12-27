import { render } from '@testing-library/angular';
import {
  MATX_AVATAR_INITIALS_COLOR_FUNCTION,
  MATX_AVATAR_INITIALS_FUNCTION,
} from './avatar-initials';

import { faker } from '@faker-js/faker';
import { AvatarComponent } from './avatar.component';
import { Default, WithInitials } from './avatar.component.stories';

describe('AvatarComponent', () => {
  it('should add a class matching the selector to the host element by default', async () => {
    const { container } = await render(AvatarComponent, {
      componentProperties: Default.args,
    });

    expect(container).toHaveClass('matx-avatar');
  });
  it("should add the 'matx-avatar-with-icon' class to the host element when an icon is rendered", async () => {
    const { container } = await render(AvatarComponent, {
      componentProperties: Default.args,
    });

    expect(container).toHaveClass('matx-avatar-with-icon');
  });

  it("should add the 'matx-avatar-with-initials' class to the host element when the initials are rendered", async () => {
    const { container } = await render(AvatarComponent, {
      componentProperties: WithInitials.args,
    });

    expect(container).toHaveClass('matx-avatar-with-initials');
  });

  it('should render the icon by default', async () => {
    const { findByTestId } = await render(AvatarComponent, {
      componentProperties: Default.args,
    });

    const iconElement = await findByTestId('matx-avatar-default-icon');

    expect(iconElement).toBeInTheDocument();
  });

  test.each`
    name                     | initials
    ${'Andrew Alderson'}     | ${'AA'}
    ${'Brian Jones'}         | ${'BJ'}
    ${'John'}                | ${'J'}
    ${'John Francis Xavier'} | ${'JX'}
  `(
    'should render the initials $initials when the valid name input $name is supplied by default',
    async ({ name, initials }) => {
      const { findByTestId } = await render(AvatarComponent, {
        componentInputs: { name },
      });

      const initialsElement = await findByTestId('matx-avatar-initials');

      expect(initialsElement).toHaveTextContent(initials);
    }
  );

  it('should not render an icon when a name is supplied and initials can be created', async () => {
    const initials = 'AB';
    const { queryByTestId } = await render(AvatarComponent, {
      componentProperties: WithInitials.args,
      providers: [
        {
          provide: MATX_AVATAR_INITIALS_FUNCTION,
          useValue: () => initials,
        },
      ],
    });

    const iconElement = queryByTestId('matx-avatar-default-icon');

    expect(iconElement).not.toBeInTheDocument();
  });

  it('should not render the initials when a name is supplied but initials cannot be created', async () => {
    const { queryByTestId } = await render(AvatarComponent, {
      componentProperties: WithInitials.args,
      providers: [
        {
          provide: MATX_AVATAR_INITIALS_FUNCTION,
          useValue: () => null,
        },
      ],
    });

    const initialsElement = queryByTestId('matx-avatar-initials');

    expect(initialsElement).not.toBeInTheDocument();
  });

  it('should set the font size on the host element when the initials are rendered', async () => {
    const { fixture } = await render(AvatarComponent, {
      componentProperties: WithInitials.args,
    });

    const mockClientHeight = 100;
    // the fact that the component uses the 'clientHeight' of the element
    // is an implementation details.
    // TODO find a better way to test this
    jest
      .spyOn(fixture.nativeElement, 'clientHeight', 'get')
      .mockReturnValue(mockClientHeight);
    fixture.detectChanges();

    const expectedFontSize =
      mockClientHeight * fixture.componentInstance.fontSizeRatio;
    expect(fixture.nativeElement).toHaveStyle(
      `font-size:
      ${expectedFontSize}px`
    );
  });

  it('should not set the font size style on the host when the initials are not rendered', async () => {
    const { fixture } = await render(AvatarComponent, {
      componentProperties: Default.args,
    });

    const mockClientHeight = 100;
    // the fact that the component uses the 'clientHeight' of the element
    // is an implementation details.
    // TODO find a better way to test this
    jest
      .spyOn(fixture.nativeElement, 'clientHeight', 'get')
      .mockReturnValue(mockClientHeight);
    fixture.detectChanges();

    const expectedFontSize =
      mockClientHeight * fixture.componentInstance.fontSizeRatio;
    expect(fixture.nativeElement).not.toHaveStyle(`font-size:
      ${expectedFontSize}px`);
  });

  it('should set the font and background color styles on the host when the initials are rendered', async () => {
    const background = faker.color.rgb();
    const foreground = faker.color.rgb();
    const { container } = await render(AvatarComponent, {
      componentProperties: WithInitials.args,
      providers: [
        {
          provide: MATX_AVATAR_INITIALS_COLOR_FUNCTION,
          useValue: () => {
            return { background, foreground };
          },
        },
      ],
    });

    expect(container).toHaveStyle(`color:${foreground}`);
    expect(container).toHaveStyle(`background:${background}`);
  });

  it('should not set the font and background color styles on the host when the initials are not rendered', async () => {
    const background = faker.color.rgb();
    const foreground = faker.color.rgb();
    const { container } = await render(AvatarComponent, {
      componentProperties: Default.args,
      providers: [
        {
          provide: MATX_AVATAR_INITIALS_COLOR_FUNCTION,
          useValue: () => {
            return { background, foreground };
          },
        },
      ],
    });

    expect(container).not.toHaveStyle(`color:${foreground}`);
    expect(container).not.toHaveStyle(`background:${background}`);
  });
});
