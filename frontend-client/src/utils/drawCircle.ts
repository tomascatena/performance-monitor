const drawCircle = (canvas: HTMLCanvasElement | null, currentLoad: number) => {
  if (canvas) {
    const context = canvas.getContext(`2d`);

    if (context) {
      // Inner circle
      context.clearRect(0, 0, 300, 300);
      context.fillStyle = `rgb(0, 0, 0)`;
      context.beginPath();
      context.arc(150, 150, 140, 0, 2 * Math.PI);
      context.closePath();
      context.fill();

      // Outer circle
      context.lineWidth = 10;

      if (currentLoad < 20) {
        context.strokeStyle = `rgb(0, 255, 0)`;
      } else if (currentLoad < 40) {
        context.strokeStyle = `rgb(125, 255, 0)`;
      } else if (currentLoad < 60) {
        context.strokeStyle = `rgb(255, 255, 0)`;
      } else if (currentLoad < 80) {
        context.strokeStyle = `rgb(255, 125, 0)`;
      } else {
        context.strokeStyle = `rgb(255, 0, 0)`;
      }

      context.beginPath();
      context.arc(150, 150, 135, -Math.PI / 2, ((2 * Math.PI * currentLoad) / 100) - Math.PI / 2);
      context.stroke();
      context.closePath();
    }
  }
};

export default drawCircle;
