import { InfoBadge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full gap-4 @md:grid-cols-2'>
      <div class='flex rounded-2xl bg-surface-inverse p-6'>
        <InfoBadge label='NAAC accredited' value='B+ grade' />
      </div>
      <div class='flex rounded-2xl bg-surface-muted p-6'>
        <InfoBadge
          variant='subtle'
          label='Approved by'
          value='PCI, New Delhi'
        />
      </div>
      <div class='flex rounded-2xl bg-purple-75 p-6'>
        <InfoBadge
          variant='outline'
          label='Affiliated to'
          value='KBC NMU, Jalgaon'
        />
      </div>
    </div>
  );
}
