import { FeatureCard } from '@webf/sprinkles';
import Dumbbell from 'lucide-solid/icons/dumbbell';
import FlaskConical from 'lucide-solid/icons/flask-conical';
import Palette from 'lucide-solid/icons/palette';
import Trophy from 'lucide-solid/icons/trophy';

export default function Example() {
  return (
    <div class='grid w-full gap-4 @md:grid-cols-2'>
      <FeatureCard
        icon={FlaskConical}
        title='Research labs'
        subtitle='28 centres'
        variant='accent'
      />
      <FeatureCard
        icon={Dumbbell}
        title='Sports facilities'
        subtitle='18 sports'
        variant='seafoam'
      />
      <FeatureCard
        icon={Palette}
        title='Arts and culture'
        subtitle='45+ clubs'
        variant='fuchsia'
      />
      <FeatureCard
        icon={Trophy}
        title='Awards'
        subtitle='12 this year'
        variant='highlight'
      />
    </div>
  );
}
