import { RangeSlider, type RangeSliderValue } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [current, setCurrent] = createSignal<RangeSliderValue>({
    start: 25,
    end: 75,
  });
  const [final, setFinal] = createSignal<RangeSliderValue>(current());

  return (
    <div class='grid w-full max-w-sm gap-3'>
      <RangeSlider
        label='Cookies to buy'
        value={current()}
        onChange={setCurrent}
        onChangeEnd={setFinal}
      />
      <p class='m-0 text-sm text-foreground-muted'>
        onChange: {JSON.stringify(current())}
        <br />
        onChangeEnd: {JSON.stringify(final())}
      </p>
    </div>
  );
}
