/* global Package: false */
Package.describe({
  name: "dferber:react-create-blaze-template",
  version: "0.2.2",
  summary: "Use React components in Blaze templates",
  git: "https://github.com/dferber90/meteor-react-create-blaze-template",
  documentation: "README.md"
});

Package.onUse(function(api) {
  "use strict";
  api.versionsFrom("1.1.0.2");
  api.addFiles("react-create-blaze-template.js", "client");
  api.export("createBlazeTemplate", "client");
});
