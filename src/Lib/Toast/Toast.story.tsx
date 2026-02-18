import { Button } from '../Button/Button.jsx';
import type { Story } from '../Playground/Playground.type.js';
import { Toast, createToastStore } from './Toast.jsx';

export const Meta = {
  title: 'Toast',
  component: Toast,
};

export const Default: Story = {
  description:
    'Basic toast notifications using neutral, info, success, warning, and error states',
  render: () => {
    const toaster = createToastStore({ placement: 'bottom-end' });

    return (
      <>
        <div style='display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;'>
          <Button
            variant='secondary'
            onClick={() =>
              toaster.create({
                title: 'Item archived',
                description: 'Archive completed for selected records.',
              })
            }
          >
            Show Neutral
          </Button>

          <Button
            variant='secondary'
            onClick={() =>
              toaster.info({
                title: 'Information',
                description: 'Student profile details were refreshed.',
              })
            }
          >
            Show Info
          </Button>

          <Button
            variant='primary'
            onClick={() =>
              toaster.success({
                title: 'Saved',
                description: 'Student enrollment has been completed.',
              })
            }
          >
            Show Success
          </Button>

          <Button
            variant='outline'
            onClick={() =>
              toaster.warning({
                title: 'Missing fields',
                description: 'Some optional guardian fields are empty.',
              })
            }
          >
            Show Warning
          </Button>

          <Button
            variant='ghost'
            onClick={() =>
              toaster.error({
                title: 'Failed',
                description: 'Unable to save institute settings. Try again.',
                closable: true,
              })
            }
          >
            Show Error
          </Button>
        </div>

        <Toast toaster={toaster} />
      </>
    );
  },
};

export const MultiLineContent: Story = {
  title: 'Multi-line Content',
  description:
    'Demonstrates wrapping behavior for longer title and description content',
  render: () => {
    const toaster = createToastStore({ placement: 'bottom-end' });

    return (
      <>
        <Button
          variant='primary'
          onClick={() =>
            toaster.error({
              title:
                'Enrollment import could not be completed because multiple records are missing required attributes',
              description:
                'Please review required fields for guardian contact details and institutional identifiers, then retry the import from the admissions workspace.',
              closable: true,
            })
          }
        >
          Show Multi-line Toast
        </Button>

        <Toast toaster={toaster} />
      </>
    );
  },
};

export const Placement: Story = {
  title: 'Placement Variants',
  description: 'Show toasts from different screen placements',
  render: () => {
    const topStartToaster = createToastStore({ placement: 'top-start' });
    const topEndToaster = createToastStore({ placement: 'top-end' });

    return (
      <>
        <div style='display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;'>
          <Button
            variant='secondary'
            onClick={() =>
              topStartToaster.info({
                title: 'Top Start',
                description: 'Toast shown from the top-start placement.',
              })
            }
          >
            Top Start
          </Button>

          <Button
            variant='secondary'
            onClick={() =>
              topEndToaster.success({
                title: 'Top End',
                description: 'Toast shown from the top-end placement.',
              })
            }
          >
            Top End
          </Button>
        </div>

        <Toast toaster={topStartToaster} />
        <Toast toaster={topEndToaster} />
      </>
    );
  },
};

export const LoadingFlow: Story = {
  title: 'Loading Flow',
  description:
    'Update a loading toast into success once async work is complete',
  render: () => {
    const toaster = createToastStore({ placement: 'bottom-end' });

    const runSaveFlow = async () => {
      const toastId = toaster.create({
        type: 'loading',
        title: 'Saving data',
        description: 'Persisting student admission record.',
        closable: false,
      });

      await new Promise((resolve) => setTimeout(resolve, 1200));

      toaster.update(toastId, {
        type: 'success',
        title: 'Saved successfully',
        description: 'Student admission record is now available.',
        closable: true,
      });
    };

    return (
      <>
        <Button variant='primary' onClick={() => void runSaveFlow()}>
          Trigger Loading Flow
        </Button>
        <Toast toaster={toaster} />
      </>
    );
  },
};
