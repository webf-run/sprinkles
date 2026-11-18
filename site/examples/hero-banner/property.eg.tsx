import { HeroBanner } from '@webf/sprinkles';

/**
 * A real-estate hero with a full-width architectural background,
 * cool-toned overlay and a modern property search panel.
 */
export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      variant='purple'
      imageTone='purple'
      align='start'
      image='/images/cc/modern-home-cool.jpg'
      imagePosition='center'
      eyebrow='Oakline Homes · Buy, sell or rent'
      title='Find a home that feels like yours.'
      description='Discover thoughtfully selected homes, explore neighbourhoods and book viewings with local property experts. Your next chapter starts here.'
      primaryAction={{
        label: 'Explore properties',
        href: '#homes',
      }}
      secondaryAction={{
        label: 'Sell your property',
        href: '#valuation',
      }}
      note='Verified listings · Local experts · No hidden fees'

      mediaContent={
        <div class='flex w-full max-w-lg items-center justify-center gap-6'>
          {/* Starting price circle */}
          <div class='grid size-44 shrink-0 place-items-center rounded-full border-4 border-highlight/40 bg-gradient-to-br from-highlight to-notice shadow-2xl sm:size-48'>
            <div class='text-center'>
              <p class='m-0 text-xs font-semibold tracking-widest text-foreground-strongest uppercase'>
                Starting from
              </p>

              <p class='m-0 mt-2 text-4xl font-bold tracking-tight text-foreground-strongest'>
                ₹45 L
              </p>

              <p class='m-0 mt-1 text-sm font-medium text-foreground-strong'>
                Find your dream home
              </p>
            </div>
          </div>

          {/* Property highlights on the right */}
          <div class='min-w-0 flex-1'>
            <p class='m-0 mb-4 text-base font-semibold text-foreground-inverse'>
              Property highlights
            </p>

            <ul class='m-0 flex list-none flex-col gap-4 p-0'>
              <li class='flex items-start gap-3'>
                <span class='mt-1.5 size-2.5 shrink-0 rounded-full bg-highlight' />
                <div>
                  <p class='m-0 text-sm font-semibold text-foreground-inverse'>
                    3 Bedrooms
                  </p>
                  <p class='m-0 text-xs text-foreground-inverse/80'>
                    Spacious rooms
                  </p>
                </div>
              </li>

              <li class='flex items-start gap-3'>
                <span class='mt-1.5 size-2.5 shrink-0 rounded-full bg-highlight' />
                <div>
                  <p class='m-0 text-sm font-semibold text-foreground-inverse'>
                    1 Living room
                  </p>
                  <p class='m-0 text-xs text-foreground-inverse/80'>
                    Comfortable space
                  </p>
                </div>
              </li>

              <li class='flex items-start gap-3'>
                <span class='mt-1.5 size-2.5 shrink-0 rounded-full bg-highlight' />
                <div>
                  <p class='m-0 text-sm font-semibold text-foreground-inverse'>
                    2 Bathrooms
                  </p>
                  <p class='m-0 text-xs text-foreground-inverse/80'>
                    Modern fittings
                  </p>
                </div>
              </li>

              <li class='flex items-start gap-3'>
                <span class='mt-1.5 size-2.5 shrink-0 rounded-full bg-highlight' />
                <div>
                  <p class='m-0 text-sm font-semibold text-foreground-inverse'>
                    1 Parking
                  </p>
                  <p class='m-0 text-xs text-foreground-inverse/80'>
                    Dedicated space
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
