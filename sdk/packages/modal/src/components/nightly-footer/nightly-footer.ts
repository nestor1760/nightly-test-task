import { customElement, property } from 'lit/decorators.js'
import { tailwindElement } from '../../shared/tailwind.element'
import style from'./nightly-footer.css'
import { LitElement, html } from 'lit'

@customElement('nightly-footer')
export class NightlyFooter extends LitElement {
  static styles = tailwindElement(style);

  @property({type: String})
  serviceLink = ''

  @property({type: String})
  policyLink = ''

   //add new parameters
   @property({ type: Boolean })
   darkTheme = false

  render() {
    return html`
      <div class="nc_footerWrapper" style="background: ${this.darkTheme ? "#1c1a1a" : ''}">
          <p class="nc_footerText">By connecting, you agree to Common's <a href=${this.serviceLink} target="_blank">Terms of Service</a> and to its <a href=${this.policyLink} target="_blank">Privacy Policy</a>.</p>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nightly-footer':  NightlyFooter
  }
}

