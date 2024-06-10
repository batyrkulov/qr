/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-inline-styles */

import React from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { Radio } from ".."

export default function KNetForm({ paymentMethods, selectedPaymentId, setSelectedPaymentId }) {
  return (
    <View>
      <View style={[styles.welcome, { marginBottom: 0, flexDirection: "row" }]}>
        <Text style={{ fontWeight: "800", fontSize: 15, width: "100%" }}>
          Please Select Payment Method:
        </Text>
      </View>

      {paymentMethodsList()}
    </View>
  )

  function paymentMethodsList() {
    return (
      <View style={styles.welcome}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={paymentMethods}
          contentContainerStyle={{ justifyContent: "center" }}
          renderItem={({ item: rowData }) => {
            return (
              <TouchableOpacity
                style={{ padding: 10 }} // adjust the styles to suit your needs
              >
                <Radio
                  options={{ label: rowData.PaymentMethodEn, value: rowData.PaymentMethodId }}
                  onPress={(v) => setSelectedPaymentId(v)}
                  isActive={selectedPaymentId === rowData.PaymentMethodId}
                />
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: "center",
  },
})
