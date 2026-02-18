import * as buttonStoryModule from '../Button/Button.story.js';
import * as toggleStoryModule from '../Button/Toggle.story.js';
import * as selectStoryModule from '../Collection/Select.story.js';
import * as textInputStoryModule from '../Text/TextInput.story.js';
import * as toastStoryModule from '../Toast/Toast.story.js';
import type {
  Catalog,
  ResolvedStory,
  StoryMeta,
  StoryModule,
} from './Playground.type.js';

/**
 * Registry of all available components and their stories
 * Add new components here as they are created
 */
export function getCatalog(): Catalog {
  const map: Catalog = new Map();

  addToCatalog(map, buttonStoryModule);
  addToCatalog(map, toggleStoryModule);
  addToCatalog(map, selectStoryModule);
  addToCatalog(map, textInputStoryModule);
  addToCatalog(map, toastStoryModule);

  return map;
}

function addToCatalog(catalog: Catalog, storiesModule: StoryModule): void {
  const { Meta } = storiesModule;

  assertMetaExport(Meta);

  catalog.set(Meta.component, {
    title: Meta.title,
    component: Meta.component,
    stories: extractStories(storiesModule),
  });
}

function extractStories(storiesModule: StoryModule): ResolvedStory[] {
  const { Meta, ...restItems } = storiesModule;

  const stories: ResolvedStory[] = [];

  Object.entries(restItems).forEach(([key, story]) => {
    if (isStoryExport(story)) {
      stories.push({
        title: story.title ?? key,
        description: story.description,
        render: story.render,
      });
    }
  });

  return stories;
}

function isStoryExport(value: any): value is ResolvedStory {
  return typeof value === 'object' && typeof value.render === 'function';
}

function assertMetaExport(value: any): asserts value is StoryMeta {
  if (typeof value === 'object' && value.component !== undefined) {
    return;
  }

  throw new Error('Invalid Meta export in story module');
}
