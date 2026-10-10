import { DotTag } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <div class='flex flex-wrap gap-3'>
        <DotTag label='Design' />
        <DotTag label='Development' />
        <DotTag label='Research' />
      </div>
    </div>
  );
}
