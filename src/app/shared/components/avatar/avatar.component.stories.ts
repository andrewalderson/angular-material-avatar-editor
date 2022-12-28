import { faker } from '@faker-js/faker';
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular';
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
Default.args = {};

export const WithInitials = Template.bind({});
WithInitials.args = {
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  username: faker.internet.userName(),
};

export const WithImage = Template.bind({});
WithImage.args = {
  src: faker.internet.avatar(),
};
