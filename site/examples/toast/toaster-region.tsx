import { Toaster } from '@webf/sprinkles';

import { toaster } from './toaster';

/** Renders the page's toasts once, so every example shares one stack. */
export default function ToasterRegion() {
  return <Toaster toaster={toaster} />;
}
