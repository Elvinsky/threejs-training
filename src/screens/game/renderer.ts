import { PCFSoftShadowMap, WebGLRenderer } from 'three';

export const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  return renderer;
};
