import { Toggle } from '@webf/sprinkles';
import MessageSquare from 'lucide-solid/icons/message-square';
import Pin from 'lucide-solid/icons/pin';
import Star from 'lucide-solid/icons/star';

export default function Example() {
  return (
    <>
      <Toggle icon={Pin} defaultPressed>
        Pin to top
      </Toggle>
      <Toggle icon={Star}>Featured</Toggle>
      <Toggle icon={MessageSquare}>Comments</Toggle>
      <Toggle>Show drafts</Toggle>
    </>
  );
}
