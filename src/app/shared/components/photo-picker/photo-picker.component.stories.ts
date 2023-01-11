import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { PhotoPickerComponent } from './photo-picker.component';

export default {
  title: 'PhotoPickerComponent',
  component: PhotoPickerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width:'90vw';height:'90vh'">${story}</div>`
    ),
  ],
} as Meta<PhotoPickerComponent>;

const Template: Story<PhotoPickerComponent> = (args: PhotoPickerComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  layout: 'centered',
};
