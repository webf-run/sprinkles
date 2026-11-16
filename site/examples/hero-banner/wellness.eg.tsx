import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  HeroBanner,
  IconTile,
  InfoBadge,
} from '@webf/sprinkles';
import CalendarDays from 'lucide-solid/icons/calendar-days';
import Video from 'lucide-solid/icons/video';

/** A clinic hero with a compact appointment panel over the photo. */
export default function Example() {
  return (
    <HeroBanner
      layout='split'
      variant='light'
      eyebrow='Your neighbourhood care team'
      image='/images/banners/garden.webp'
      title='Care that fits your life'
      description='Find family medicine, physiotherapy and mental health support in one welcoming clinic, with a care team that takes time to understand what matters to you. Book online or speak with our reception team about the right appointment, evening availability and the insurance details to bring along.'
      primaryAction={{ label: 'Book an appointment', href: '#book' }}
      secondaryAction={{ label: 'Our services', href: '#services' }}
      mediaContent={
        <Card elevated class='w-full max-w-md border-positive/30'>
          <CardHeader
            title='Choose how you would like to meet'
            description='Appointments are available in person or from home.'
            headingLevel={2}
          >
            <Badge variant='positive'>Care team</Badge>
          </CardHeader>
          <CardBody class='flex flex-col gap-3'>
            <div class='flex min-w-0 items-center gap-3'>
              <IconTile icon={CalendarDays} variant='positive' />
              <InfoBadge
                variant='subtle'
                label='In-person visit'
                value='Meet your clinician at the clinic'
                class='max-w-none flex-1'
              />
            </div>
            <div class='flex min-w-0 items-center gap-3'>
              <IconTile icon={Video} variant='informative' />
              <InfoBadge
                variant='subtle'
                label='Virtual visit'
                value='Talk with your care team online'
                class='max-w-none flex-1'
              />
            </div>
          </CardBody>
        </Card>
      }
    />
  );
}
