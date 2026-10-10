import { CtaSection } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <CtaSection
        badge='FOR TEAMS'
        title='A shared foundation for better work'
        description='Bring people, tools, and ideas together in one thoughtful experience that can scale with your organization.'
        ctaLabel='Meet the platform'
        ctaHref='/platform'
      />
    </div>
  );
}
