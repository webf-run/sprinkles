import {
  AppShell,
  AppShellNavGroup,
  AppShellNavItem,
  Badge,
  Button,
  IconButton,
  TBody,
  TCell,
  TH,
  THead,
  TRow,
  Table,
} from '@webf/sprinkles';
import Bell from 'lucide-solid/icons/bell';
import CircleHelp from 'lucide-solid/icons/circle-help';
import Ellipsis from 'lucide-solid/icons/ellipsis';
import FileText from 'lucide-solid/icons/file-text';
import Image from 'lucide-solid/icons/image';
import Newspaper from 'lucide-solid/icons/newspaper';
import Plus from 'lucide-solid/icons/plus';
import Search from 'lucide-solid/icons/search';
import Settings from 'lucide-solid/icons/settings';
import Sprout from 'lucide-solid/icons/sprout';
import { For } from 'solid-js';

const pages = [
  { title: 'Home', path: '/', status: 'Published', updated: '6 Nov 2026' },
  {
    title: 'Admissions 2027',
    path: '/admissions',
    status: 'Draft',
    updated: '7 Nov 2026',
  },
  {
    title: 'Scholarships',
    path: '/scholarships',
    status: 'Published',
    updated: '28 Oct 2026',
  },
  {
    title: 'About the Foundation',
    path: '/about',
    status: 'Published',
    updated: '2 Nov 2026',
  },
  {
    title: 'Contact',
    path: '/contact',
    status: 'Archived',
    updated: '3 Sep 2026',
  },
];

const StatusVariant = {
  Published: 'positive',
  Draft: 'notice',
  Archived: 'neutral',
} as const;

export default function Example() {
  return (
    <div class='h-120 w-full overflow-hidden rounded-2xl border border-border-muted'>
      <AppShell
        class='h-full'
        brand={
          <>
            <span class='flex size-7 items-center justify-center rounded-lg bg-accent text-accent-foreground'>
              <Sprout class='size-4' aria-hidden='true' />
            </span>
            webf CMS
          </>
        }
        title='Foundation website'
        actions={
          <>
            <IconButton quiet icon={Search} aria-label='Search' />
            <IconButton quiet icon={Bell} aria-label='Notifications' />
          </>
        }
        userMenu={
          <button
            type='button'
            aria-label='Account: Meera Iyer'
            class='m-0 flex size-8 cursor-pointer items-center justify-center rounded-full border-0 bg-accent-subtle p-0 text-xs font-semibold text-accent-subtle-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring'
          >
            MI
          </button>
        }
        sidebar={
          <>
            <AppShellNavGroup label='Content'>
              <AppShellNavItem href='#pages' icon={FileText} current>
                Pages
              </AppShellNavItem>
              <AppShellNavItem href='#posts' icon={Newspaper} end='3'>
                Posts
              </AppShellNavItem>
              <AppShellNavItem href='#media' icon={Image}>
                Media
              </AppShellNavItem>
            </AppShellNavGroup>
            <AppShellNavGroup label='Project'>
              <AppShellNavItem href='#settings' icon={Settings}>
                Settings
              </AppShellNavItem>
            </AppShellNavGroup>
          </>
        }
        sidebarFooter={
          <AppShellNavGroup>
            <AppShellNavItem href='#help' icon={CircleHelp}>
              Help
            </AppShellNavItem>
          </AppShellNavGroup>
        }
      >
        <div class='mb-4 flex items-center justify-between gap-4'>
          <h2 class='m-0 text-xl font-semibold text-foreground-strongest'>
            Pages
          </h2>
          <Button size='s' icon={Plus}>
            New page
          </Button>
        </div>
        <div class='overflow-hidden rounded-2xl border border-border-muted bg-surface'>
          <Table aria-label='Pages'>
            <THead>
              <TRow>
                <TH>Title</TH>
                <TH>Status</TH>
                <TH align='end'>Updated</TH>
                <TH class='w-12'>
                  <span class='sr-only'>Actions</span>
                </TH>
              </TRow>
            </THead>
            <TBody>
              <For each={pages}>
                {(page) => (
                  <TRow>
                    <TCell>
                      <div class='font-medium text-foreground-strongest'>
                        {page.title}
                      </div>
                      <div class='text-xs text-foreground-muted'>
                        {page.path}
                      </div>
                    </TCell>
                    <TCell>
                      <Badge
                        variant={
                          StatusVariant[
                            page.status as keyof typeof StatusVariant
                          ]
                        }
                      >
                        {page.status}
                      </Badge>
                    </TCell>
                    <TCell align='end' class='whitespace-nowrap'>
                      {page.updated}
                    </TCell>
                    <TCell align='end'>
                      <IconButton
                        quiet
                        size='s'
                        icon={Ellipsis}
                        aria-label={`More actions for ${page.title}`}
                      />
                    </TCell>
                  </TRow>
                )}
              </For>
            </TBody>
          </Table>
        </div>
      </AppShell>
    </div>
  );
}
