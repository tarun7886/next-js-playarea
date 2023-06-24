import { message } from "antd"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client";

let currentIO = null

const useSocket = () => {
  const [mainRef, setRef] = useState({current: null})
  const socketRef = useRef(null);
  useEffect(() => socketInitializer(), [])
  const socketInitializer = async () => {
    if (currentIO) {
      socketRef.current = currentIO
      setRef(socketRef)
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
      setRef(socketRef)
    }
    // socketRef.current.on("message", (mes)=> {
    //   console.log(mes)
    // })
  
    // socketRef.current.on('update-input', msg => {
    //   setInput(msg)
    // })
  }
  return [mainRef]
}

export default useSocket