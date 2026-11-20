import { HeroBanner } from '@webf/sprinkles';
import Award from 'lucide-solid/icons/award';
import BookOpen from 'lucide-solid/icons/book-open';
import Tag from 'lucide-solid/icons/tag';
import Video from 'lucide-solid/icons/video';
import { For } from 'solid-js';

const highlights = [
  {
    icon: BookOpen,
    title: 'Expert-led courses',
    text: 'Practical, project-based',
  },
  { icon: Video, title: 'Learn anytime', text: 'On any device, at your pace' },
  { icon: Award, title: 'Certificates', text: 'Recognised by employers' },
];

/** An online-learning hero: photo on the left, copy on the right, a row of reasons to join. */
export default function Example() {
  return (
    <HeroBanner
      layout='overlay'
      surface='accent'
      scrim='soft'
      contentSide='end'
      image='/images/cc/students-reading.jpg'
      imagePosition='left'
      eyebrow='Lumen Academy · Your learning journey starts here'
      title='Build skills today. Shape your tomorrow.'
      description='Discover practical online courses designed by industry professionals. Learn new skills, work on real projects and move forward with confidence.'
      primaryAction={{ label: 'Explore courses', href: '#courses' }}
      secondaryAction={{ label: 'Try a free lesson', href: '#free-lesson' }}
      note='Flexible learning · Need help choosing? Call +91 98765 43210'
      bottomContent={
        <ul class='m-0 grid list-none gap-3 p-0 @xl:grid-cols-2 @5xl:grid-cols-4'>
          <li class='flex items-center gap-3 rounded-2xl bg-highlight p-3 text-highlight-foreground shadow-elevated'>
            <span class='grid size-10 shrink-0 place-items-center rounded-xl bg-highlight-foreground/10'>
              <Tag class='size-5' aria-hidden='true' />
            </span>
            <span>
              <span class='block text-sm font-bold'>20% off</span>
              <span class='block text-xs'>Your first course</span>
            </span>
          </li>
          <For each={highlights}>
            {(item) => (
              <li class='flex items-center gap-3 rounded-2xl border border-border-muted bg-surface/95 p-3 shadow-elevated backdrop-blur-md'>
                <span class='grid size-10 shrink-0 place-items-center rounded-xl bg-informative-subtle text-informative-subtle-foreground'>
                  <item.icon class='size-5' aria-hidden='true' />
                </span>
                <span>
                  <span class='block text-sm font-semibold text-foreground-strongest'>
                    {item.title}
                  </span>
                  <span class='block text-xs text-foreground-muted'>
                    {item.text}
                  </span>
                </span>
              </li>
            )}
          </For>
        </ul>
      }
    />
  );
}
