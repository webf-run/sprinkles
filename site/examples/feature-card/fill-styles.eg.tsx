import { FeatureCard } from '@webf/sprinkles';
import FlaskConical from 'lucide-solid/icons/flask-conical';

export default function Example() {
  return (
    <div class='grid w-full gap-4 @md:grid-cols-2 @3xl:grid-cols-3'>
      <FeatureCard
        icon={FlaskConical}
        title='Research labs'
        subtitle='28 centres'
        fillStyle='outline'
      />
      <FeatureCard
        icon={FlaskConical}
        title='Research labs'
        subtitle='28 centres'
        fillStyle='subtle'
      />
      <FeatureCard
        icon={FlaskConical}
        title='Research labs'
        subtitle='28 centres'
        fillStyle='bold'
      />
    </div>
  );
}
