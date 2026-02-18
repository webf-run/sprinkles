import clsx from 'clsx';
import { type Component, Show, createEffect, createSignal } from 'solid-js';

import type { ResolvedStory } from './Playground.type.js';
import { getCatalog } from './Registry.js';
import { Sidebar } from './Sidebar.js';

import styles from './Playground.module.css';

export function LibPlayground() {
  const [component, setComponent] = createSignal<Component | null>(null);
  const [story, setStory] = createSignal<ResolvedStory | null>(null);
  const [theme, setTheme] = createSignal<'light' | 'dark'>('light');

  const catalog = getCatalog();

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  createEffect(() => {
    document.documentElement.dataset.appScheme = theme();
  });

  return (
    <div
      class={clsx(
        styles.playground,
        theme(),
        theme() === 'light' ? styles.light : styles.dark
      )}
    >
      <Sidebar
        catalog={catalog}
        component={component()}
        story={story()}
        theme={theme()}
        onComponentSelect={(component) => setComponent(() => component)}
        onStorySelect={setStory}
        onThemeToggle={toggleTheme}
      />
      <main class={styles.main}>
        <Show
          when={story()}
          fallback={
            <div class={styles.emptyState}>
              <h2>Welcome to Component Playground</h2>
              <p>
                Select a component and story from the sidebar to get started.
              </p>
            </div>
          }
        >
          {(story) => (
            <div class={styles.storyContainer}>
              <header class={styles.storyHeader}>
                <div class={styles.breadcrumb}>
                  <span class={styles.componentName}>
                    {catalog.get(component()!)?.title}
                  </span>
                  <span class={styles.separator}>/</span>
                  <span class={styles.storyName}>{story().title}</span>
                </div>
                <h1 class={styles.storyTitle}>{story().title}</h1>
                <Show when={story().description}>
                  <p class={styles.storyDescription}>{story().description}</p>
                </Show>
              </header>
              <div class={styles.storyDemo}>{story().render()}</div>
            </div>
          )}
        </Show>
      </main>
    </div>
  );
}
