import { CompanyCard } from '@webf/sprinkles';

import GoogleLogo from '../../assets/company-logos/google.svg?raw';
import GitHubLogo from '../../assets/company-logos/github.svg?raw';
import DropboxLogo from '../../assets/company-logos/dropbox.svg?raw';
import AmazonLogo from '../../assets/company-logos/amazon.svg?raw';

export default function Example() {
  return (
    <div class="flex flex-row gap-4 overflow-x-auto">
      <CompanyCard
        class='w-36 shrink-0'
        size='sm'
        variant='neutral'
        companyName='Google'
        logo={GoogleLogo}
      />

      <CompanyCard
        class='w-40 shrink-0'
        size='md'
        variant='purple'
        companyName='GitHub'
        logo={GitHubLogo}
      />

      <CompanyCard
        class='w-48 shrink-0'
        size='lg'
        variant='orange'
        effect='lift'
        companyName='Amazon'
        logo={AmazonLogo}
      />

      <CompanyCard
        class='w-40 shrink-0'
        size='md'
        variant='green'
        companyName='Spotify'
        logo={DropboxLogo}
      />

      <CompanyCard
        class='w-36 shrink-0'
        size='sm'
        variant='blue'
        effect='scale'
        companyName='Figma'
        logo={GitHubLogo}
      />
    </div>
  );
}
