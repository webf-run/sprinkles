import { Button, Popover, type PopoverPlacement } from '@webf/sprinkles';

const Placements: PopoverPlacement[] = ['top', 'right', 'bottom', 'left'];

export default function Example() {
  return (
    <>
      {Placements.map((placement) => (
        <Popover
          placement={placement}
          trigger={(props) => (
            <Button {...props} variant='secondary'>
              {placement}
            </Button>
          )}
          aria-label={`Opens ${placement}`}
        >
          Opens {placement}; flips if there’s no room.
        </Popover>
      ))}
    </>
  );
}
