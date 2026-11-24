import { RangeSlider } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='grid w-full max-w-md gap-6'>
      <RangeSlider
        label='Top'
        labelPosition='top'
        defaultValue={{ start: 30, end: 60 }}
      />
      <RangeSlider
        label='Side'
        labelPosition='side'
        defaultValue={{ start: 30, end: 60 }}
      />
    </div>
  );
}
