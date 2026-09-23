import { CompanyCard } from '@webf/sprinkles';

import GoogleLogo from '../../assets/company-logos/google.svg?raw';
import GitHubLogo from '../../assets/company-logos/github.svg?raw';
import DropboxLogo from '../../assets/company-logos/dropbox.svg?raw';
import AmazonLogo from '../../assets/company-logos/amazon.svg?raw';

export default function Example() {
  return (
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
      <CompanyCard variant='purple' companyName='Google' logo={GoogleLogo} />

      <CompanyCard variant='orange' companyName='GitHub' logo={GitHubLogo} />

      <CompanyCard variant='green' companyName='Spotify' logo={DropboxLogo} />

      <CompanyCard variant='blue' companyName='Microsoft' logo={AmazonLogo} />

      <CompanyCard variant='neutral' companyName='Figma' logo={GoogleLogo} />
    </div>
  );
}
