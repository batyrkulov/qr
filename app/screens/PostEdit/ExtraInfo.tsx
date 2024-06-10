import { useNavigation, useRoute } from "@react-navigation/core"
import { RouteProp } from "@react-navigation/native"
import React, { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { BackHandler, View } from "react-native"
import { useToast } from "react-native-toast-notifications"
import { useDispatch, useSelector } from "react-redux"

import {
  CategorySectionTypes,
  ExtraInfoResponseItem,
  getExtraInfo,
  updatePost,
} from "../../api/post"
import { MARGIN_BOTTOM } from "../../common_styles"
import {
  Body,
  CollapseList,
  Footer,
  GradientButton,
  Header,
  Notice,
  Screen,
  Text,
} from "../../components"
import { DynamicFilterOption } from "../../components/dynamic-filter-option"
import { AppStack, PostStack } from "../../navigators/constans"
import { PrimaryParamList } from "../../navigators/post-stack"
import { tradingSections } from "../../screens/PostYourListing/ExtraInformation/mock"
import { store } from "../../store"
import { clearPostData,setPostOption  } from "../../store/ducks/newPost/actions"
import { CONTAINER_EXTRA, DIVIDER } from "./styles"

type ExtraInfoScreenRouteProp = RouteProp<PrimaryParamList, PostStack.extraInfo>

export const ExtraInfoScreen: FC = () => {
  const { params } = useRoute<ExtraInfoScreenRouteProp>()
  const category_id = params?.details?.category?.id

  const {post} = useSelector(state => state.newPost)

  const { t } = useTranslation()
  const navigation = useNavigation()
  const toast = useToast()
  const dispatch = useDispatch()
  const [sections, setSections] = useState<ExtraInfoResponseItem[]>([])
  const { control, handleSubmit, reset, getValues } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedFormValues = store.getState().newPost.post.details;
    
    reset({
      ...params.details,
      mileage: params.details.mileage.toString(),
      ...savedFormValues,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (category_id && !params?.isTrading) {
      getExtraInfo(CategorySectionTypes.ADD, category_id).then(({ data }) => setSections(data))
    }
    if (params?.isTrading) {
      setSections(tradingSections)
    }
  }, [category_id, params?.isTrading])

  const goBack = () => {
    const data = getValues();

    for (const item in data) {
      if (data[item]?.value) 
        data[item] = data[item].value
    }

    dispatch(setPostOption({ option: "details", value: data }));

    navigation.goBack();
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    goBack();
    return true;
  });

  const handleNext = (data) => {
    for (const item in data) {
      if (data[item]?.value) {
        data[item] = data[item].value
      }
    }

    updatePost({
      postId: params?.details?.id,
      payload: {
        title: post.title,
        description: post.description,
        price: post.price,
        client_phone_number: post.client_phone_number,
        details: data,
        category_id: post.category_id || params.details.category_id
      },
    })
      .then((res) => {
        toast.show(t("common.successMessage"))
        dispatch(clearPostData())
      })
      .catch((err) => toast.show(err.response?.data?.message || err.message))

      navigation.navigate(AppStack.success)
  }

  return (
    <View style={CONTAINER_EXTRA}>
      <Screen preset="scroll">
        <Header title={t("postEdit.extraInfoTitle")} leftIcon="back" onLeftPress={goBack} />
        <Body containerStyles={MARGIN_BOTTOM(20)} withBackGroundImage>
          <Notice>
            <Text preset="input">{t("notices.extraInfo")}</Text>
          </Notice>
          {sections.map((section, i) => (
            <>
              <CollapseList
                key={section.id}
                initialState
                title={section.section.section_description.name}
              >
                {section.section.section_block.map((block) => {
                  return (
                    <View style={MARGIN_BOTTOM(16)} key={block.id}>
                      <DynamicFilterOption block={block} control={control} />
                    </View>
                  )
                })}
              </CollapseList>
              {sections.length - 1 !== i && <View style={DIVIDER} />}
            </>
          ))}
        </Body>
      </Screen>
      <Footer fixed>
        <GradientButton
          disabled={isLoading}
          onPress={handleSubmit(handleNext)}
          text={t("common.save")}
        />
      </Footer>
    </View>
  )
}
