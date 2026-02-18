import { Bold, Italic, Volume, VolumeOff } from 'lucide-solid';
import { createSignal } from 'solid-js';

import type { Story } from '../Playground/Playground.type.js';
import { Toggle } from './Toggle.js';

export const Meta = {
  title: 'Toggle',
  component: Toggle,
};

export const Default: Story = {
  description: 'Basic toggle with default styling',
  render: () => {
    const [pressed, setPressed] = createSignal(false);
    return (
      <Toggle pressed={pressed()} onPressedChange={setPressed}>
        <Bold />
      </Toggle>
    );
  },
};

export const Primary: Story = {
  title: 'Primary',
  description: 'Primary toggle with high visual prominence',
  render: () => {
    const [pressed1, setPressed1] = createSignal(false);
    const [pressed2, setPressed2] = createSignal(false);
    const [pressed3, setPressed3] = createSignal(false);
    return (
      <div style='display: flex; gap: 1rem; align-items: center;'>
        <Toggle
          variant='primary'
          size='sm'
          pressed={pressed1()}
          onPressedChange={setPressed1}
        >
          <Bold />
        </Toggle>
        <Toggle
          variant='primary'
          size='md'
          pressed={pressed2()}
          onPressedChange={setPressed2}
        >
          <Bold />
        </Toggle>
        <Toggle
          variant='primary'
          size='lg'
          pressed={pressed3()}
          onPressedChange={setPressed3}
        >
          <Bold />
        </Toggle>
      </div>
    );
  },
};

export const Secondary: Story = {
  description: 'Secondary toggle with moderate visual prominence',
  render: () => {
    const [pressed1, setPressed1] = createSignal(false);
    const [pressed2, setPressed2] = createSignal(false);
    const [pressed3, setPressed3] = createSignal(false);
    return (
      <div style='display: flex; gap: 1rem; align-items: center;'>
        <Toggle
          variant='secondary'
          size='sm'
          pressed={pressed1()}
          onPressedChange={setPressed1}
        >
          <Italic />
        </Toggle>
        <Toggle
          variant='secondary'
          size='md'
          pressed={pressed2()}
          onPressedChange={setPressed2}
        >
          <Italic />
        </Toggle>
        <Toggle
          variant='secondary'
          size='lg'
          pressed={pressed3()}
          onPressedChange={setPressed3}
        >
          <Italic />
        </Toggle>
      </div>
    );
  },
};

export const Outline: Story = {
  description: 'Outline toggle with subtle styling',
  render: () => {
    const [pressed1, setPressed1] = createSignal(false);
    const [pressed2, setPressed2] = createSignal(false);
    const [pressed3, setPressed3] = createSignal(false);
    return (
      <div style='display: flex; gap: 1rem; align-items: center;'>
        <Toggle
          variant='outline'
          size='sm'
          pressed={pressed1()}
          onPressedChange={setPressed1}
        >
          <Bold />
        </Toggle>
        <Toggle
          variant='outline'
          size='md'
          pressed={pressed2()}
          onPressedChange={setPressed2}
        >
          <Bold />
        </Toggle>
        <Toggle
          variant='outline'
          size='lg'
          pressed={pressed3()}
          onPressedChange={setPressed3}
        >
          <Bold />
        </Toggle>
      </div>
    );
  },
};

export const WithDifferentContent: Story = {
  description: 'Toggle with different content for pressed/unpressed states',
  render: () => {
    const [volumePressed, setVolumePressed] = createSignal(false);
    const [textPressed, setTextPressed] = createSignal(false);
    return (
      <div style='display: flex; gap: 1rem; align-items: center;'>
        <Toggle
          variant='primary'
          pressed={volumePressed()}
          onPressedChange={setVolumePressed}
          pressedContent={<VolumeOff />}
        >
          <Volume />
        </Toggle>
        <Toggle
          variant='outline'
          pressed={textPressed()}
          onPressedChange={setTextPressed}
          pressedContent='ON'
        >
          OFF
        </Toggle>
      </div>
    );
  },
};

export const Disabled: Story = {
  description: 'Disabled toggles that cannot be interacted with',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Toggle variant='primary' disabled>
        <Bold />
      </Toggle>
      <Toggle variant='secondary' disabled>
        <Italic />
      </Toggle>
      <Toggle variant='outline' disabled>
        <Bold />
      </Toggle>
    </div>
  ),
};

export const Pressed: Story = {
  description: 'Toggles in pressed state',
  render: () => (
    <div style='display: flex; gap: 1rem; align-items: center;'>
      <Toggle variant='primary' pressed>
        <Bold />
      </Toggle>
      <Toggle variant='secondary' pressed>
        <Italic />
      </Toggle>
      <Toggle variant='outline' pressed>
        <Bold />
      </Toggle>
    </div>
  ),
};

export const Interactive: Story = {
  description: 'Toggles with change handlers',
  render: () => {
    const [pressed1, setPressed1] = createSignal(false);
    const [pressed2, setPressed2] = createSignal(false);
    return (
      <div style='display: flex; gap: 1rem; align-items: center;'>
        <Toggle
          variant='primary'
          pressed={pressed1()}
          onPressedChange={(pressed) => {
            setPressed1(pressed);
            alert(`Primary toggle: ${pressed ? 'ON' : 'OFF'}`);
          }}
        >
          <Bold />
        </Toggle>
        <Toggle
          variant='secondary'
          pressed={pressed2()}
          onPressedChange={(pressed) => {
            setPressed2(pressed);
            console.log(`Secondary toggle: ${pressed ? 'ON' : 'OFF'}`);
          }}
        >
          <Italic />
        </Toggle>
      </div>
    );
  },
};
