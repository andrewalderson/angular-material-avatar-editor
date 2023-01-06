import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ProfilePictureComponent } from './profile-picture.component';
import {
  ProfilePictureDialog,
  ProfilePictureDialogTriggerComponent,
} from './profile-picture.dialog';

export default {
  title: 'ProfilePictureDialog',
  component: ProfilePictureDialog,
  decorators: [
    moduleMetadata({
      imports: [ProfilePictureDialogTriggerComponent, ProfilePictureComponent],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width:'96px';height:'96px'">${story}</div>`
    ),
  ],
} as Meta<ProfilePictureDialog>;

const Template: Story<ProfilePictureDialog> = (args: ProfilePictureDialog) => ({
  props: args,
  template: `<button matx-profile-picture-dialog-trigger><matx-profile-picture></matx-profile-picture></button>`,
});

export const Primary = Template.bind({});
Primary.args = {};
