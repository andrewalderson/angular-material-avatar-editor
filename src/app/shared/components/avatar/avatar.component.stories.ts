import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

export default {
  title: 'AvatarComponent',
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<AvatarComponent>;

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
}