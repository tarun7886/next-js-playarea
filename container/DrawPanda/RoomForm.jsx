import React, { useState } from "react"
import { Button, Card, Form, Input, Radio, Row , Col} from "antd"

const RoomForm = ({ onSubmit }) => {
	const [form] = Form.useForm()
	const [action, setAction] = useState("create")

	return (
		<Row justify={"center"} gutter={16}>
			<Col xs={24} sm={24} md={12} lg={12} xl={12}>
				<Card>
				<Form onFinish={onSubmit} validateMessages={{
					required: "${label} is required"
				}} >
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
			</Col>
		</Row>
		
	)
}
export default RoomForm
