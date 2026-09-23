import { CompanyCard } from '@webf/sprinkles';

import GoogleLogo from '../../assets/company-logos/google.svg?raw';
import GitHubLogo from '../../assets/company-logos/github.svg?raw';
import DropboxLogo from '../../assets/company-logos/dropbox.svg?raw';
import AmazonLogo from '../../assets/company-logos/amazon.svg?raw';

export default function Example() {
  return (
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <CompanyCard companyName='Google' logo={GoogleLogo} />

      <CompanyCard companyName='GitHub' logo={GitHubLogo} />

      <CompanyCard companyName='Microsoft' logo={DropboxLogo} />

      <CompanyCard companyName='Amazon' logo={AmazonLogo} />
    </div>
  );
}
