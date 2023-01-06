import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { ProfilePictureComponent } from './profile-picture.component';

export default {
  title: 'ProfilePictureComponent',
  component: ProfilePictureComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width:'96px';height:'96px'">${story}</div>`
    ),
  ],
} as Meta<ProfilePictureComponent>;

const Template: Story<ProfilePictureComponent> = (
  args: ProfilePictureComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
