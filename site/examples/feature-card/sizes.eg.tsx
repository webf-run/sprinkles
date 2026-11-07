import { FeatureCard } from '@webf/sprinkles';
import FlaskConical from 'lucide-solid/icons/flask-conical';

export default function Example() {
  return (
    <div class='grid w-full gap-4'>
      <FeatureCard
        size='s'
        icon={FlaskConical}
        title='Research labs'
        subtitle='28 centres'
      />
      <FeatureCard
        size='m'
        icon={FlaskConical}
        title='Research labs'
        subtitle='28 centres'
      />
      <FeatureCard
        size='l'
        icon={FlaskConical}
        title='Research labs'
        subtitle='28 centres'
      />
    </div>
  );
}
