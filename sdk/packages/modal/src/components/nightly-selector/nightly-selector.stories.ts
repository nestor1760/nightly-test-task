import { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/client-api'
import { html } from 'lit'
import { NightlySelector } from './nightly-selector'
import './nightly-selector'
import Phantom from '../../static/svg/PhantomIcon.svg'
import MetaMask from '../../static/svg/MetaMaskIcon.svg'
import Coinbase from '../../static/svg/CoinbaseIcon.svg'
import Glow from '../../static/svg/GlowIcon.svg'
import ZenGO from '../../static/svg/ZenGOIcon.svg'
import Trust from '../../static/svg/TrustIcon.svg'
import Binance from '../../static/svg/BinanceIcon.svg'
import Sollet from '../../static/svg/SolletIcon.svg'
import NightlyIcon from '../../static/svg/NightlyIcon.svg'
import ChainIcon from '../../static/svg/ChainIcon.svg'
import { WalletSelectorItem } from '../../utils/types'

import '../nightly-button-open/nightly-button-open'

const metaSelector = {
  title: 'nightly-selector',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    open: {
      control: 'boolean'
    }
  }
} satisfies Meta<NightlySelector & { open: boolean }>

export default metaSelector

interface NightlyModalArgs {
  onClose: () => void
  //2
  onOpen: () => void
  label: string
  darkTheme: boolean
  closeButton: boolean
  widthModal: string
  wrapClassName: string 
  centeredModal: boolean
  zIndex: number
  //
  selectorItems: WalletSelectorItem[]
  onWalletClick: (name: string) => void
  chainIcon: string
  chainName: string
  sessionId: string
  connecting: boolean
  relay: string
}
type Story = StoryObj<NightlyModalArgs & { open: boolean }>

export const Default: Story = (args: NightlyModalArgs) => {
  const [{ open }, updateArgs] = useArgs()

  const handleClose = () => {
    updateArgs({ open: false })
    args.onClose()
  }

  //1
  const handleOpen = () => {
    updateArgs({ open: true })
    args.onOpen()
  }

  return open
    ? html`
        <nightly-button-open .onButtonClick=${handleOpen} .label=${args.label}></nightly-button-open>
        <nightly-selector
          .zIndex=${args.zIndex}
          .centeredModal=${args.centeredModal}
          .wrapClassName=${args.wrapClassName}
          .widthModal=${args.widthModal}
          .cancelButton=${args.closeButton}
          .darkTheme=${args.darkTheme}
          .onClose=${handleClose}
          .selectorItems=${args.selectorItems}
          .onWalletClick=${args.onWalletClick}
          .chainIcon=${args.chainIcon}
          .chainName=${args.chainName}
          .sessionId=${args.sessionId}
          ?connecting=${args.connecting}
          .relay=${args.relay}
        ></nightly-selector>
      `
    : html`
      <nightly-button-open .onButtonClick=${handleOpen} .label=${args.label}></nightly-button-open>
    `
}

Default.args = {
  onClose: () => console.log('close'),
  onOpen: () => console.log('open'),
  selectorItems: [
    { name: 'Phantom', icon: Phantom, recent: true, link: `https://www.binance.com/en` },
    {
      name: 'Nightly Wallet',
      icon: NightlyIcon,
      link: `https://www.binance.com/en`
    },
    { name: 'MetaMask', icon: MetaMask, link: `https://www.binance.com/en` },
    { name: 'Glow', icon: Glow, link: `https://www.binance.com/en` },
    { name: 'ZenGO', icon: ZenGO, detected: true, link: `https://www.binance.com/en` },
    { name: 'Trust', icon: Trust, link: `https://www.binance.com/en` },
    { name: 'Binance', icon: Binance, link: `https://www.binance.com/en` },
    { name: 'Sollet', icon: Sollet, link: `https://www.binance.com/en` },
    { name: 'Phantom2', icon: Phantom, link: `https://www.binance.com/en` },
    { name: 'MetaMask2', icon: MetaMask, link: `https://www.binance.com/en` },
    { name: 'Coinbase', icon: Coinbase, link: `https://www.binance.com/en` },
    { name: 'ZenGO2', icon: ZenGO, link: `https://www.binance.com/en` },
    { name: 'Trust2', icon: Trust, detected: true, link: `https://www.binance.com/en` },
    { name: 'Binance2', icon: Binance, link: `https://www.binance.com/en` },
    { name: 'Phantom3', icon: Phantom, link: `https://www.binance.com/en` },
    {
      name: 'Nightly Wallet2',
      icon: NightlyIcon,
      link: `https://www.binance.com/en`
    },
    { name: 'MetaMask2', icon: MetaMask, link: `https://www.binance.com/en` },
    { name: 'Glow2', icon: Glow, link: `https://www.binance.com/en` },
    { name: 'ZenGO3', icon: ZenGO, detected: true, link: `https://www.binance.com/en` },
    { name: 'Trust3', icon: Trust, link: `https://www.binance.com/en` },
    { name: 'Binance3', icon: Binance, link: `https://www.binance.com/en` },
    { name: 'Sollet2', icon: Sollet, link: `https://www.binance.com/en` },
    { name: 'Phantom4', icon: Phantom, link: `https://www.binance.com/en` },
    { name: 'MetaMask3', icon: MetaMask, link: `https://www.binance.com/en` },
    { name: 'Coinbase2', icon: Coinbase, link: `https://www.binance.com/en` },
    { name: 'ZenGO4', icon: ZenGO, link: `https://www.binance.com/en` },
    { name: 'Trust4', icon: Trust, detected: true, link: `https://www.binance.com/en` },
    { name: 'Binance4', icon: Binance, link: `https://www.binance.com/en` }
  ],
  onWalletClick: (name: string) => {
    console.log('Item clicked:', name)
  },
  chainIcon: ChainIcon,
  chainName: 'Solana',
  sessionId:
    'fsdhfdzfsdhgfzghggdfhbgchgbdfnvfbxhncvfjhzxdhgbhghfgfvzhfgjhgszdhgzxdfhgfzxdjfuhdfhgd',
  connecting: true,
  relay: 'https://nc2.nightly.app',
  open: false,
  //3
  label: 'Connect',
  darkTheme: false,
  closeButton: false,
  widthModal: "720px",
  wrapClassName: '',
  centeredModal: true,
  zIndex: 1000,
}
