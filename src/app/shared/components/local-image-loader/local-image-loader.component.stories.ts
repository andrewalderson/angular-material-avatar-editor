import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { LocalImageLoaderComponent } from './local-image-loader.component';

export default {
  title: 'LocalImageLoaderComponent',
  component: LocalImageLoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width:'90vw';height:'90vh'">${story}</div>`
    ),
  ],
} as Meta<LocalImageLoaderComponent>;

const Template: Story<LocalImageLoaderComponent> = (
  args: LocalImageLoaderComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  layout: 'centered',
};
