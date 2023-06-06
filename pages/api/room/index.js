import { generateRandomString, generateRoomId } from "../../../services/utils"

export const rooms = [] // this is a changing array

export default (req, res) => {
  let body = req.body
  if (req.method === "GET") {
    res.send({rooms})
  } if (req.method === "POST") {
    if (body.action_type === "create") {
      let roomId = generateRoomId(6)
      while (rooms.find(el => el.roomId === roomId)) {
        roomId = generateRoomId(6)
      }
      let admin = body.name
      rooms.push({roomId, admin, users: [admin]})
      res.send({roomId})
    } else {
      
    }
  }
}