import { keyboard } from '../../controls/keyboard';
import { createPlayer } from '../../objects/player';
import { createScene } from '../../objects/scene';
import { createBall } from '../../objects/ball';
import { createRenderer } from './renderer';
import { collision } from '../../objects/global/collision';
import { camera } from '../../objects/global/camera';
import { createSnowflake } from '../../objects/snowflakes';

export const GameScreen = () => {
  const app = document.getElementById('app')!;
  const renderer = createRenderer();

  app.append(renderer.domElement);

  const scene = createScene();
  const player = createPlayer();
  const ball = createBall();
  const snowflake = createSnowflake();
  const tempCamera = camera.clone();
  tempCamera.far = 2;

  player.group.add(ball.group);
  scene.add(player.group, collision.group, snowflake.points);

  const animate = (time: number) => {
    const direction = keyboard.directionVector;

    player.render(direction, time);
    snowflake.render();
    ball.update(player);

    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(animate);

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    tempCamera.aspect = window.innerWidth / window.innerHeight;
    tempCamera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };
};
