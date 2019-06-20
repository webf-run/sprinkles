export type MenuDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface MenuPosition {
  direction: MenuDirection;
  style: {
    top?: string;
    left?: string;
    maxHeight?: string;
    right?: string;
    bottom?: string;
  };
}

export function compute(anchor: HTMLElement, floatingElm: HTMLElement, overlap: boolean): MenuPosition {
  const direction = suggest(anchor, floatingElm, overlap);
  const style = getFixedPixels(anchor, direction, overlap);

  return { direction, style };
}


export function suggest(anchor: HTMLElement, floatingElm: HTMLElement, overlap: boolean): MenuDirection {

  let hAlign: 'left' | 'right';
  let vAlign: 'top' | 'bottom';

  // Viewport width
  const vWidth = window.innerWidth;

  // Viewport height
  const vHeight = window.innerHeight;

  // Floating element width
  const fWidth = floatingElm.offsetWidth;

  const { left, top } = getTopLeftCorner(anchor, overlap);

  // Get relative left and top
  const rLeft = left / vWidth;
  const rTop = top / vHeight;

  // Far right should always be right aligned
  // Otherwise, calculate values depending upon width
  hAlign = rLeft > 0.85 ? 'right' : (left + fWidth < vWidth ? 'left' : 'right');
  vAlign = rTop > 0.60 ? 'bottom' : 'top';

  return `${vAlign}-${hAlign}` as MenuDirection;
}

export function getFixedPixels(anchor: HTMLElement, position: MenuDirection, overlap: boolean) {

  const vWidth = window.innerWidth;
  const vHeight = window.innerHeight;
  const { left, top, right, bottom, width } = anchor.getBoundingClientRect();

  switch (position) {

    case 'top-left': {
      const maxHeight = `${vHeight - top - 32}px`;
      const leftVal = overlap ? left : (left + width);

      return { top: `${top}px`, left: `${leftVal}px`, maxHeight };
    }
    case 'top-right': {
      const rightVal = overlap ? (vWidth - right) : (vWidth - right - width);
      const maxHeight = `${vHeight - top - 32}px`;

      return { top: `${top}px`, right: `${rightVal}px`, maxHeight };
    }

    case 'bottom-left': {
      const bottomVal = vHeight - bottom;
      const leftVal = overlap ? left : (left + width);
      const maxHeight = `${bottom - 32}px`;

      return { bottom: `${bottomVal}px`, left: `${leftVal}px`, maxHeight };
    }

    case 'bottom-right': {
      const rightVal = overlap ? (vWidth - right) : (vWidth - right - width);
      const bottomVal = vHeight - bottom;
      const maxHeight = `${bottom - 32}px`;

      return { bottom: `${bottomVal}px`, right: `${rightVal}px`, maxHeight };
    }
  }
}

function getTopLeftCorner(elm: HTMLElement, overlap: boolean) {
  const { left, top, width, height } = elm.getBoundingClientRect();

  return overlap ? { left, top } : { left: left + width, top: top + height };
}