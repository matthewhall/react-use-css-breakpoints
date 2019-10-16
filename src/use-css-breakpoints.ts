import { useState, useEffect } from 'react';

import parseContentPropFromPseudoElement from './utils/parse-content-prop-from-pseudo-element';

export default function useCssBreakpoints(): string {
  const [state, setState] = useState();

  useEffect(() => {
    let mounted = true;
    let rAF: null | number = null;

    const onResize = (): void => {
      if (!mounted) {
        return;
      }

      if (rAF) {
        window.cancelAnimationFrame(rAF);
      }

      const breakpoint: string = parseContentPropFromPseudoElement();

      rAF = window.requestAnimationFrame(() => setState(breakpoint));
    };

    window.addEventListener('resize', onResize, { passive: true });
    onResize();

    return (): void => {
      mounted = false;
      rAF = null;
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return state;
}
