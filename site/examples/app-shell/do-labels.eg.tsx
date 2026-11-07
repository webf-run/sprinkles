import { AppShellNavGroup, AppShellNavItem } from '@webf/sprinkles';
import FileText from 'lucide-solid/icons/file-text';
import Image from 'lucide-solid/icons/image';
import Newspaper from 'lucide-solid/icons/newspaper';

export default function Example() {
  return (
    <nav aria-label='Example' class='w-56'>
      <AppShellNavGroup>
        <AppShellNavItem href='#pages' icon={FileText} current>
          Pages
        </AppShellNavItem>
        <AppShellNavItem href='#posts' icon={Newspaper}>
          Posts
        </AppShellNavItem>
        <AppShellNavItem href='#media' icon={Image}>
          Media
        </AppShellNavItem>
      </AppShellNavGroup>
    </nav>
  );
}
