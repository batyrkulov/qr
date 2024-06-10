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
  createTrading,
  ExtraInfoResponseItem,
  getExtraInfo,
} from "../../../api/post"
import { MARGIN_BOTTOM } from "../../../common_styles"
import {
  Body,
  CollapseList,
  Footer,
  GradientButton,
  Header,
  Notice,
  Screen,
  Text,
} from "../../../components"
import { DynamicFilterOption } from "../../../components/dynamic-filter-option"
import { AppStack, PostStack } from "../../../navigators/constans"
import { PrimaryParamList } from "../../../navigators/post-stack"
import { store } from "../../../store"
import { selectLastCategory } from "../../../store/ducks/category/selectors"
import { setPostOption } from "../../../store/ducks/newPost/actions"
import { clearTradingData } from "../../../store/ducks/newTrading/actions"
import { selectNewTrading } from "../../../store/ducks/newTrading/selectors"
import { RootState } from "../../../store/rootReducer"
import { tradingSections } from "./mock"
import { CONTAINER, DIVIDER } from "./styles"

type ExtraInfoScreenRouteProp = RouteProp<PrimaryParamList, PostStack.extraInfo>

export const ExtraInformationScreen: FC = () => {
  const { t } = useTranslation()
  
  const navigation = useNavigation()
  
  const toast = useToast()
  
  const { params } = useRoute<ExtraInfoScreenRouteProp>()
  
  const dispatch = useDispatch()
  
  const [sections, setSections] = useState<ExtraInfoResponseItem[]>([])
  
  const { control, handleSubmit, getValues, reset } = useForm();
  
  const category_id = useSelector((state: RootState) => selectLastCategory(state)?.id)
  
  const tradingData = useSelector(selectNewTrading)
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    reset(store.getState().newPost.post.details);
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

    dispatch(setPostOption({ option: "details", value: data }))
    
    navigation.goBack()
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    goBack();
    return true;
  });

  const handleNext = (data) => {
    for (const item in data) {
      if (data[item]?.value) 
        data[item] = data[item].value
    }
    
    if (!params?.isTrading) {
      dispatch(setPostOption({ option: "details", value: data }));
      navigation.navigate(PostStack.plan);
    } else {
      setIsLoading(true)
      createTrading({ ...tradingData, ...data })
        .then(() => {
          dispatch(clearTradingData());
          navigation.navigate(AppStack.success, { isTrading: true });
        })
        .catch((err) => toast.show(err.response?.data?.message || err.message));
    }
  }

  return (
    <View style={CONTAINER}>
      <Screen preset="scroll">
        <Header title={t("extraInfo.title")} leftIcon="back" onLeftPress={goBack} />
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
        <GradientButton disabled={isLoading} onPress={handleSubmit(handleNext)} text={t("common.nextStep")} />
      </Footer>
    </View>
  )
}
