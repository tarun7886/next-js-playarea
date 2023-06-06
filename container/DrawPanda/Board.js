import { Button } from "antd"
import React, { useRef, useEffect, useState } from "react";
import { isMobileBrowser } from "../../services/utils";

const Board = ({roomId, drawing, socketRef}) => {
    const canvasRef = useRef(null);
    const [isMobile, setIsMobile] = useState(true)
    const [dimensions, setDimensions] = useState({
      height: 100,
      width: 100
    })
    useEffect(() => {
      function dim(){
        let el = document.getElementById("panda_board")
        const width = el.clientWidth
        const height = el.clientHeight
        let temp = {width: Math.min(width, height), height: Math.min(width, height)}
        if (dimensions.height !== temp.height || dimensions.width !== temp.width) {
          canvasRef.current.style.height = `${temp.height}px`
          canvasRef.current.style.width = `${temp.width}px`
          setDimensions(temp)
        }
      }
      setIsMobile(isMobileBrowser())
      dim()
      window.addEventListener("resize", dim)
      return () => window.removeEventListener("resize", dim)
    }, [])

    let isDrawing =false;
    let lastX =0;
    let lastY =0;

    const getPointOnCanvas = (e) => {
      if (e instanceof PointerEvent) {
        return {x: e.offsetX, y: e.offsetY}
      } else if (e instanceof TouchEvent) {
        debugger
        const touch = e.touches[0];
        let offsetLeft = document.getElementById("panda_board").offsetLeft + canvasRef.current.offsetLeft 
        let offsetTop = document.getElementById("panda_board").offsetTop + canvasRef.current.offsetTop 
        return {x: touch.clientX - offsetLeft, y: touch.clientY - offsetTop}
      }
    }

    const clearCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    }

    useEffect(() => {
      if (!socketRef.current) {
        return () => {}
      }
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const {height, width} = dimensions

      function drawLine(context, x1, y1, x2, y2) {
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(x1 * width , y1 * height);
        context.lineTo(x2 * width, y2 * height);
        context.stroke();
      }

      function handleDrawingData(data) {
        const { startX, startY, endX, endY } = data;
        console.log(data);
        drawLine(ctx, startX, startY, endX, endY);
      }
      function sendDrawingData(startX, startY, endX, endY) {
        socketRef.current.emit('drawingData', {roomId, data: {
          startX,
          startY,
          endX,
          endY,
        }});
      }

      function handleStart(e) {
        isDrawing = true
        lastX = getPointOnCanvas(e).x
        lastY = getPointOnCanvas(e).y
      }
      function handleMove(e){
        if (!isDrawing) return
        const x = getPointOnCanvas(e).x
        const y = getPointOnCanvas(e).y

        drawLine(ctx, lastX / width, lastY / height, x / width, y / height);
        sendDrawingData(lastX / width, lastY / height, x / width, y/ height);
        lastX = x
        lastY = y
      }
      function handleEnd(e){
        isDrawing = false
      }
      if (!isMobile) {
        canvas.addEventListener("pointerdown" , handleStart, false);
        canvas.addEventListener('pointermove', handleMove, false);
        canvas.addEventListener('pointerup', handleEnd, false);
        canvas.addEventListener("pointerout", handleEnd, false);
        canvas.addEventListener("pointerleave", handleEnd, false);
        canvas.addEventListener("pointercancel", handleEnd, false);
      } else {
        canvas.addEventListener('touchstart', handleStart, false);
        canvas.addEventListener('touchmove', handleMove, false);
        canvas.addEventListener('touchend', handleEnd, false);
        canvas.addEventListener('touchcancel', handleEnd, false);
      }
  
      socketRef.current.on('drawingData', handleDrawingData);
      socketRef.current.on('clearCanvas', clearCanvas);

      return () => {
        if (!isMobile) {
          canvas.removeEventListener('pointerdown', handleStart);
          canvas.removeEventListener('pointermove', handleMove);
          canvas.removeEventListener('pointerup', handleEnd);
        } else {
          canvas.removeEventListener('touchstart', handleStart);
          canvas.removeEventListener('touchmove', handleMove);
          canvas.removeEventListener('touchend', handleEnd);
        }
          
          socketRef.current.off('drawingData', handleDrawingData);
          socketRef.current.off('clearCanvas', clearCanvas);
        };

    }, [isMobile, dimensions, socketRef.current])

    return <div id="panda_board" className="draw-panda-board">
        <canvas id="my_canvas" ref={canvasRef} width={dimensions.width} height={dimensions.height} />
        <Button className="clear_canvas" onClick={() => {
          socketRef.current.emit("clearCanvas", {roomId})
          clearCanvas()
        }}>Clear Canvas</Button>
    </div>
}

export default Board