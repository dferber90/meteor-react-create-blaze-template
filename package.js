Package.describe({
  name: 'dferber:react-create-blaze-template',
  version: '0.0.1',
  summary: 'Use React components in Blaze templates',
  git: 'https://github.com/dferber90/meteor-react-create-blaze-template',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('react-create-blaze-template.js', 'client');
  api.export('createBlazeTemplate', 'client');
});
