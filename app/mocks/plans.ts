import { I18nManager } from "react-native"

const plans = [
  {
    name: "Free",
    price: 0,
    services: ["Live for 7 days", "Free for each user ones"],
  },
  {
    name: "Basic",
    price: 3,
    services: ["Live for 7 days", "Free for each user ones"],
  },
  {
    name: "Premium",
    price: 7,
    services: [
      "Live for 20 days",
      "Will be published in social medias",
      "Will be live in the special segment",
    ],
  },
  {
    name: "VIP",
    price: 15,
    services: [
      "Will be published in social medias",
      "Live for 30 days",
      "Will be live in the special segment",
      "Refreshed to first place every 2 days",
    ],
  },
]
const plansAR = [
  {
    name: "مجاني",
    price: 0,
    services: ["Live for 7 days", "Free for each user ones"],
  },
  {
    name: "أساسي",
    price: 3,
    services: ["Live for 7 days", "Free for each user ones"],
  },
  {
    name: "ممتاز",
    price: 7,
    services: [
      "Live for 20 days",
      "Will be published in social medias",
      "Will be live in the special segment",
    ],
  },
  {
    name: "VIP",
    price: 15,
    services: [
      "Will be published in social medias",
      "Live for 30 days",
      "Will be live in the special segment",
      "Refreshed to first place every 2 days",
    ],
  },
]

export default I18nManager.isRTL ? plansAR : plans
