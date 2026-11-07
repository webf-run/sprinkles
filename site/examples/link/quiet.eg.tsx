import { Link } from '@webf/sprinkles';

export default function Example() {
  return (
    <ul class='m-0 flex list-none flex-col gap-2 p-0'>
      <li>
        <Link href='#' quiet>
          Bachelor of Pharmacy
        </Link>
      </li>
      <li>
        <Link href='#' quiet>
          Master of Pharmacy
        </Link>
      </li>
      <li>
        <Link href='#' quiet>
          Diploma in Pharmacy
        </Link>
      </li>
    </ul>
  );
}
