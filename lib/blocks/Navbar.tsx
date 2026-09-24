import { ChevronDown, Menu, X } from 'lucide-solid';
import { type JSX, createSignal, onCleanup, onMount } from 'solid-js';

import Link from './Link';

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}
export interface Props {
  logoSrc?: string;
  logoText?: string;
  logo?: JSX.Element;
  navItems?: NavItem[];
  actions?: JSX.Element;
  class?: string;
  style?: string;
  position?: 'fixed' | 'sticky' | 'static';
}

export default function Navbar(p: Props) {
  const [open, setOpen] = createSignal(false);
  const items = () => p.navItems ?? [];

  onMount(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () =>
      window.matchMedia('(min-width: 768px)').matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    onCleanup(() => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    });
  });

  return (
    <nav
      class={`bg-surface left-0 w-full shadow-sm ${p.position === 'fixed' ? 'fixed top-0 z-50' : p.position === 'sticky' ? 'sticky top-0 z-50' : 'relative'} ${p.class ?? ''}`}
      style={p.style}
    >
      <div class='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
        <div class='flex h-16 items-center justify-between sm:h-20'>
          <a href='/' class='flex items-center'>
            {p.logo ??
              (p.logoSrc ? (
                <img
                  src={p.logoSrc}
                  alt='Logo'
                  class='h-10 w-auto object-contain sm:h-12'
                />
              ) : (
                p.logoText && (
                  <span class='text-foreground text-xl font-bold sm:text-2xl'>
                    {p.logoText}
                  </span>
                )
              ))}
          </a>

          <div class='hidden items-center gap-4 md:flex md:gap-6 lg:gap-8'>
            {items().map((item) => (
              <a
                href={item.href}
                class='text-foreground hover:text-foreground-muted flex items-center gap-1 text-xs font-medium transition-colors sm:text-sm lg:text-base'
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown size={16} stroke-width={2} />}
              </a>
            ))}
          </div>

          <div class='flex items-center gap-3 sm:gap-5'>
            {p.actions ?? <Link variant='purple'>Apply Now</Link>}

            {items().length > 0 && (
              <div class='relative md:hidden'>
                <button
                  type='button'
                  onClick={() => setOpen(!open())}
                  aria-label='Toggle menu'
                  aria-expanded={open()}
                  class='border-border-subtle inline-flex h-9 w-9 items-center justify-center rounded-md border'
                >
                  {open() ? <X size={20} /> : <Menu size={20} />}
                </button>

                {open() && (
                  <div class='border-border-subtle bg-surface absolute inset-x-0 top-full border-t px-4 pb-4 shadow-sm sm:px-6'>
                    <div class='flex flex-col pt-2'>
                      {items().map((item) => (
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          class='border-border-subtle text-foreground flex items-center justify-between border-b px-2 py-3 text-sm font-medium'
                        >
                          <span>{item.label}</span>
                          {item.hasDropdown && (
                            <ChevronDown size={16} stroke-width={2} />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
