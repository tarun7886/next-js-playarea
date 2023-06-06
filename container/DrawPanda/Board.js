import React, { useRef, useEffect } from "react";

const Board = ({roomId, drawing, socketRef}) => {
    const canvasRef = useRef(null);
    let isDrawing =false;
    let lastX =0;
    let lastY =0;
    useEffect(() => {
        if (!socketRef.current) {
            return () => {}
        }
        function getTouches(evt) {
            return evt.touches || // browser API
                evt.originalEvent.touches; // jQuery
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        function handlePointerDown(e) {
            console.log(e);
          isDrawing = true
          lastX = e.clientX - canvas.offsetLeft;
          lastY = e.clientY - canvas.offsetTop;
        }
        function handleTouchStart(e) {
          const touch = e.touches[0];
          isDrawing = true;
          lastX = touch.clientX - canvas.offsetLeft;
          lastY = touch.clientY - canvas.offsetTop;
        }
        function handleTouchMove(e) {
          e.preventDefault();
          const touch = e.touches[0];
          const x = touch.clientX - canvas.offsetLeft;
          const y = touch.clientY - canvas.offsetTop;
    
          drawLine(ctx, lastX, lastY, x, y);
          sendDrawingData(lastX, lastY, x, y);
    
          lastX = x;
          lastY = y;
        }
        function handleTouchEnd() {
          isDrawing = false;
        }
        function drawLine(context, x1, y1, x2, y2) {
          context.strokeStyle = 'black';
          context.lineWidth = 5;
          context.beginPath();
          context.moveTo(x1, y1);
          context.lineTo(x2, y2);
          context.stroke();
        }
    
    
        function handlePointerMove(e) {
          if (isDrawing) {
            const x = e.clientX - canvas.offsetLeft;
            const y = e.clientY - canvas.offsetTop;
    
            drawLine(ctx, lastX, lastY, x, y);
            sendDrawingData(lastX, lastY, x, y);
    
            lastX = x;
            lastY = y;
          }
        }
        function handleDrawingData(data) {
            console.log(data);
          const { startX, startY, endX, endY } = data;
          drawLine(ctx, startX, startY, endX, endY);
        }
    
        function sendDrawingData(startX, startY, endX, endY) {
            console.log("sending");
          socketRef.current.emit('drawingData', {roomId, data: {
            startX,
            startY,
            endX,
            endY,
          }});
        }
    
        function handlePointerUp() {
          isDrawing = false;
        }
    
        canvas.addEventListener("pointerdown" , handlePointerDown, false);
        canvas.addEventListener('pointermove', handlePointerMove, false);
        canvas.addEventListener('pointerup', handlePointerUp, false);
        canvas.addEventListener("pointerout", handlePointerUp, false);
        canvas.addEventListener("pointerleave", handlePointerUp, false);
    
        canvas.addEventListener('touchstart', handleTouchStart, false);
        canvas.addEventListener('touchmove', handleTouchMove, false);
        canvas.addEventListener('touchend', handleTouchEnd, false);
        canvas.addEventListener('touchcancel', handleTouchEnd, false);
        socketRef.current.on('drawingData', handleDrawingData);
    
    
        return () => {
          canvas.removeEventListener('pointerdown', handlePointerDown);
          canvas.removeEventListener('pointermove', handlePointerMove);
          canvas.removeEventListener('pointerup', handlePointerUp);
    
          canvas.removeEventListener('touchstart', handleTouchStart);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
          socketRef.current.off('drawingData', handleDrawingData);
        };
      }, [socketRef.current]);

    return <div className="draw-panda-board">
        <canvas ref={canvasRef} width={200} height={200} />
    </div>
}

export default Board