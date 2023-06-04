import React, { useState } from "react"
import { Button, Card, Form, Input, Radio } from "antd"

const RoomForm = ({ onSubmit }) => {
	const [form] = Form.useForm()
	const [action, setAction] = useState("create")

	return (
		<Card>
			<Form onFinish={onSubmit}>
				<Form.Item name={"user"} label="Username">
					<Input />
				</Form.Item>
				<Form.Item
					name={"action_type"}
					label="Select"
					rules={[{ required: true }]}>
					<Radio.Group
						onChange={(e) => setAction(e.target.value)}
						options={[
							{ value: "join", label: "Join Room" },
							{ value: "create", label: "Create Room" },
						]}
					/>
				</Form.Item>
				{action === "join" ? (
					<Form.Item
						name={"roomId"}
						label="Room ID"
						rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				) : null}
				<Button htmlType="submit">Submit</Button>
			</Form>
		</Card>
	)
}
export default RoomForm
