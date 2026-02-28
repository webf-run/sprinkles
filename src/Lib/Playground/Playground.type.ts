import type { Component, JSX } from 'solid-js';

export interface StoryMeta {
  title: string;
  component: Component<any>;
}

export interface Story {
  title?: string;
  description?: string;
  render: Component | (() => JSX.Element);
}

export interface ResolvedStory {
  title: string;
  description?: string;
  render: Component | (() => JSX.Element);
}

export interface CatalogEntry<T extends Record<string, any> = {}> {
  title: string;
  component: Component<T>;
  stories: ResolvedStory[];
}

export type StoryModule = Record<string, Story | StoryMeta>;

export type Catalog = Map<Component<any>, CatalogEntry<any>>;
