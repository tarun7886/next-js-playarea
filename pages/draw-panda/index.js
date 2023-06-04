import React, {useEffect, useState} from "react";
import { handleRoomRequest } from "../../actions/drawPanda"
import RoomForm from "../../container/DrawPanda/RoomForm"
import { useRouter } from 'next/router'
import useSocket from "../../hooks/useSocket"
import DrawPandaContainer from '../../container/DrawPanda'

const DrawPanda = () => {
  const [roomId, setRoomId] = useState(undefined)
  const [user, setUser] = useState(undefined)
  const [admin, setAdmin] = useState(undefined)
  const [socketRef] = useSocket()

  const handleSubmit = async (values) => {
    if (values.action_type === 'create') {
      socketRef.current.emit("create-room", values)
      socketRef.current.on("room-created", (data) => {
        setRoomId(data.roomId)
        setUser(data.user)
        setAdmin(data.admin)
      })
    } else {
      socketRef.current.emit("join-room", values)
      socketRef.current.on("joined-room", (data) => {
        setRoomId(data.roomId)
        setAdmin(data.admin)
        setUser(data.user)
      })
    }
  }
  if (!roomId) {
    return <RoomForm
      onSubmit={handleSubmit}
    />
  }
  return <DrawPandaContainer
    roomId={roomId}
    user={user}
    admin={admin}
  />
}

export default DrawPanda