import { Slider } from '@webf/sprinkles';
import { createSignal } from 'solid-js';

export default function Example() {
  const [current, setCurrent] = createSignal(25);
  const [final, setFinal] = createSignal(current());

  return (
    <div class='grid w-full max-w-sm gap-3'>
      <Slider
        label='Cookies to buy'
        value={current()}
        onChange={setCurrent}
        onChangeEnd={setFinal}
      />
      <p class='m-0 text-sm text-foreground-muted'>
        onChange: {current()}
        <br />
        onChangeEnd: {final()}
      </p>
    </div>
  );
}
