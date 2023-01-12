import { faker } from '@faker-js/faker';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
import { CropperCanvasComponent } from './cropper-canvas.component';
import { CropperImageComponent } from './cropper-image.component';
import { CropperSelectionComponent } from './cropper-selection.component';

export type Cropper = CropperImageComponent;

export default {
  title: 'CropperCanvasComponent',
  component: CropperCanvasComponent,
  decorators: [
    moduleMetadata({
      imports: [CropperImageComponent, CropperSelectionComponent],
    }),
    componentWrapperDecorator(
      (story) => `<div style="width: '100vw'; height:'100vh'">${story}</div>`
    ),
  ],
} as Meta<Cropper>;

const Template: Story<Cropper> = (args: Cropper) => ({
  props: args,
  template: `<matx-cropper-canvas>
    <matx-cropper-image [src]="src"></matx-cropper-image>
    <matx-cropper-selection></matx-cropper-selection>
    </matx-cropper-canvas>`,
});

export const Primary = Template.bind({});
Primary.args = {
  src: faker.image.abstract(2345, 1234),
};
Primary.parameters = {
  layout: 'fullscreen',
};
