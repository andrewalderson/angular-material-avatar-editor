import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { CropperCanvasComponent } from './cropper-canvas.component';
import { CropperImageComponent } from './cropper-image.component';

export default {
  title: 'CropperCanvasComponent',
  component: CropperCanvasComponent,
  decorators: [
    moduleMetadata({
      imports: [CropperImageComponent],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width: '100vw'; height:'100vh'">${story}</div>`
    ),
  ],
} as Meta<CropperCanvasComponent>;

const Template: Story<CropperCanvasComponent> = (
  args: CropperCanvasComponent
) => ({
  props: args,
  template: `<matx-cropper-canvas><matx-cropper-image></matx-cropper-image></matx-cropper-canvas>`,
});

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  layout: 'fullscreen',
};
