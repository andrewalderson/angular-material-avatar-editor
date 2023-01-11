import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { FileBrowserComponent } from './file-browser.component';

export default {
  title: 'FileBrowserComponent',
  component: FileBrowserComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width:'90vw';height:'90vh'">${story}</div>`
    ),
  ],
} as Meta<FileBrowserComponent>;

const Template: Story<FileBrowserComponent> = (
  args: FileBrowserComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  layout: 'centered',
};
