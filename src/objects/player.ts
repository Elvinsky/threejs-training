import {
  FrontSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  Texture,
  TextureLoader,
  Vector3,
} from 'three';
import { createArrowHelper } from './arrowHelper';
import { camera } from './global/camera';
import { raycaster } from './raycaster';
import { directionalLight } from './global/directional_light';

const idle = (texture: Texture, time: number) => {
  const th = 4;
  const tv = 3;

  const total = th * tv;
  const tile = Math.ceil((time / 60) % total);
  const x = th - (tile % th || th) + 1;
  const y = tv - Math.ceil(tile / th) + 1;

  texture.repeat.set(1 / th, 1 / tv);
  texture.offset.x = 1 - (1 / th) * x;
  texture.offset.y = (1 / tv) * y;
};

const run = (texture: Texture, time: number) => {
  const th = 5;
  const tv = 4;

  const total = th * tv;
  const tile = Math.ceil((time / 60) % total);

  const x = th - (tile % th || th) + 1;
  const y = tv - Math.ceil(tile / th) + 1;

  texture.repeat.set(1 / th, 1 / tv);
  texture.offset.x = 1 - (1 / th) * x;
  texture.offset.y = (1 / tv) * y;
};

const quaternion = new Quaternion();
const yAxis = new Vector3(0, 1, 0);

export const createPlayer = () => {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('/Idle.png');
  const textureRun = textureLoader.load('/Run.png');

  texture.anisotropy = 4;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.center.x -= 0.01;
  texture.center.y -= 0.02;

  textureRun.anisotropy = 4;
  textureRun.wrapS = RepeatWrapping;
  textureRun.wrapT = RepeatWrapping;

  const material = new MeshBasicMaterial({
    side: FrontSide,
    map: texture,
    color: 0xe9724f,
    transparent: true,
    precision: 'highp',
    alphaTest: 0.5,
    shadowSide: FrontSide,
  });
  const group = new Group();
  const geometry = new PlaneGeometry(1.8, 1.8);

  geometry.rotateZ(Math.PI);

  const mesh = new Mesh(geometry, material);
  mesh.position.z = 0.03;
  mesh.castShadow = true;
  const arrowHelper = createArrowHelper();

  group.add(mesh, arrowHelper.mesh, directionalLight);
  directionalLight.target = group;
  directionalLight.lookAt(group.position);

  return {
    group,
    render(direction: Vector3, time: number) {
      if (direction.length()) {
        material.map = textureRun;
        run(textureRun, time);
        arrowHelper.render(direction);
        quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());

        const intersection = raycaster.render(group.position, direction);

        if (!intersection || intersection?.distance > 0.2) {
          group.position.add(direction);
          camera.position.add(direction);
          arrowHelper.render(direction);
        }
      } else {
        material.map = texture;
        idle(texture, time);
      }
      mesh.quaternion.slerp(quaternion, 0.1);
    },
  };
};
