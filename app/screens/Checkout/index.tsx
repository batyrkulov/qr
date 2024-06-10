import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import {
  MFCurrencyISO,
  MFExecutePaymentRequest,
  MFInitiatePayment,
  MFLanguage,
  MFPaymentRequest,
  Response,
} from "myfatoorah-reactnative"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { I18nManager, Image, Modal, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { ROW_NO_RTL } from "../../common_styles"
import { Body, Header, Screen, Text } from "../../components"
import { AppStack, PostStack } from "../../navigators/constans"
import { PrimaryParamList } from "../../navigators/post-stack"
import { clearPostData } from "../../store/ducks/newPost/actions"
import { selectNewPost } from "../../store/ducks/newPost/selectors"
import { selectUser } from "../../store/ducks/profile/selectors"
import { PaymentFailScreen } from "../PaymentFail"
import { SuccessScreen } from "../Success"
import { errorCodes } from "./errorCodes"
import { PAYMENT_ITEM, PAYMENT_ITEM_IMAGE } from "./styles"

type CheckoutScreenRouteProp = RouteProp<PrimaryParamList, PostStack.checkout>

export const CheckoutScreen = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { params } = useRoute<CheckoutScreenRouteProp>()
  const [paymentMethods, setPaymentMethods] = useState([])
  const user = useSelector(selectUser)
  const post = useSelector(selectNewPost)

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const goBack = () => {
    navigation.goBack()
  }

  useEffect(() => {
    initiatePayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Screen preset="scroll">
      <Header title={t("checkout.title")} onLeftPress={goBack} leftIcon="back"></Header>
      <Body withBackGroundImage>
        <Text preset="header2">Choose payment method:</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            onPress={() => executePayment(method.PaymentMethodId)}
            key={method.PaymentMethodId}
            style={[ROW_NO_RTL, PAYMENT_ITEM]}
          >
            <Text>{I18nManager.isRTL ? method.PaymentMethodAr : method.PaymentMethodEn}</Text>
            <Image style={PAYMENT_ITEM_IMAGE} source={{ uri: method.ImageUrl }} />
          </TouchableOpacity>
        ))}
      </Body>
      <Modal visible={showErrorModal}>
        <PaymentFailScreen 
          error={errorMessage} 
          onDismiss={() => { 
            setShowErrorModal(false); 
            navigation.navigate(PostStack.checkout, { price: params.price });
          }} 
        />
      </Modal>
      <Modal visible={showSuccessModal}>
        <SuccessScreen onDismiss={() => setShowSuccessModal(false)} />
      </Modal>
    </Screen>
  )

  function initiatePayments() {
    try {
      const initiateRequest = new MFInitiatePayment(50, MFCurrencyISO.KUWAIT_KWD)

      MFPaymentRequest.sharedInstance.initiatePayment(
        initiateRequest, 
        MFLanguage.ENGLISH, 
        (response: Response) => {
          if (response.getError()) {
            console.error(response.getError());
          }
          else {
            setPaymentMethods(
              response.getPaymentMethods()?.filter((method) => !method.IsDirectPayment),
            )
          }
      });
    } catch (e) {
      console.error(e);
    }
  }

  function executePayment(paymentMethodId) {
    const request = executeResquestJson(paymentMethodId)
    MFPaymentRequest.sharedInstance.executePayment(
      navigation,
      request,
      MFLanguage.ENGLISH,
      (response: Response) => {
        navigation.navigate(AppStack.success);
        
        if (response.getError()) {
          const error =
            errorCodes[response.getData()?.InvoiceTransactions[0]?.ErrorCode] ||
            response.getError()?.error ||
            "Unknown error"
          
          setShowErrorModal(true);
          setErrorMessage(error);
        } else {
          dispatch(clearPostData());
          setShowSuccessModal(true);
        }
      },
    )
  }

  function executeResquestJson(paymentMethodId) {
    const request = new MFExecutePaymentRequest(
      parseFloat(params.price?.toString()),
      paymentMethodId,
    )
    request.customerEmail = user.email
    request.language = "en"
    request.customerReference = user.id
    request.displayCurrencyIso = MFCurrencyISO.KUWAIT_KWD
    request.userDefinedField = post.id
    return request
  }
}
