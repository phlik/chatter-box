import { Puppet } from '../puppets/Puppet';
import { Stage } from '../stage/Stage';

const SPEED = 4;
const MIN_X = window.innerWidth * 0.14;
const MAX_X = window.innerWidth * 0.86;

export interface KeyBindings {
  left: string;
  right: string;
  talk: string;
  wave: string;
  jump: string;
}

export const PLAYER1_KEYS: KeyBindings = {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  talk: 'Space',
  wave: 'ArrowUp',
  jump: 'ArrowDown',
};

export const PLAYER2_KEYS: KeyBindings = {
  left: 'KeyA',
  right: 'KeyD',
  talk: 'KeyF',
  wave: 'KeyW',
  jump: 'KeyS',
};

export class Controls {
  private keys: Record<string, boolean> = {};
  private puppet: Puppet;
  private stage: Stage;
  private bindings: KeyBindings;

  constructor(puppet: Puppet, stage: Stage, bindings: KeyBindings) {
    this.puppet = puppet;
    this.stage = stage;
    this.bindings = bindings;
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
    this.stage.app.ticker.add(() => this.update());
  }

  private onKeyDown(e: KeyboardEvent) {
    this.keys[e.code] = true;

    if (e.code === this.bindings.talk) {
      e.preventDefault();
      this.puppet.startTalking();
    }
    if (e.code === this.bindings.wave) {
      this.puppet.wave();
    }
    if (e.code === this.bindings.jump) {
      this.puppet.jump();
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    this.keys[e.code] = false;

    if (e.code === this.bindings.talk) {
      this.puppet.stopTalking();
    }
    if (e.code === this.bindings.left || e.code === this.bindings.right) {
      this.puppet.stopWalking();
    }
  }

  private update() {
    if (this.keys[this.bindings.left]) {
      this.puppet.container.x = Math.max(MIN_X, this.puppet.container.x - SPEED);
      this.puppet.startWalking(-1);
    } else if (this.keys[this.bindings.right]) {
      this.puppet.container.x = Math.min(MAX_X, this.puppet.container.x + SPEED);
      this.puppet.startWalking(1);
    } else {
      this.puppet.stopWalking();
    }
  }
}
