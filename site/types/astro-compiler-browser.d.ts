/**
 * Astro's browser export types are not properly declared as TypeScript
 * always uses `import` field of the export configuration. However, we
 * need the `browser` version of the compiler which has `initialize()` method.
 * */
declare module '@astrojs/compiler' {
  export * from '@astrojs/compiler/types';

  export function initialize(options: { wasmURL: string }): Promise<void>;
  export function teardown(): void;
}
