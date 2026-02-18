import { Eye, EyeOff, Mail, Search } from 'lucide-solid';
import { createSignal } from 'solid-js';

import type { Story, StoryMeta } from '../Playground/Playground.type.js';
import { TextInput } from './TextInput.js';

export const Meta: StoryMeta = {
  title: 'TextInput',
  component: TextInput,
};

export const Default: Story = {
  description: 'Basic text input without any additional features',
  render: () => <TextInput placeholder='Enter text here...' />,
};

export const WithLabel: Story = {
  title: 'With Label and Helper Text',
  description: 'Text input with label and helper text',
  render: () => (
    <TextInput
      label='Full Name'
      placeholder='Enter your full name'
      helperText='This will be displayed publicly'
    />
  ),
};

export const Required: Story = {
  title: 'Required Field',
  description: 'Text input marked as required',
  render: () => (
    <TextInput
      label='Email Address'
      placeholder='Enter your email'
      required
      type='email'
      helperText="We'll use this to contact you"
    />
  ),
};

export const WithLeftIcon: Story = {
  title: 'With Left Icon',
  description: 'Text input with a search icon on the left',
  render: () => (
    <TextInput
      label='Search'
      placeholder='Search for anything...'
      leftIcon={<Search />}
      type='search'
    />
  ),
};

export const WithRightIcon: Story = {
  title: 'With Right Icon',
  description: 'Email input with mail icon on the right',
  render: () => (
    <TextInput
      label='Email'
      placeholder='Enter your email address'
      rightIcon={<Mail />}
      type='email'
    />
  ),
};

export const WithBothIcons: Story = {
  title: 'With Both Icons',
  description: 'Text input with icons on both sides',
  render: () => (
    <TextInput
      label='Search Email'
      placeholder='Search emails...'
      leftIcon={<Search />}
      rightIcon={<Mail />}
      type='search'
    />
  ),
};

export const ErrorState: Story = {
  title: 'Error State',
  description: 'Text input in error state with error message',
  render: () => (
    <TextInput
      label='Username'
      placeholder='Enter username'
      value='invalid-user'
      invalid
      errorMessage='Username must be at least 3 characters long'
      leftIcon={<Search />}
    />
  ),
};

export const Disabled: Story = {
  title: 'Disabled State',
  description: 'Disabled text input',
  render: () => (
    <TextInput
      label='Disabled Input'
      placeholder='This input is disabled'
      value='Cannot edit this'
      disabled
      helperText='This field is currently disabled'
      leftIcon={<Mail />}
    />
  ),
};

export const ReadOnly: Story = {
  title: 'Read-only State',
  description: 'Read-only text input',
  render: () => (
    <TextInput
      label='Read-only Input'
      value='This is read-only content'
      readOnly
      helperText='This field is read-only'
      rightIcon={<Eye />}
    />
  ),
};

export const PasswordToggle: Story = {
  title: 'Password Input with Toggle',
  description: 'Password input with show/hide functionality',
  render: () => {
    const [showPassword, setShowPassword] = createSignal(false);

    return (
      <TextInput
        label='Password'
        placeholder='Enter your password'
        type={showPassword() ? 'text' : 'password'}
        required
        rightIcon={
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword())}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              display: 'flex',
              'align-items': 'center',
            }}
            aria-label={showPassword() ? 'Hide password' : 'Show password'}
          >
            {showPassword() ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
        helperText='Must be at least 8 characters'
      />
    );
  },
};

export const InputTypes: Story = {
  title: 'All Input Types',
  description: 'Different HTML input types',
  render: () => (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
      <TextInput label='Text' type='text' placeholder='Text input' />
      <TextInput label='Email' type='email' placeholder='email@example.com' />
      <TextInput label='Password' type='password' placeholder='Password' />
      <TextInput
        label='Search'
        type='search'
        placeholder='Search...'
        leftIcon={<Search />}
      />
      <TextInput label='URL' type='url' placeholder='https://example.com' />
      <TextInput label='Phone' type='tel' placeholder='+1 (555) 123-4567' />
    </div>
  ),
};

export const Controlled: Story = {
  title: 'Controlled Input',
  description: 'Text input with controlled value and input handling',
  render: () => {
    const [value, setValue] = createSignal('');

    return (
      <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
        <TextInput
          label='Controlled Input'
          placeholder='Type something...'
          value={value()}
          onInput={(e) => setValue(e.currentTarget.value)}
          helperText={`Character count: ${value().length}`}
          leftIcon={<Search />}
        />
        <div style={{ 'font-size': '0.875rem', color: 'var(--gray-600)' }}>
          Current value: "{value()}"
        </div>
      </div>
    );
  },
};

export const Validation: Story = {
  title: 'Validation Example',
  description: 'Text input with live validation',
  render: () => {
    const [email, setEmail] = createSignal('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = () => email() === '' || emailRegex.test(email());

    return (
      <TextInput
        label='Email Validation'
        type='email'
        placeholder='Enter your email'
        value={email()}
        onInput={(e) => setEmail(e.currentTarget.value)}
        invalid={!isValid()}
        errorMessage={
          !isValid() ? 'Please enter a valid email address' : undefined
        }
        helperText={
          isValid() && email()
            ? 'Email looks good!'
            : 'Enter a valid email address'
        }
        leftIcon={<Mail />}
      />
    );
  },
};
