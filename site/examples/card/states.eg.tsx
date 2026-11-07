import { Card, CardBody, CardHeader } from '@webf/sprinkles';

const states = [
  { label: 'Default', class: '' },
  { label: 'Hover', class: 'border-border shadow-elevated' },
  { label: 'Pressed', class: 'border-border bg-surface-muted' },
  {
    label: 'Keyboard focus',
    class: 'outline-solid outline-2 outline-offset-2 outline-focus-ring',
  },
];

export default function Example() {
  return (
    <div class='grid w-full grid-cols-1 gap-4 sm:grid-cols-4'>
      {states.map((state) => (
        <Card href='#pages' class={state.class}>
          <CardHeader title='Pages' description={state.label} />
          <CardBody class='text-foreground-muted'>24 published</CardBody>
        </Card>
      ))}
    </div>
  );
}
