import { Button } from '../Button/Button.js';
import type { Story } from '../Playground/Playground.type.js';
import { Dialog, createDialog } from './Dialog.js';

export const Meta = {
  title: 'Dialog',
  component: Dialog,
};

export const Default: Story = {
  description: 'Basic modal dialog with title, description, and body content',
  render: () => {
    const dialog = createDialog();

    return (
      <div>
        <Button variant='primary' onClick={() => dialog().setOpen(true)}>
          Open Dialog
        </Button>

        <Dialog
          controller={dialog}
          title='Create Institute'
          description='Fill required details before submitting this action.'
        >
          <div style='display: grid; gap: 0.75rem;'>
            <p style='margin: 0; color: var(--text-secondary);'>
              This dialog can host form controls, confirmations, or contextual
              details for institute workflows.
            </p>

            <div style='display: flex; gap: 0.5rem; justify-content: flex-end;'>
              <Button variant='secondary'>Cancel</Button>
              <Button variant='primary'>Continue</Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const Sizes: Story = {
  description: 'Dialog width variants for different content needs',
  render: () => {
    const smallDialog = createDialog();
    const mediumDialog = createDialog();
    const largeDialog = createDialog();

    return (
      <div style='display: grid; gap: 0.75rem; align-items: start; justify-content: start;'>
        <div style='display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;'>
          <Button
            variant='secondary'
            onClick={() => smallDialog().setOpen(true)}
          >
            Small
          </Button>
          <Dialog
            controller={smallDialog}
            size='sm'
            title='Small Dialog'
            description='Compact prompt for short content.'
          >
            <p style='margin: 0;'>
              Use this for concise confirmation workflows.
            </p>
          </Dialog>

          <Button
            variant='secondary'
            onClick={() => mediumDialog().setOpen(true)}
          >
            Medium
          </Button>
          <Dialog
            controller={mediumDialog}
            size='md'
            title='Medium Dialog'
            description='Balanced layout for standard forms.'
          >
            <p style='margin: 0;'>
              Use this as the default general-purpose size.
            </p>
          </Dialog>
          <Button
            variant='secondary'
            onClick={() => largeDialog().setOpen(true)}
          >
            Large
          </Button>
          <Dialog
            controller={largeDialog}
            size='lg'
            title='Large Dialog'
            description='Wider surface for rich content and review steps.'
          >
            <p style='margin: 0;'>
              Useful for complex forms and multi-section data.
            </p>
          </Dialog>
        </div>
      </div>
    );
  },
};
