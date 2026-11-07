import { Spinner } from '@webf/sprinkles';

export default function Example() {
  return (
    <ul class='m-0 flex w-full list-none flex-col gap-3 p-0'>
      {['Admissions 2027', 'About us', 'Campus life', 'Events'].map((title) => (
        <li class='flex items-center justify-between text-sm text-foreground-strong'>
          {title}
          <Spinner size='s' />
        </li>
      ))}
    </ul>
  );
}
