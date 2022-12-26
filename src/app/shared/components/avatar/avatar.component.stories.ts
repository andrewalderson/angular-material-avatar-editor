import { moduleMetadata, Story, Meta, componentWrapperDecorator } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

export default {
  title: 'AvatarComponent',
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width:'96px';height:'96px'">${story}</div>`
    ),
  ],
} as Meta<AvatarComponent>;

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  props: args,
});


export const Default = Template.bind({});
Default.args = {
}