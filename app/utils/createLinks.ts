import dynamicLinks from "@react-native-firebase/dynamic-links"
import queryString from "query-string"

const DOMAIN = "https://q8rider.page.link"
// const DOMAIN = "prod.q8rider.biz"
export const createPostLink = async (id: number | string): Promise<string> => {
  return await dynamicLinks().buildShortLink({
    link: queryString.stringifyUrl({ url: DOMAIN, query: { screenName: "post", id } }),
    domainUriPrefix: DOMAIN,
    android: {
      packageName: "com.q8rider",
      // fallbackUrl: 'https://google.com'
    },
    ios: {
      bundleId: "com.kuwaitrider",
      // appStoreId:''
    },
  })
}
