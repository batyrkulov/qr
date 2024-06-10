import React from "react"

import { AccountStack, BottomTabStack } from "../../navigators/constans"
import { color } from "../../theme"
import { ClockIcon, Listing, MessengerTab, WalletIcon } from "../icons"

export type itemOfMenu = {
  name: any
  icon: React.ReactElement
  isShowArrow: boolean
  navigate?: string
  type?: string
}

export const ListOfMenu: itemOfMenu[] = [
  {
    name: "myAccount.menu.myListings",
    icon: <Listing strokeColor={color.palette.white} width={18} height={18} />,
    isShowArrow: true,
    navigate: AccountStack.myListingsScreen,
  },
  {
    name: "myAccount.menu.payments",
    icon: <WalletIcon width={18} height={18} />,
    isShowArrow: true,
    navigate: AccountStack.paymentsScreen,
  },
  {
    name: "myAccount.menu.chats",
    icon: <MessengerTab strokeColor={color.palette.white} width={17} height={17} />,
    isShowArrow: true,
    navigate: BottomTabStack.messenger,
  },
  {
    name: "myAccount.menu.recentlyViewed",
    icon: <ClockIcon />,
    isShowArrow: true,
    navigate: AccountStack.recentlyViewedScreen,
  },
  // {
  //   name: "myAccount.menu.buyTokens",
  //   icon: <TokenIcon width={18} height={18} />,
  //   isShowArrow: false,
  //   type: "modal",
  // },
]
