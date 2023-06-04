import { rooms } from "../data/room"
import { generateRandomString } from "../services/utils"

export const joinRoom = (data) => {
	let roomId = data.roomId
	let user = data.user
	let room = rooms.find((el) => el.roomId === roomId)
	if (!room) {
		return { error: true, message: "Room not found" }
	}
	if (room.users.includes(user)) {
		return { error: true, message: "User name already registerd in this room" }
	}
	room.users.push(user)
	return { roomId, user, admin: room.admin }
}

export const createRoom = (data) => {
	let roomId = generateRandomString(6)
	while (rooms.find((el) => el.roomId === roomId)) {
		roomId = generateRandomString(6)
	}
	let admin = data.user
	rooms.push({ roomId, admin, users: [admin] })
	return { roomId, admin, user: admin }
}
