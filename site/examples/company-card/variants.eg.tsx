import { CompanyCard } from '@webf/sprinkles';

import GoogleLogo from '../../assets/company-logos/google.svg?raw';
import GitHubLogo from '../../assets/company-logos/github.svg?raw';
import DropboxLogo from '../../assets/company-logos/dropbox.svg?raw';
import AmazonLogo from '../../assets/company-logos/amazon.svg?raw';

export default function Example() {
  return (
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
      <CompanyCard variant='default' companyName='Google' logo={GoogleLogo} />

      <CompanyCard variant='muted' companyName='GitHub' logo={GitHubLogo} />

      <CompanyCard variant='accent' companyName='Microsoft' logo={DropboxLogo} />

      <CompanyCard variant='purple' companyName='Figma' logo={AmazonLogo} />

      <CompanyCard variant='green' companyName='Spotify' logo={GoogleLogo} />

      <CompanyCard variant='orange' companyName='Amazon' logo={GitHubLogo} />

      <CompanyCard variant='blue' companyName='Dropbox' logo={DropboxLogo} />

      <CompanyCard variant='neutral' companyName='Slack' logo={AmazonLogo} />
    </div>
  );
}
