import {
  defineRouteMiddleware,
  type StarlightRouteData,
} from '@astrojs/starlight/route-data';

import { getSection, sectionGroups } from './data/Sections';

/**
 * Shows only the current section's sidebar groups (Guide, Components or
 * Blocks). Runs for every page, so desktop and mobile share the same result.
 */
export const onRequest = defineRouteMiddleware((context) => {
  // Starlight adds `starlightRoute` to `locals` at runtime; typed here so the
  // project doesn't need Starlight's global locals declaration.
  const { starlightRoute } = context.locals as unknown as {
    starlightRoute: StarlightRouteData;
  };
  const section = getSection(context.url.pathname);
  if (!section) return;

  const allowed = sectionGroups[section];
  starlightRoute.sidebar = starlightRoute.sidebar.filter(
    (entry) => entry.type === 'group' && allowed.includes(entry.label)
  );
});
