export interface GameObjectProp {
  name: string
  value: string
}

export class GameObject {
  element: HTMLElement;

  constructor(
    private type: string = "div",
    private props?: GameObjectProp[],
    private childs?: HTMLElement[]
  ) {
    this.element = document.createElement(type);

    props?.forEach(({ name, value }) => {
      this.element.setAttribute(name, value);
    })

    childs?.forEach((child) => {
      this.element.appendChild(child);
    })
  }
}