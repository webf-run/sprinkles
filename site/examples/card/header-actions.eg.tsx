import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
} from '@webf/sprinkles';
import Ellipsis from 'lucide-solid/icons/ellipsis';

export default function Example() {
  return (
    <Card class='w-full max-w-md'>
      <CardHeader
        title='Backups'
        description='Nightly at 02:00, kept for 30 days.'
        actions={
          <IconButton quiet icon={Ellipsis} aria-label='Backup options' />
        }
      />
      <CardBody>
        <p class='m-0'>The last backup finished at 02:04 today (184 MB).</p>
      </CardBody>
      <CardFooter class='justify-end'>
        <Button variant='secondary' fillStyle='outline' size='s'>
          Download
        </Button>
        <Button variant='secondary' size='s'>
          Back up now
        </Button>
      </CardFooter>
    </Card>
  );
}
