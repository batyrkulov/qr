export const errorCodes = {
  MF001:
    "3DS authentication failed, possible reasons (user inserted a wrong password, cardholder/card issuer are not enrolled with 3DS, or the issuer bank has technical issue).",
  MF002:
    "The issuer bank has declined the transaction, possible reasons (invalid card details, insufficient funds, denied by risk, the card is expired/held, or card is not enabled for online purchase).",
  MF003:
    "The transaction has been blocked from the gateway, possible reasons (unsupported card BIN, fraud detection, or security blocking rules).",
  MF004: "Insufficient funds",
  MF005: "Session timeout",
  MF006: "Transaction canceled",
  MF007: "The card is expired",
  MF008: "The card issuer doesn't respond",
  MF009: "Denied by Risk",
  MF010: "Wrong Security Code",
  MF020: "Unspecified Failure",
}
