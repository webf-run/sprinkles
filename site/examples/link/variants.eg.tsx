import { Link } from '@webf/sprinkles';

export default function Example() {
  return (
    <p class='m-0 max-w-prose text-foreground'>
      Read the <Link href='#'>admission guidelines</Link> before you apply, or{' '}
      <Link href='#' variant='secondary'>
        contact the office
      </Link>{' '}
      for help.
    </p>
  );
}
