import { CompanyCard } from '@webf-run/sprinkles';

import DropboxLogo from '../../assets/company-logos/dropbox.svg?raw';
import GitHubLogo from '../../assets/company-logos/github.svg?raw';
import GoogleLogo from '../../assets/company-logos/google.svg?raw';

export default function Example() {
  return (
    <div class='flex items-center gap-4 overflow-x-auto'>
      <CompanyCard
        size='sm'
        variant='blue'
        companyName='Microsoft'
        logo={GoogleLogo}
      />

      <CompanyCard
        size='md'
        variant='purple'
        companyName='Figma'
        logo={GitHubLogo}
      />

      <CompanyCard
        size='lg'
        variant='neutral'
        companyName='Google'
        logo={DropboxLogo}
      />
    </div>
  );
}
