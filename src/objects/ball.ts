import { Group, Mesh, MeshBasicMaterial, PointLight, SphereGeometry, Vector3 } from 'three';
import { createArrowHelper } from './arrowHelper';
import { mouse } from '../controls/mouse';
import { camera } from './global/camera';
import { pointLight } from './global/point_light';

export const createBall = () => {
  let position = new Vector3();

  const group = new Group();
  const mesh = new Mesh(new SphereGeometry(0.1), new MeshBasicMaterial());
  const arrowHelper = createArrowHelper(0.3, 0xffffff);

  group.add(mesh);
  group.add(arrowHelper.mesh);
  group.add(pointLight);

  return {
    group,
    update(player: any) {
      if (mouse.isMoving) {
        const dx = (mouse.x / window.innerWidth) * 2 - 1;
        const dy = (mouse.y / window.innerHeight) * -2 + 1;
        const projection = new Vector3(dx, dy, 1);

        position = projection.unproject(camera);
        position.sub(player.group.position);
        position.clampLength(0, 1);

        position.z = 0;
      } else {
        position.x = 0;
        position.y = 0;
      }

      const offset = group.position.lerp(position, 0.1);
      const offsetLength = offset.length();

      pointLight.intensity = offsetLength / 3;
      group.visible = offsetLength > 0.01;
      arrowHelper.render(position.clone().sub(group.position).normalize());
    },
  };
};
