import { Link } from '@webf/sprinkles';

export default function Example() {
  return (
    <p class='m-0 w-full rounded-2xl bg-surface-inverse p-6 text-foreground-inverse'>
      Questions?{' '}
      <Link href='#' staticColor='white'>
        Write to us
      </Link>
      .
    </p>
  );
}
