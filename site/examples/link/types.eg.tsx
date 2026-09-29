import { Link } from '@webf-run/sprinkles';

export default function Example() {
  return (
    <>
      <Link variant='primary' size='sm' type='submit'>
        Submit
      </Link>
      <Link variant='purple' size='sm' type='reset'>
        Reset
      </Link>
    </>
  );
}
