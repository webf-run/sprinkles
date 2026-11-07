import { IconButton } from '@webf/sprinkles';
import ExternalLink from 'lucide-solid/icons/external-link';

export default function Example() {
  return (
    <IconButton
      href='https://example.org/admissions'
      target='_blank'
      rel='noopener'
      quiet
      icon={ExternalLink}
      aria-label='Open the live page in a new tab'
    />
  );
}
