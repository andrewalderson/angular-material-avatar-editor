import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProfilePicturePickerComponent } from './profile-picture-picker.component';

export default {
  title: 'ProfilePicturePickerComponent',
  component: ProfilePicturePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ProfilePicturePickerComponent>;

const Template: Story<ProfilePicturePickerComponent> = (args: ProfilePicturePickerComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}