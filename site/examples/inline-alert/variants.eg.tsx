import { InlineAlert } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full flex-col gap-4'>
      <InlineAlert variant='neutral' heading='Draft'>
        Nobody can see this page until it’s published.
      </InlineAlert>
      <InlineAlert variant='informative' heading='Scheduled'>
        This page goes live on 1 December at 09:00.
      </InlineAlert>
      <InlineAlert variant='positive' heading='Published'>
        Live at /admissions-2027 since today, 14:32.
      </InlineAlert>
      <InlineAlert variant='notice' heading='Missing description'>
        Search engines will make one up from the page text.
      </InlineAlert>
      <InlineAlert variant='negative' heading='Broken link'>
        “Apply now” points to /apply-2026, which no longer exists.
      </InlineAlert>
    </div>
  );
}
