import { QuickLinkCard } from '@webf/sprinkles';
import Compass from 'lucide-solid/icons/compass';

export default function Example() {
  return (
    <div class='@container w-full'>
      <div class='grid gap-4 @2xl:grid-cols-3'>
        <QuickLinkCard
          icon={Compass}
          variant='informative'
          fillStyle='outline'
          title='Destinations'
          description='Forty countries, chosen by our advisers.'
          href='#destinations'
        />
        <QuickLinkCard
          icon={Compass}
          variant='informative'
          fillStyle='subtle'
          title='Destinations'
          description='Forty countries, chosen by our advisers.'
          href='#destinations'
        />
        <QuickLinkCard
          icon={Compass}
          variant='informative'
          fillStyle='bold'
          title='Destinations'
          description='Forty countries, chosen by our advisers.'
          href='#destinations'
        />
      </div>
    </div>
  );
}
