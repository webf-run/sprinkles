import { CompanyCard } from '@webf/sprinkles';

import GitHubLogo from '../../assets/company-logos/github.svg?raw';
import DropboxLogo from '../../assets/company-logos/dropbox.svg?raw';
import AmazonLogo from '../../assets/company-logos/amazon.svg?raw';

export default function Example() {
  return (
    <div class="flex flex-wrap items-center gap-6">
      <CompanyCard size='md' effect='lift' companyName='Google' logo={GitHubLogo} />
      <CompanyCard
        size='md'
        effect='scale'
        companyName='GitHub'
        logo={DropboxLogo}
      />
      <CompanyCard
        size='md'
        effect='none'
        companyName='Microsoft'
        logo={AmazonLogo}
      />
    </div>
  );
}
