import { ChevronDown, ChevronRight, Moon, Sun } from 'lucide-solid';
import { type Component, For, Show } from 'solid-js';

import type { Catalog, ResolvedStory } from './Playground.type.js';

import styles from './Sidebar.module.css';

export interface SidebarProps {
  catalog: Catalog;
  component: Component<any> | null;
  story: ResolvedStory | null;
  theme: 'light' | 'dark';
  onComponentSelect: (component: Component<any> | null) => void;
  onStorySelect: (story: ResolvedStory | null) => void;
  onThemeToggle: () => void;
}

export function Sidebar(props: SidebarProps) {
  const isComponentExpanded = (component: Component<any>) => {
    return props.component === component;
  };

  const handleComponentClick = (component: Component<any>) => {
    if (props.component === component) {
      // If already selected, collapse
      props.onComponentSelect(null);
    } else {
      // Select component and first story
      props.onComponentSelect(component);

      const catalogItem = props.catalog.get(component);

      if (catalogItem && catalogItem.stories.length > 0) {
        props.onStorySelect(catalogItem.stories[0]);
      }
    }
  };

  const handleStoryClick = (story: ResolvedStory) => {
    props.onStorySelect(story);
  };

  return (
    <aside class={styles.sidebar}>
      <div class={styles.header}>
        <h2 class={styles.title}>Components</h2>
        <button
          class={styles.themeToggle}
          onClick={props.onThemeToggle}
          title={`Switch to ${props.theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <Show when={props.theme === 'light'} fallback={<Sun size={18} />}>
            <Moon size={18} />
          </Show>
        </button>
      </div>
      <nav class={styles.nav}>
        <For each={Array.from(props.catalog)}>
          {([component, story]) => (
            <div class={styles.componentGroup}>
              <button
                class={styles.componentButton}
                classList={{
                  [styles.expanded]: isComponentExpanded(component),
                }}
                onClick={() => handleComponentClick(component)}
              >
                <span class={styles.componentIcon}>
                  <Show
                    when={isComponentExpanded(component)}
                    fallback={<ChevronRight size={16} />}
                  >
                    <ChevronDown size={16} />
                  </Show>
                </span>
                <span class={styles.componentName}>{story.title}</span>
                <span class={styles.storyCount}>({story.stories.length})</span>
              </button>
              <Show when={isComponentExpanded(component)}>
                <div class={styles.storyList}>
                  <For each={story.stories}>
                    {(story) => (
                      <button
                        class={styles.storyButton}
                        classList={{
                          [styles.active]: props.story === story,
                        }}
                        onClick={() => handleStoryClick(story)}
                      >
                        {story.title}
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          )}
        </For>
      </nav>
    </aside>
  );
}
