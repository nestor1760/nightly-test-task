import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tailwindElement } from '../../shared/tailwind.element'
import style from './nightly-selector.css'
import { SelectorView, WalletSelectorItem } from '../../utils/types'
import { styleMap } from 'lit/directives/style-map.js'
import '../nightly-desktop-main/nightly-desktop-main'
import '../nightly-connect-wallet/nightly-connect-wallet'
import '../nightly-header/nightly-header'
import '../nightly-mobile-all-wallets/nightly-mobile-all-wallets'
import '../nightly-mobile-qr/nightly-mobile-qr'
import '../nightly-mobile-main/nightly-mobile-main'

import '../nightly-button-open/nightly-button-open'
import '../nightly-footer/nightly-footer'

import { XMLOptions } from '@nightlylabs/qr-code'

@customElement('nightly-selector')
export class NightlySelector extends LitElement {
  static styles = tailwindElement(style)

  // props
  //add 2 news parameters for footer components
  @property({ type: String })
  serviceLink = 'https://common.fi/terms-of-service'

  @property({ type: String })
  policyLink = 'https://common.fi/privacy-policy'

  //add new parameters
  @property({ type: Boolean })
  darkTheme = false

  @property({ type: String })
  wrapClassName = ''

  @property({ type: Boolean })
  closeButton = false

  @property({ type: String })
  widthModal = '720px'

  @property({ type: Number})
  zIndex = 1000

  @property()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {}

  @property({ type: Array })
  selectorItems: WalletSelectorItem[] = []

  @property({ type: Function })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onWalletClick: (name: string) => void = () => {}

  @property({ type: String })
  chainIcon = ''

  @property({ type: Boolean })
  centeredModal = true

  @property({ type: String })
  chainName = ''

  @property({ type: String })
  sessionId = ''

  @property({ type: String })
  relay = ''

  @property({ type: Boolean })
  connecting = false

  @property({ type: Object })
  qrConfigOverride: Partial<XMLOptions> = {}

  // state

  @state()
  fireClosingAnimation = false

  @state()
  mobileContentHeight = 182

  @state()
  link = ''

  @state()
  walletIcon = ''

  @state()
  currentWalletName = ''

  @state()
  canAnimateInitialView = false

  @state()
  currentView = SelectorView.DESKTOP_MAIN

  @state()
  isMobile = false

  // media queries

  mobileQuery = window.matchMedia('(max-width: 640px)')
  smallerMobileQuery = window.matchMedia('(max-width: 482px)')
  smallestMobileQuery = window.matchMedia('(max-width: 374px)')

  // callbacks

  calcMobileContentHeight = () => {
    switch (this.currentView) {
      case SelectorView.MOBILE_QR:
        return this.smallestMobileQuery.matches ? 332 : this.smallerMobileQuery.matches ? 420 : 510
      case SelectorView.MOBILE_ALL:
        return 526
      case SelectorView.CONNECTING:
        return this.smallestMobileQuery.matches ? 440 : this.smallerMobileQuery.matches ? 430 : 420
      default:
        return 182
    }
  }

  setCurrentView = (val: SelectorView) => {
    this.currentView = val
    this.mobileContentHeight = this.calcMobileContentHeight()
  }

  handleClose = () => {
    this.fireClosingAnimation = true
    console.log(this.fireClosingAnimation);

    setTimeout(
      () => {
        this.onClose()
      },
      this.mobileQuery.matches ? 240 : 80
    )
  }

  onSelectWallet = (name: string) => {
    const wallet = this.selectorItems.find((w) => w.name === name)

    this.walletIcon = wallet?.icon ?? ''
    this.currentWalletName = wallet?.name ?? ''
    this.link = wallet?.link ?? ''

    this.setCurrentView(SelectorView.CONNECTING)

    this.canAnimateInitialView = true

    this.onWalletClick(name)
  }

  tryAgainClick = () => {
    this.onSelectWallet(this.currentWalletName)
  }

  downloadApp = () => {
    window.open(this.link, '_blank')
  }

  backToPage = () => {
    if (this.mobileQuery.matches) {
      this.setCurrentView(SelectorView.MOBILE_MAIN)
    } else {
      this.setCurrentView(SelectorView.DESKTOP_MAIN)
    }
  }

  returnToMobileInit = () => {
    this.setCurrentView(SelectorView.MOBILE_MAIN)
  }

  goToMobileQr = () => {
    this.setCurrentView(SelectorView.MOBILE_QR)
    this.canAnimateInitialView = true
  }

  goToMobileAll = () => {
    this.setCurrentView(SelectorView.MOBILE_ALL)
    this.canAnimateInitialView = true
  }

  // lifecycle callbacks

  constructor() {
    super()

    this.handleClose = this.handleClose.bind(this)
    this.onSelectWallet = this.onSelectWallet.bind(this)
    this.tryAgainClick = this.tryAgainClick.bind(this)
    this.downloadApp = this.downloadApp.bind(this)
    this.backToPage = this.backToPage.bind(this)
    this.returnToMobileInit = this.returnToMobileInit.bind(this)
    this.goToMobileAll = this.goToMobileAll.bind(this)
    this.goToMobileQr = this.goToMobileQr.bind(this)

    if (this.mobileQuery.matches) {
      this.isMobile = true
      this.setCurrentView(SelectorView.MOBILE_MAIN)
    }

    this.mobileQuery.addEventListener('change', () => {
      this.isMobile = this.mobileQuery.matches
      if (this.currentView !== SelectorView.CONNECTING) {
        this.setCurrentView(
          this.mobileQuery.matches ? SelectorView.MOBILE_MAIN : SelectorView.DESKTOP_MAIN
        )
      }

      this.mobileContentHeight = this.calcMobileContentHeight()
    })

    this.smallerMobileQuery.addEventListener('change', () => {
      this.mobileContentHeight = this.calcMobileContentHeight()
    })

    this.smallestMobileQuery.addEventListener('change', () => {
      this.mobileContentHeight = this.calcMobileContentHeight()
    })
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.fireClosingAnimation = false
    this.canAnimateInitialView = false
    if (this.mobileQuery.matches) {
      this.setCurrentView(SelectorView.MOBILE_MAIN)
    } else {
      this.setCurrentView(SelectorView.DESKTOP_MAIN)
    }
    this.mobileContentHeight = 182
  }

  renderConnect() {
    return html`
      <nightly-connect-wallet
        id="modalConnect"
        class="nc_modalViewEntryTransition"
        .coinName=${this.currentWalletName}
        .connecting=${this.connecting}
        .tryAgainClick=${this.tryAgainClick}
        .goBack=${this.backToPage}
        .downloadApp=${this.downloadApp}
        .link=${this.link}
        .nameLink=${this.currentWalletName}
        .walletIcon=${this.walletIcon}
        .darkTheme=${this.darkTheme}
      ></nightly-connect-wallet>
    `
  }

  renderDesktop() {
    return html`
      <nightly-desktop-main
        id="modalDesktop"
        class="${this.canAnimateInitialView && this.currentView === SelectorView.DESKTOP_MAIN
          ? 'nc_modalViewEntryTransition'
          : ''}"
        .chainIcon=${this.chainIcon}
        .chainName=${this.chainName}
        .onWalletClick=${this.onSelectWallet}
        .selectorItems=${this.selectorItems}
        .sessionId=${this.sessionId}
        .relay=${this.relay}
        .qrConfigOverride=${this.qrConfigOverride}
        .darkTheme=${this.darkTheme}
      ></nightly-desktop-main>
    `
  }

  renderMobileAll() {
    return html`
      <nightly-mobile-all-wallets
        class="nc_modalViewEntryTransition"
        .goBack=${this.returnToMobileInit}
        .onWalletClick=${this.onSelectWallet}
        .selectorItems=${this.selectorItems}
        .darkTheme=${this.darkTheme}
      ></nightly-mobile-all-wallets>
    `
  }

  renderMobileInit() {
    return html`
      <nightly-mobile-main
        class="${this.canAnimateInitialView && this.currentView === SelectorView.MOBILE_MAIN
          ? 'nc_modalViewEntryTransition'
          : ''}"
        .sessionId=${this.sessionId}
        .showAllWallets=${this.goToMobileAll}
        .onWalletClick=${this.onSelectWallet}
        .openQrPage=${this.goToMobileQr}
        .selectorItems=${this.selectorItems}
        .darkTheme=${this.darkTheme}
      ></nightly-mobile-main>
    `
  }

  renderMobileQr() {
    return html`
      <nightly-mobile-qr
        class="nc_modalViewEntryTransition"
        .chainName=${this.chainName}
        .sessionId=${this.sessionId}
        .relay=${this.relay}
        .showAllWallets=${this.returnToMobileInit}
        .qrConfigOverride=${this.qrConfigOverride}
        .darkTheme=${this.darkTheme}
      ></nightly-mobile-qr>
    `
  }

  renderFooter() {
    return html`<nightly-footer .darkTheme=${this.darkTheme} .serviceLink=${this.serviceLink} .policyLink=${this.policyLink}></nightly-footer>`
  }

  renderCurrent() {
    switch (this.currentView) {
      case SelectorView.DESKTOP_MAIN:
        return this.renderDesktop()
      case SelectorView.CONNECTING:
        return this.renderConnect()
      case SelectorView.MOBILE_MAIN:
        return this.renderMobileInit()
      case SelectorView.MOBILE_QR:
        return this.renderMobileQr()
      case SelectorView.MOBILE_ALL:
        return this.renderMobileAll()
    }
  }

  // Change conditional
  render() {
    return html`
      <div
        class="nc_modalOverlay ${this.fireClosingAnimation ? 'nc_modalClosingAnimation' : ''}"
        @click=${this.handleClose}
      >
        <div
          @click=${(e: MouseEvent) => {
            e.stopPropagation()
          }}
          class="${this.wrapClassName} nc_modalWrapper ${this.fireClosingAnimation && window.innerWidth < 640
            ? 'nc_modalMobileSlideOutAnimation'
            : this.fireClosingAnimation && window.innerWidth >= 640
              ? 'nc_modalSlideDownAnimation'
              : ''}
              ${this.centeredModal ? '' : 'unCenteredModal'}
              "
          style="max-width: ${this.widthModal}; background-color: ${this.darkTheme ? "#1c1a1a" : ''}; z-index: ${this.zIndex}"
        >
          <nightly-header .cancelButton=${this.closeButton} .onClose=${this.handleClose}></nightly-header>
          <div
            class="nc_modalContent"
            style=${styleMap(
              this.isMobile
                ? {
                    height: this.mobileContentHeight + 'px',
                    backgroundColor: this.darkTheme ? "#272424" : ''
                  }
                : {}
            )}
            "background-color: ${this.darkTheme ? "#1c1a1a" : ''}"
          >
            ${this.renderCurrent()}
          </div>
          ${window.innerWidth > 345
            ? this.renderFooter()
            : null
          }
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nightly-selector': NightlySelector
  }
}
