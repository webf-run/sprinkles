import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid gap-3'>
      <div class='flex flex-wrap gap-3'>
        <Badge variant='positive' fillStyle='bold'>
          Bold
        </Badge>
        <Badge variant='notice' fillStyle='bold'>
          Bold
        </Badge>
        <Badge variant='indigo' fillStyle='bold'>
          Bold
        </Badge>
      </div>
      <div class='flex flex-wrap gap-3'>
        <Badge variant='positive' fillStyle='subtle'>
          Subtle
        </Badge>
        <Badge variant='notice' fillStyle='subtle'>
          Subtle
        </Badge>
        <Badge variant='indigo' fillStyle='subtle'>
          Subtle
        </Badge>
      </div>
      <div class='flex flex-wrap gap-3'>
        <Badge variant='positive' fillStyle='outline'>
          Outline
        </Badge>
        <Badge variant='notice' fillStyle='outline'>
          Outline
        </Badge>
        <Badge variant='indigo' fillStyle='outline'>
          Outline
        </Badge>
      </div>
    </div>
  );
}
