import { AppShellNavGroup, AppShellNavItem } from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';
import Image from 'lucide-solid/icons/image';
import Newspaper from 'lucide-solid/icons/newspaper';

export default function Example() {
  return (
    <nav aria-label='Example' class='w-56'>
      <AppShellNavGroup>
        <AppShellNavItem href='#pages' icon={FileText} current>
          All published and draft pages
        </AppShellNavItem>
        <AppShellNavItem href='#posts' icon={Newspaper}>
          News posts and announcements
        </AppShellNavItem>
        <AppShellNavItem href='#media' icon={Image}>
          Uploaded images and documents
        </AppShellNavItem>
      </AppShellNavGroup>
    </nav>
  );
}
