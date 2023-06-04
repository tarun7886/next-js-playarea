import { message } from 'antd'
import API from '../services/api'

export const handleRoomRequest = (data) => {
  return API.post("/room", data).then(res => {
    if (res.error) {
      message.error(res.message)
      return false
    }
    return res
  })
}

export const getRoomData = (roomId) => {
  return API.get("/room/" + roomId).then(res => {
    if (res.error) {
      message.error(res.message)
      return false
    }
    return res
  })
}