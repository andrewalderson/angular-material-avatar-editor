import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProfilePictureComponent } from './profile-picture.component';

export default {
  title: 'ProfilePictureComponent',
  component: ProfilePictureComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ProfilePictureComponent>;

const Template: Story<ProfilePictureComponent> = (args: ProfilePictureComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}