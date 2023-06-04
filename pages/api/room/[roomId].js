import { rooms } from "./index";

export default function handler(req, res) {
  const { roomId } = req.query;

  // Fetch data for the room here, e.g. from a database
  let room = rooms.find(el => el.roomId === roomId) 
  if (!room) {
    return res.send({error: true, message: "Room doesn't exist"})
  }
  if (room.gameStarted) {
    return res.send({error: true, message: "Game started, please wait for it to end."})
  }

  // Return the data as JSON
  res.status(200).json({success: true});
}