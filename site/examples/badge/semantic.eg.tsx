import { Badge } from '@webf/sprinkles';

export default function Example() {
  return (
    <>
      <Badge variant='accent'>New</Badge>
      <Badge variant='neutral'>Draft</Badge>
      <Badge variant='informative'>Scheduled</Badge>
      <Badge variant='positive'>Published</Badge>
      <Badge variant='notice'>Needs review</Badge>
      <Badge variant='negative'>Failed</Badge>
      <Badge variant='highlight'>Admissions open</Badge>
    </>
  );
}
