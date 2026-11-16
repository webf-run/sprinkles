import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HeroBanner,
  InfoBadge,
} from '@webf/sprinkles';

function AccountPanel() {
  return (
    <Card elevated class='@container w-full max-w-md'>
      <CardHeader
        title='Account overview'
        description='Everyday checking · •••• 2048'
        headingLevel={2}
        actions={<Badge variant='positive'>Active</Badge>}
      />
      <CardBody>
        <p class='m-0 text-sm text-foreground-muted'>Sample available balance</p>
        <p class='m-0 mt-1 text-4xl font-semibold tracking-tight text-foreground-strongest'>$12,480.00</p>
        <div class='mt-5 grid grid-cols-1 gap-3 @sm:grid-cols-2'>
          <InfoBadge
            variant='subtle'
            label='Savings rate'
            value='4.2% APY'
            class='max-w-none'
          />
          <InfoBadge
            variant='subtle'
            label='Monthly fee'
            value='$0'
            class='max-w-none'
          />
        </div>
      </CardBody>
      <CardFooter>
        <Badge variant='informative'>Deposits insured up to $250,000</Badge>
      </CardFooter>
    </Card>
  );
}

/** A bank or investment app: an account overview sits over the market graphic. */
export default function Example() {
  return (
    <HeroBanner
      layout='split'
      variant='informative'
      eyebrow='Everyday banking, made clear'
      image='/images/banners/finance.webp'
      title='Money that works as hard as you do'
      description='Bring your spending, savings and investing into one secure account with plain language pricing at every step. See your balance, track upcoming bills and move money whenever you need it, with support from a real person when questions come up.'
      primaryAction={{ label: 'Open an account', href: '#open' }}
      secondaryAction={{ label: 'Compare rates', href: '#rates' }}
      mediaContent={<AccountPanel />}
    />
  );
}
