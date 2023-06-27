export class Particle {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | null;
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private canvasWidth: number;
  private canvasHeight: number;
  private color: string;

  constructor(mouseX: number, mouseY: number, canvas: HTMLCanvasElement) {
    this.width = randomNumberGenerator(0.1, 0.9) * 5;
    this.height = randomNumberGenerator(0.1, 0.9) * 5;
    this.x = mouseX - this.width / 2;
    this.y = mouseY - this.height / 2;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.color = `rgb( ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(0, 255)}, ${randomNumberGenerator(
      0,
      255,
    )}`;
    this.context = this.canvas.getContext('2d');
    this.setVelocity();
  }

  move() {
    if (this.x >= this.canvasWidth || this.y >= this.canvasHeight) {
      return false;
    }
    return true;
  }

  draw() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += particleSettings.gravity;

    if (this.context) {
      this.context.save();
      this.context.beginPath();
      this.context.translate(this.x, this.y);
      this.context.arc(0, 0, this.width, 0, Math.PI * 2);
      this.context.fillStyle = this.color;
      this.context.closePath();
      this.context.fill();
      this.context.restore();
    }
  }

  setVelocity() {
    const vy = Math.sqrt(25 - this.vx * this.vx);
    if (Math.abs(this.vy) > vy) {
      this.vy = this.vy > 0 ? vy : -vy;
    }
  }
}

const randomNumberGenerator = (min: number, max: number) => Math.random() * (max - min) + min;

const particleSettings = {
  gravity: 0.05,
};
