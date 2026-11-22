import { HeroBanner } from '@webf/sprinkles';
import Clock from 'lucide-solid/icons/clock';
import Leaf from 'lucide-solid/icons/leaf';
import MapPin from 'lucide-solid/icons/map-pin';
import Phone from 'lucide-solid/icons/phone';
import Sprout from 'lucide-solid/icons/sprout';

export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      surface='muted'
      scrim='soft'
      image='/images/cc/vegetables.jpg'
      imagePosition='center'
      eyebrow='Green Acre Market · Local growers'
      title='Fresh from the field to your door.'
      description='A weekly box of seasonal vegetables, fruit and flowers from farms within 50 miles. Skip a week, swap an item or pause whenever you like.'
      primaryAction={{
        label: 'Build your box',
        href: '#box',
      }}
      secondaryAction={{
        label: 'See what’s in season',
        href: '#season',
      }}
      note='Free delivery on orders over $40'

      mediaContent={
        <div class='box-border w-full max-w-sm rounded-2xl bg-surface-inverse/90 p-6 shadow-elevated @5xl:ml-auto'>
          <div class='mb-7 flex items-center gap-3'>
            <span class='box-border grid size-12 shrink-0 place-items-center rounded-full border border-border-inverse/50 bg-surface-inverse/50 text-foreground-inverse'>
              <Sprout class='size-6' aria-hidden='true' />
            </span>

            <div>
              <p class='m-0 text-xs font-semibold tracking-wide-140 text-foreground-inverse uppercase'>
                Fresh · Local · Organic
              </p>

              <h3 class='m-0 mt-1 text-2xl font-bold text-foreground-inverse'>
                Green Acre Market
              </h3>
            </div>
          </div>

          <div class='ml-5 flex flex-col gap-6 border-l border-border-inverse/50 pl-5'>
            <div class='flex items-start gap-3'>
              <Clock
                class='mt-1 size-5 shrink-0 text-foreground-inverse'
                aria-hidden='true'
              />

              <div>
                <p class='m-0 text-base font-semibold text-foreground-inverse'>
                  Visit our market
                </p>

                <p class='m-0 mt-1 text-sm text-foreground-inverse'>
                  Open daily · Monday – Sunday
                </p>

                <p class='m-0 mt-1 text-sm font-semibold text-foreground-inverse'>
                  8:00 AM – 7:00 PM
                </p>
              </div>
            </div>

            <div class='flex items-start gap-3'>
              <Phone
                class='mt-1 size-5 shrink-0 text-foreground-inverse'
                aria-hidden='true'
              />

              <div>
                <p class='m-0 text-base font-semibold text-foreground-inverse'>
                  Let's talk fresh
                </p>

                <p class='m-0 mt-1 text-sm text-foreground-inverse'>
                  Questions about our seasonal produce?
                </p>

                <a
                  href='tel:+15551234567'
                  class='mt-1 inline-block text-sm font-semibold text-foreground-inverse no-underline underline-offset-4 hover:underline'
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>

            <div class='flex items-start gap-3'>
              <MapPin
                class='mt-1 size-5 shrink-0 text-foreground-inverse'
                aria-hidden='true'
              />

              <div>
                <p class='m-0 text-base font-semibold text-foreground-inverse'>
                  Find our farm market
                </p>

                <p class='m-0 mt-1 text-sm text-foreground-inverse'>
                  24 Farm Lane, Green Valley
                </p>

                <p class='m-0 mt-1 text-xs text-foreground-inverse'>
                  Locally grown · Locally sourced
                </p>
              </div>
            </div>
          </div>

          <div class='mt-7 flex items-center gap-2 border-t border-border-inverse/50 pt-4'>
            <Leaf
              class='size-4 shrink-0 text-foreground-inverse'
              aria-hidden='true'
            />

            <p class='m-0 text-xs font-medium text-foreground-inverse'>
              Good food starts with good soil.
            </p>
          </div>
        </div>
      }
    />
  );
}
