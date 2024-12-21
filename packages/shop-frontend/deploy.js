const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(
  path.join(__dirname, 'build'),
  {
    branch: 'gh-pages',
    repo: 'https://github.com/thanharmstrong86/AISHOP.git',
    dest: 'shop-frontend',
    message: 'Deploy shop-frontend'
  },
  err => {
    if (err) {
      console.error('Deployment failed:', err);
    } else {
      console.log('Deployment successful!');
    }
  }
);
