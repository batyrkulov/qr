import { RouteProp, useRoute } from "@react-navigation/core"
import React from "react"

import { PostStack } from "../../../navigators/constans"
import { PrimaryParamList } from "../../../navigators/post-stack"
import { AddMediaPost } from "./AddMediaPost"
import { AddMediaTrading } from "./AddMediaTrading"

type AddMediaScreenRouteProp = RouteProp<PrimaryParamList, PostStack.media>

export const AddMediaScreen = () => {
  const { params } = useRoute<AddMediaScreenRouteProp>()

  if (params?.isTrading) {
    return <AddMediaTrading />
  } else {
    return <AddMediaPost />
  }
}
