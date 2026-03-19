import { Stage } from './stage/Stage';
import { Puppet } from './puppets/Puppet';
import { Controls, PLAYER1_KEYS, PLAYER2_KEYS } from './controls/Controls';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

async function main() {
  const stage = new Stage();
  await stage.init();

  // Player 1 — warm orange, starts left of center
  const puppet1 = new Puppet();
  puppet1.container.x = stage.centerX - 120;
  puppet1.container.y = stage.stageFloorY;
  stage.sceneContainer.addChild(puppet1.container);

  // Player 2 — cool blue, starts right of center
  const puppet2 = new Puppet(0x74b9ff, 0x0984e3);
  puppet2.container.x = stage.centerX + 120;
  puppet2.container.y = stage.stageFloorY;
  stage.sceneContainer.addChild(puppet2.container);

  new Controls(puppet1, stage, PLAYER1_KEYS);
  new Controls(puppet2, stage, PLAYER2_KEYS);
}

main();
