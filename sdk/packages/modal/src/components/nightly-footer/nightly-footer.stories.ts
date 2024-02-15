import { NightlyFooter } from './nightly-footer';
import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';

const meta = {
  title: 'nightly-footer',
  component: 'nightly-footer',
  parameters: {
    layout: 'centered'
  },
  render: (args) => {
    return html`<nightly-footer .serviceLink=${args.serviceLink} .policyLink=${args.policyLink}></nightly-footer>`
  }
} satisfies Meta<NightlyFooter>
 
export default meta
type Story = StoryObj<NightlyFooter>

export const Default: Story = {
  name: 'Default',
  component: NightlyFooter,
  args: {
    serviceLink: 'https://common.fi/terms-of-service',
    policyLink: 'https://common.fi/privacy-policy',
  }
}
