import { AppComponent } from './app.component';

import { render, screen } from '@testing-library/angular';
import { Primary } from './app.component.stories';

describe('AppComponent', () => {
  it('should create the app', async () => {
    await render(AppComponent, {
      componentProperties: Primary.args,
    });

    const textContent = await screen.findByText('App works!');

    expect(textContent).toBeInTheDocument();
  });
});
