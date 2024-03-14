import { Button, message } from "antd"
import React, { useEffect } from "react";
import styled from "styled-components";

const AnimateArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    // background-color: red;
    z-index: 1;
    opacity: 0.5;
  }
  .cursor {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    z-index: 2;
  }
`;

const AnimateCursor = (props) => {
  const canvasRef = React.useRef(null);
  const mousePositions = React.useRef([]);
  useEffect(() => {
    // mousemoveHandler();
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    window.addEventListener("mousemove", mousemoveHandler);
    return () => {
      window.removeEventListener("mousemove", mousemoveHandler);
    };
  }, []);
  var prevX, prevY
  var timeoutId
  const mousemoveHandler = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const [x, y] = [e.clientX, e.clientY];
    
    // Store the mouse position
    mousePositions.current.push({ x, y });
    
    // Limit the number of stored positions
    if (mousePositions.current.length > 50) {
      mousePositions.current.shift();
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw trail
    ctx.beginPath();
    ctx.moveTo(mousePositions.current[0].x, mousePositions.current[0].y);
    for (let i = 1; i < mousePositions.current.length; i++) {
      const { x, y } = mousePositions.current[i];
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.stroke();
    
    // Reset the timeout
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      let lodu = setInterval(() => {
        if (mousePositions.current.length > 1) {
          mousePositions.current.shift();
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.moveTo(mousePositions.current[0].x, mousePositions.current[0].y);
          for (let i = 1; i < mousePositions.current.length; i++) {
            const { x, y } = mousePositions.current[i];
            ctx.lineTo(x, y);
          }
        } else {
          clearInterval(lodu);
        }
      }, 50);
      // mousePositions.current = [];
    }, 200); // Adjust this duration as needed
  };


  const mousemoveHandler55 = (e) => {
    console.log(e);
    const canvas = canvasRef.current
    // const cursor = document.querySelector(".cursor");
    const ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#fff";
    ctx.globalCompositeOperation="source-over";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 6;
    ctx.lineHeight = 6;
    ctx.lineCap = "round";
    // ctx.save();
    // ctx.translate(e.clientX, e.clientY);
    ctx.beginPath()
    if (prevX && prevY) {
      ctx.moveTo(prevX, prevY)
    } else {
      ctx.moveTo(e.clientX, e.clientY)
    }
    ctx.lineTo(e.clientX, e.clientY)
    ctx.stroke()
    setTimeout(() => {
      clearMousePath(prevX, prevY, e.clientX, e.clientY)
    }, 200);

    prevX = e.clientX
    prevY = e.clientY

    // ctx.clearRect(0, 0, canvas.width, canvas.height

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.beginPath();
    // ctx.arc(e.clientX, e.clientY, 50, 0, 2 * Math.PI);
    
    // ctx.fill();
    // cursor.style.left = e.clientX + "px";
    // cursor.style.top = e.clientY + "px";
  };

  const clearMousePath = (ppX, ppY, x, y) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d");
    // ctx.clearPath(prevX, prevY, x, y)
    ctx.globalCompositeOperation="destination-out";
    ctx.lineWidth = 8;
    ctx.lineHeight = 8;
    // ctx.lineCap = "round";
    ctx.moveTo(ppX, ppY)
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.fill()
  }

  return (
    <AnimateArea>
      <canvas ref={canvasRef} width="100" height="100"></canvas>
      <Button onClick={() => message.success("Clicked ")} >Hello</Button>
      <Button onClick={() => message.success("Clicked ")} >Random</Button>
      <Button onClick={() => message.success("Clicked ")} >Hello</Button>
      <Button onClick={() => message.success("Clicked ")} >Hello</Button>
      <Button onClick={() => message.success("Clicked ")} >Hello</Button>
    </AnimateArea>
  );
};

export default AnimateCursor;