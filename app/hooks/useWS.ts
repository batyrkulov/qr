const wsUrl = `ws://app.q8rider.biz/ws?jwt=`

class WS {
  static instance: WS
  ws: WebSocket
  token: string
  messageListeners: { event: string; handlers: ((ev: MessageEvent) => any)[] }[] = []
  constructor(token?: string) {
    if (typeof WS.instance === "object") {
      return WS.instance
    }
    if (token) {
      this.token = token
    }

    WS.instance = this
    return WS.instance
  }

  connect() {
    if (this.token) {
      this.ws = new WebSocket(wsUrl + this.token)
      this.ws.onmessage = (e) => {
        const data = JSON.parse(e.data)
        const listener = this.messageListeners.find((l) => l.event === data.event)
        if (listener) {
          listener.handlers.forEach((handler) => {
            handler(e)
          })
        }
      }
    }
  }

  disconnect() {
    this.ws.close()
    this.ws = undefined
    WS.instance = undefined
  }

  onconnect(handler: (this: WebSocket, ev: Event) => any) {
    if (this.ws) {
      this.ws.onopen = handler
      this.ws.onerror = (err) => console.log(err)
    }
  }

  send(event: string, data) {
    this.ws.send(
      JSON.stringify({
        event: event,
        data: {
          jwt: this.token,
          ...data,
        },
      }),
    )
  }

  onmessage(event: string, handler) {
    const listener = this.messageListeners.find((listener) => event === listener.event)
    if (listener) {
      listener.handlers.push(handler)
    } else {
      this.messageListeners.push({ event, handlers: [handler] })
    }
  }
}

export const useWS = (token?: string) => {
  const wsController = new WS(token)
  return wsController
}
