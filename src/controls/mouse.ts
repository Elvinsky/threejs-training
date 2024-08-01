import { Vector3 } from 'three';

class MouseControl {
  isMoving = false;
  x = 0;
  y = 0;

  constructor() {
    document.onmousedown = event => {
      this.isMoving = true;
      this.x = event.clientX;
      this.y = event.clientY;
    };

    document.onmousemove = event => {
      if (this.isMoving) {
        this.x = event.clientX;
        this.y = event.clientY;
      }
    };

    document.onmouseup = () => {
      this.isMoving = false;
      this.x = 0;
      this.y = 0;
    };

    document.body.onmouseleave = () => {
      this.isMoving = false;
    };
  }

  get cursorVector() {
    const x = (this.x / window.innerWidth) * 2 - 1;
    const y = (-this.y / window.innerHeight) * 2 + 1;

    return new Vector3(x, y, 1);
  }
}

export const mouse = new MouseControl();
