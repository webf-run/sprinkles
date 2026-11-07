import {
  Badge,
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
        title='Admissions 2027'
        description='/admissions · edited 2 hours ago by Meera Iyer'
        actions={
          <IconButton
            quiet
            icon={Ellipsis}
            aria-label='More actions for Admissions 2027'
          />
        }
      />
      <CardBody>
        <p class='m-0'>
          Dates, eligibility and fees for the 2027 intake. Applications open on
          1 December.
        </p>
      </CardBody>
      <CardFooter>
        <Badge variant='notice'>Draft</Badge>
        <Button class='ml-auto' size='s'>
          Publish
        </Button>
      </CardFooter>
    </Card>
  );
}
