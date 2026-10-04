// Minimal typings for the untyped template libraries used in src/components/inotek.

declare module "odometer" {
  export default class Odometer {
    constructor(options: { el: HTMLElement; value?: number; format?: string; theme?: string; duration?: number });
    update(value: number): void;
  }
}

declare module "isotope-layout" {
  export default class Isotope {
    constructor(element: Element, options?: Record<string, unknown>);
    arrange(options: { filter: string }): void;
    destroy(): void;
  }
}

declare module "imagesloaded" {
  export default function imagesLoaded(element: Element, callback: () => void): void;
}
