import { Link } from '@webf/sprinkles';

export default function Example() {
  return (
    <>
      <Link disabled>Alert</Link>
      <Link variant='secondary' size='sm' disabled>
        Warning
      </Link>
      <Link variant='purple' type='button' disabled>
        Download
      </Link>
    </>
  );
}
