import { Button } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='flex w-full flex-wrap gap-6'>
      <div class='flex flex-1 flex-wrap gap-3 rounded-2xl bg-surface-inverse p-6'>
        <Button staticColor='white'>Explore</Button>
        <Button staticColor='white' fillStyle='outline'>
          Contact us
        </Button>
      </div>
      <div class='flex flex-1 flex-wrap gap-3 rounded-2xl bg-highlight p-6'>
        <Button staticColor='black'>Explore</Button>
        <Button staticColor='black' fillStyle='outline'>
          Contact us
        </Button>
      </div>
    </div>
  );
}
