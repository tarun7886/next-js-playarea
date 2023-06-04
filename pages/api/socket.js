import { Server } from "socket.io"
import { createRoom, joinRoom } from "../../controller/socket"

const users = []

const addUser = ({ id, name, room }) => {
	name = name.trim().toLowerCase()
	room = room.trim().toLowerCase()

	const existingUser = users.find((user) => {
		user.room === room && user.name === name
	})

	if (existingUser) {
		return { error: "Username is taken" }
	}
	const user = { id, name, room }

	users.push(user)
	return { user }
}

const removeUser = (id) => {
	const index = users.findIndex((user) => {
		user.id === id
	})

	if (index !== -1) {
		return users.splice(index, 1)[0]
	}
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

const SocketHandler = (req, res) => {
	if (res.socket.server.io) {
		console.log("Socket is already running")
	} else {
		console.log("Socket is initializing")
		const io = new Server(res.socket.server)
		res.socket.server.io = io
		io.on("connection", (socket) => {
			socket.on("create-room", (data) => {
				let res = createRoom(data)
				console.log(res);
				socket.emit("room-created", res)
				socket.join(res.roomId)
			})
			socket.on("join-room", (data) => {
				console.log(data);
				let res = joinRoom(data)
				if (res.error) {
					console.log(res);
					socket.emit("error_message", res)
				} else {
					socket.emit("joined-room", res)
					socket.broadcast.to(res.roomId).emit("user-joined", res)
					socket.join(res.roomId)
				}
			})
			socket.on("send-message", data => {
				socket.broadcast.to(data.roomId).emit("receive-message", data)
			})

			socket.on("join-room1", ({ room, name }, callback) => {
				const { error, user } = addUser({ id: socket.id, name, room })

				if (error) {
					console.log(error)
					return callback(error)
				}

				// Emit will send message to the user
				// who had joined
				socket.emit("message", {
					user: "admin",
					text: `${user.name},
            welcome to room ${user.room}.`,
				})

				// Broadcast will send message to everyone
				// in the room except the joined user
				socket.broadcast
					.to(user.room)
					.emit("message", { user: "admin", text: `${user.name}, has joined` })

				socket.join(user.room)

				io.to(user.room).emit("roomData", {
					room: user.room,
					users: getUsersInRoom(user.room),
				})
				callback()
			})
			// Listen for the "game started" event from the client
			socket.on("game-started", ({ room }) => {
				// Broadcast the "game started" event to all other connections in the room
				socket.to(room).emit("game-started")
			})

			// const offset = socket.handshake.auth.offset
			// console.log(offset)
			// socket.onAny((event, ...args) => {
			// 	socket.broadcast.emit(event, ...args)
			// 	console.log(event, args)
			// })
			// socket.on("input-change", (msg) => {
			// 	socket.broadcast.emit("update-input", msg)
			// })
		})
	}

	res.end()
}

export default SocketHandler
