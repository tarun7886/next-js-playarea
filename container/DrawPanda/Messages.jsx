import { Input, Form, Button, Row, Col } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';

const Messages = ({socketRef, roomId, user}) => {
  const [messages, setMessages] = useState([])
  const [form] = Form.useForm()
  const messageRef = useRef(null)
  const inputRef = useRef(null)
  const updateMessage = (value) => {
    const copy = JSON.parse(JSON.stringify(messages))
    copy.push(value)
    setMessages(copy)
  }
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("new-message", updateMessage)
    }
  }, [messages, socketRef.current])
  useEffect(() => {
    if (messages.length) {
      const messagesContainer = ReactDOM.findDOMNode(messageRef.current);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (values) => {
    updateMessage({...values, roomId, user})
    socketRef.current.emit("send-message", {...values, roomId, user})
    form.resetFields()
    inputRef.current.focus()
  }
  return (
    <div className='message-container' id="message-container">
      <div className='message-scroller' ref={messageRef}>
        {
          messages.map((el, key) => {
            return <Row key={key} className='message-row' gutter={12}>
              <Col span={6}>
                <strong>{el.user}: </strong>
              </Col>
              <Col span={18}>
                <div className='message-body' key={key}>{el.message}</div>
              </Col>
            </Row>
          })
        }
      </div>
      <Form
        onFinish={sendMessage}
        form={form}
      >
        <Form.Item name="message" rules={[{required: true, whitespace: false}]}>
          <Input ref={inputRef} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Messages

// // Connect to the server using socket.io
// const socket = io();

// // Get the input element and the submit button
// const input = document.querySelector('#word-input');
// const submitBtn = document.querySelector('#submit-btn');

// // Get the messages container element
// const messagesContainer = document.querySelector('#messages-container');

// // Define the room name
// const room = 'myRoom';

// // Define the color classes
// const colors = ['red', 'green', 'blue', 'purple', 'orange', 'pink'];

// // Define the messages array
// const messages = [];

// // Listen for the submit button click event
// submitBtn.addEventListener('click', () => {

//   // Get the value of the input element
//   const word = input.value.trim();

//   // Emit the "check word" event with the word value and the room name
//   socket.emit('check word', { word, room });

//   // Clear the input element value
//   input.value = '';

// });

// // Listen for the "correct" event from the server
// socket.on('correct', ({ message }) => {
  
//   // Add the message to the messages array
//   messages.push({ message, color: 'green' });

//   // Update the messages container
//   updateMessagesContainer();

// });

// // Listen for the "incorrect" event from the server
// socket.on('incorrect', ({ message }) => {

//   // Add the message to the messages array
//   messages.push({ message, color: 'red' });

//   // Update the messages container
//   updateMessagesContainer();

// });

// // Function to update the messages container
// function updateMessagesContainer() {

//   // Clear the messages container
//   messagesContainer.innerHTML = '';

//   // Loop through the messages array and add each message to the messages container
//   messages.forEach(({ message, color }, index) => {
//     const messageElement = document.createElement('div');
//     messageElement.textContent = message;
//     messageElement.classList.add('message', color);
//     if (index === messages.length - 1) {
//       messageElement.classList.add('last');
//     }
//     messagesContainer.appendChild(messageElement);
//   });

//   // Scroll to the bottom of the messages container
//   messagesContainer.scrollTop = messagesContainer.scrollHeight;

// }
