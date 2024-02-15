import { customElement, property } from 'lit/decorators.js'
import { tailwindElement } from '../../shared/tailwind.element'
import style from './nightly-button-open.css'
import { LitElement, html } from 'lit'

@customElement('nightly-button-open')
export class NightlyButtonOpen extends LitElement {
  static styles = tailwindElement(style)

  @property()
  onButtonClick?: () => void;

  @property({ type: String })
  label = ''

  render() {
    return html`
      <button class="nc_button_open" @click=${this.onButtonClick}>${this.label}</button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nightly-button-open': NightlyButtonOpen
  }
}
