import { AxesHelper, Mesh, MeshLambertMaterial, PlaneGeometry, Scene, TextureLoader } from 'three';
import { hemisphereLight } from './global/hemisphere_light';

export const createScene = () => {
  const scene = new Scene();
  const axesHelper = new AxesHelper(1);

  axesHelper.position.z = 0.001;

  const textureLoader = new TextureLoader();
  const snowTexture = textureLoader.load('/SnowHighContrast.png');

  const ground = new Mesh(new PlaneGeometry(4, 4), new MeshLambertMaterial({ map: snowTexture }));
  ground.receiveShadow = true;

  scene.add(axesHelper, ground, hemisphereLight);

  return scene;
};
