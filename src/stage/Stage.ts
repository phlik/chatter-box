import { Application, Graphics, Container } from 'pixi.js';

export class Stage {
  app: Application;
  sceneContainer: Container;

  constructor() {
    this.app = new Application();
    this.sceneContainer = new Container();
  }

  async init() {
    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1a0a2e,
      resizeTo: window,
    });

    document.body.appendChild(this.app.canvas);

    this.drawBackdrop();
    this.drawCurtains();
    this.drawFloor();

    this.app.stage.addChild(this.sceneContainer);
  }

  private drawBackdrop() {
    const bg = new Graphics();
    // Sky gradient effect via layered rects
    bg.rect(0, 0, window.innerWidth, window.innerHeight * 0.75);
    bg.fill(0x1a0a2e);

    const moon = new Graphics();
    moon.circle(window.innerWidth * 0.8, window.innerHeight * 0.15, 40);
    moon.fill(0xfffde7);

    this.app.stage.addChild(bg);
    this.app.stage.addChild(moon);
  }

  private drawCurtains() {
    const curtainWidth = window.innerWidth * 0.12;
    const curtainHeight = window.innerHeight * 0.85;

    // Left curtain
    const left = new Graphics();
    left.rect(0, 0, curtainWidth, curtainHeight);
    left.fill(0x8b0000);
    left.x = 0;
    left.y = 0;

    // Right curtain
    const right = new Graphics();
    right.rect(0, 0, curtainWidth, curtainHeight);
    right.fill(0x8b0000);
    right.x = window.innerWidth - curtainWidth;
    right.y = 0;

    // Top valance
    const valance = new Graphics();
    valance.rect(0, 0, window.innerWidth, 60);
    valance.fill(0x6b0000);

    this.app.stage.addChild(left);
    this.app.stage.addChild(right);
    this.app.stage.addChild(valance);
  }

  private drawFloor() {
    const floor = new Graphics();
    const floorY = window.innerHeight * 0.75;
    floor.rect(0, floorY, window.innerWidth, window.innerHeight - floorY);
    floor.fill(0x3e2723);

    // Stage edge highlight
    const edge = new Graphics();
    edge.rect(0, floorY, window.innerWidth, 6);
    edge.fill(0x8d6e63);

    this.app.stage.addChild(floor);
    this.app.stage.addChild(edge);
  }

  get stageFloorY() {
    return window.innerHeight * 0.75;
  }

  get centerX() {
    return window.innerWidth / 2;
  }
}
