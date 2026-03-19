import { Container, Graphics } from 'pixi.js';
import { gsap } from 'gsap';

export class Puppet {
  container: Container;
  private body: Graphics;
  private head: Graphics;
  private leftArm: Container;
  private rightArm: Container;
  private leftLeg: Container;
  private rightLeg: Container;
  private mouth: Graphics;
  private leftEye: Graphics;
  private rightEye: Graphics;

  private isWalking = false;
  private isTalking = false;
  private talkTween: gsap.core.Tween | null = null;

  private skinColor: number;
  private pantsColor: number;

  constructor(skinColor = 0xf4a261, pantsColor = 0x457b9d) {
    this.skinColor = skinColor;
    this.pantsColor = pantsColor;
    this.container = new Container();

    this.body = new Graphics();
    this.head = new Graphics();
    this.mouth = new Graphics();
    this.leftEye = new Graphics();
    this.rightEye = new Graphics();
    this.leftArm = new Container();
    this.rightArm = new Container();
    this.leftLeg = new Container();
    this.rightLeg = new Container();

    this.build();
  }

  private build() {
    const color = this.skinColor;
    const outline = 0x333333;

    // Body
    this.body.roundRect(-25, -60, 50, 70, 8);
    this.body.fill(color);
    this.body.roundRect(-25, -60, 50, 70, 8);
    this.body.stroke({ color: outline, width: 2 });

    // Head
    this.head.circle(0, -90, 30);
    this.head.fill(color);
    this.head.circle(0, -90, 30);
    this.head.stroke({ color: outline, width: 2 });

    // Eyes
    this.leftEye.circle(-10, -95, 5);
    this.leftEye.fill(0x333333);
    this.rightEye.circle(10, -95, 5);
    this.rightEye.fill(0x333333);

    // Mouth (closed)
    this.mouth.roundRect(-10, -78, 20, 6, 3);
    this.mouth.fill(0x333333);

    // Left arm
    const la = new Graphics();
    la.roundRect(0, 0, 10, 45, 5);
    la.fill(color);
    la.roundRect(0, 0, 10, 45, 5);
    la.stroke({ color: outline, width: 2 });
    this.leftArm.addChild(la);
    this.leftArm.pivot.set(5, 0);
    this.leftArm.position.set(-30, -55);
    this.leftArm.rotation = 0.2;

    // Right arm
    const ra = new Graphics();
    ra.roundRect(0, 0, 10, 45, 5);
    ra.fill(color);
    ra.roundRect(0, 0, 10, 45, 5);
    ra.stroke({ color: outline, width: 2 });
    this.rightArm.addChild(ra);
    this.rightArm.pivot.set(5, 0);
    this.rightArm.position.set(20, -55);
    this.rightArm.rotation = -0.2;

    // Left leg
    const ll = new Graphics();
    ll.roundRect(0, 0, 14, 50, 5);
    ll.fill(this.pantsColor);
    ll.roundRect(0, 0, 14, 50, 5);
    ll.stroke({ color: outline, width: 2 });
    this.leftLeg.addChild(ll);
    this.leftLeg.pivot.set(7, 0);
    this.leftLeg.position.set(-12, 8);

    // Right leg
    const rl = new Graphics();
    rl.roundRect(0, 0, 14, 50, 5);
    rl.fill(0x457b9d);
    rl.roundRect(0, 0, 14, 50, 5);
    rl.stroke({ color: outline, width: 2 });
    this.rightLeg.addChild(rl);
    this.rightLeg.pivot.set(7, 0);
    this.rightLeg.position.set(12, 8);

    this.container.addChild(this.body);
    this.container.addChild(this.leftArm);
    this.container.addChild(this.rightArm);
    this.container.addChild(this.leftLeg);
    this.container.addChild(this.rightLeg);
    this.container.addChild(this.head);
    this.container.addChild(this.leftEye);
    this.container.addChild(this.rightEye);
    this.container.addChild(this.mouth);
  }

  startWalking(direction: 1 | -1) {
    if (this.isWalking) return;
    this.isWalking = true;
    this.container.scale.x = direction;

    gsap.to(this.leftLeg, { rotation: 0.5, duration: 0.2, repeat: -1, yoyo: true });
    gsap.to(this.rightLeg, { rotation: -0.5, duration: 0.2, repeat: -1, yoyo: true, delay: 0.1 });
    gsap.to(this.leftArm, { rotation: -0.5, duration: 0.2, repeat: -1, yoyo: true, delay: 0.1 });
    gsap.to(this.rightArm, { rotation: 0.5, duration: 0.2, repeat: -1, yoyo: true });

    // Subtle body bob
    gsap.to(this.container, { y: this.container.y - 4, duration: 0.15, repeat: -1, yoyo: true });
  }

  stopWalking() {
    if (!this.isWalking) return;
    this.isWalking = false;
    gsap.killTweensOf(this.leftLeg);
    gsap.killTweensOf(this.rightLeg);
    gsap.killTweensOf(this.leftArm);
    gsap.killTweensOf(this.rightArm);
    gsap.killTweensOf(this.container);

    gsap.to([this.leftLeg, this.rightLeg, this.leftArm, this.rightArm], { rotation: 0, duration: 0.15 });
  }

  startTalking() {
    if (this.isTalking) return;
    this.isTalking = true;
    this.talkTween = gsap.to(this.mouth, {
      pixi: { scaleY: 2.5 },
      duration: 0.12,
      repeat: -1,
      yoyo: true,
    });
  }

  stopTalking() {
    if (!this.isTalking) return;
    this.isTalking = false;
    this.talkTween?.kill();
    gsap.to(this.mouth, { pixi: { scaleY: 1 }, duration: 0.1 });
  }

  wave() {
    gsap.to(this.rightArm, {
      rotation: -1.2,
      duration: 0.15,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        gsap.to(this.rightArm, { rotation: -0.2, duration: 0.2 });
      },
    });
  }

  jump() {
    const originY = this.container.y;
    gsap.to(this.container, {
      y: originY - 80,
      duration: 0.3,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.container.y = originY;
      },
    });
  }
}
