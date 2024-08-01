import { AxesHelper, Mesh, MeshLambertMaterial, PlaneGeometry, Scene } from 'three';
import { hemisphereLight } from './global/hemisphere_light';

export const createScene = () => {
  const scene = new Scene();
  const axesHelper = new AxesHelper(1);
  axesHelper.position.z = 0.001;

  const ground = new Mesh(new PlaneGeometry(4, 4), new MeshLambertMaterial({ color: 0xffffff }));
  ground.receiveShadow = true;

  scene.add(axesHelper, ground, hemisphereLight);

  return scene;
};
