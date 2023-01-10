import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LocalImageLoaderComponent } from './local-image-loader.component';

export default {
  title: 'LocalImageLoaderComponent',
  component: LocalImageLoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<LocalImageLoaderComponent>;

const Template: Story<LocalImageLoaderComponent> = (args: LocalImageLoaderComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}