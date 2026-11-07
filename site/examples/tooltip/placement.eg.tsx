import { Button, Tooltip, type TooltipPlacement } from '@webf/sprinkles';

const Placements: TooltipPlacement[] = ['top', 'right', 'bottom', 'left'];

export default function Example() {
  return (
    <>
      {Placements.map((placement) => (
        <Tooltip
          placement={placement}
          content={`Shown ${placement}`}
          trigger={(props) => (
            <Button {...props} variant='secondary'>
              {placement}
            </Button>
          )}
        />
      ))}
    </>
  );
}
