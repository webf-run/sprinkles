import { Button, Dialog, type DialogSize } from '@webf/sprinkles';

const Sizes: { size: DialogSize; label: string }[] = [
  { size: 's', label: 'Small' },
  { size: 'm', label: 'Medium' },
  { size: 'l', label: 'Large' },
];

export default function Example() {
  return (
    <>
      {Sizes.map(({ size, label }) => (
        <Dialog
          size={size}
          trigger={(props) => (
            <Button {...props} variant='secondary'>
              {label}
            </Button>
          )}
          title={`${label} dialog`}
          description='The width is a maximum: on a phone every size fills the screen, less a margin.'
          footer={(close) => <Button onClick={close}>Done</Button>}
        />
      ))}
    </>
  );
}
