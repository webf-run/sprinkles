import { Button, Popover, TextField } from '@webf/sprinkles';

export default function Example() {
  return (
    <Popover
      trigger={(props) => (
        <Button {...props} variant='secondary'>
          SEO settings
        </Button>
      )}
      title='SEO settings'
      class='w-80'
    >
      <TextField label='Search title' defaultValue='Admissions 2027' />
      <TextField label='Description' defaultValue='How to apply for 2027.' />
      <TextField label='Canonical URL' defaultValue='/admissions-2027' />
      <TextField label='Social image' defaultValue='admissions-hero.jpg' />
      <Button class='self-end'>Save</Button>
    </Popover>
  );
}
