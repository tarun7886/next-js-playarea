import { message } from "antd"
import { useEffect, useRef } from "react"
import { io } from "socket.io-client";

let currentIO = null

const useSocket = () => {
  const socketRef = useRef(null);
  useEffect(() => socketInitializer(), [])
  const socketInitializer = async () => {
    if (currentIO) {
      socketRef.current = currentIO
    } else {
      await fetch('/api/socket');
      currentIO = io()
      socketRef.current = currentIO
    
      socketRef.current.on('connect', () => {
        console.log('connected')
      })
      socketRef.current.on('disconnect', () => {
        console.log('disconnect')
      })
      socketRef.current.on("error_message", value => {
        message.error(value.message)
      })
    }
    // socketRef.current.on("message", (mes)=> {
    //   console.log(mes)
    // })
  
    // socketRef.current.on('update-input', msg => {
    //   setInput(msg)
    // })
  }
  return [socketRef]
}

export default useSocket