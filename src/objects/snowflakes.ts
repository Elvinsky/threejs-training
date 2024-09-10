import {
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  Points,
  PointsMaterial,
  TextureLoader,
  Vector3,
} from 'three';
import { camera } from './global/camera';

export const createSnowflake = () => {
  const vertices = [];
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('/snowflake.png');

  for (let i = 0; i < 700; i++) {
    const x = MathUtils.randFloatSpread(4);
    const y = MathUtils.randFloatSpread(4);
    const z = MathUtils.randFloatSpread(2);

    vertices.push(x, y, z);
  }

  const geometry = new BufferGeometry();

  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

  const material = new PointsMaterial({
    map: texture,
    size: 0.05,
    transparent: true,
    alphaMap: texture,
    alphaTest: 0.5,
  });
  const points = new Points(geometry, material);
  points.rotateZ(Math.PI / 4);

  const vertex = new Vector3();

  const render = () => {
    const positionAttr = geometry.getAttribute('position');

    for (let i = 0; i < positionAttr.count; i += 1) {
      vertex.fromBufferAttribute(positionAttr, i);
      vertex.x += 0.005;

      if (vertex.x > 2) {
        vertex.x = -2;
      }

      positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    positionAttr.needsUpdate = true;
    points.position.set(camera.position.x, camera.position.y, 2);
  };

  return { render, points };
};
