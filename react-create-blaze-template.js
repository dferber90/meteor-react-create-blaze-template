/*
  This whole file is based on
  https://github.com/reactjs/react-meteor/blob/master/src/ReactMeteor.js

  Also includes unmounting, based on
  https://github.com/hmeerlo/react-meteor/commit/2670246b04649e2c63c443b13f9c47cb93aee4bf

  First, specify a name for your component, e.g.
  createBlazeTemplate(ReactCompnoent, 'ReactComponentName');
  Now, you can include React Components into Blaze Templates with
  {{> ReactComponentName}}
*/

/* global
  createBlazeTemplate: true
  Template: false
  HTML: false
  React: false
*/
/*eslint no-unused-vars: 0*/


// Like React.render, but it replaces targetNode, and works even if
// targetNode.parentNode has children other than targetNode.
var renderInPlaceOfNode = function (reactElement, targetNode) {
  "use strict";
  var container = targetNode.parentNode;
  var prevSibs = [];
  var nextSibs = [];
  var sibs = prevSibs;
  var child = container.firstChild;

  while (child) {
    if (child === targetNode) {
      sibs = nextSibs;
    } else {
      sibs.push(child);
    }
    var next = child.nextSibling;
    container.removeChild(child);
    child = next;
  }

  React.render(reactElement, container);
  var rendered = container.firstChild;

  if (prevSibs.length > 0) {
    prevSibs.forEach(function(sib) {
      container.insertBefore(sib, rendered);
    });
  }

  if (nextSibs.length > 0) {
    nextSibs.forEach(function(sib) {
      container.appendChild(sib);
    });
  }

  return container;
};

createBlazeTemplate = function (Component, optionalTemplateName) {
  "use strict";
  var templateName = optionalTemplateName || Component.displayName;
  if (
    !Component ||
    typeof Template !== "function"
    || typeof templateName !== "string"
  ) { return; }

  var template = new Template(
    templateName,
    function() {
      // A placeholder HTML element that will serve as the mounting
      // point for the React component. May have siblings!
      return new HTML.SPAN();
    }
  );

  // unmount component when template is destroyed, based on
  // https://github.com/hmeerlo/react-meteor/commit/2670246b04649e2c63c443b13f9c47cb93aee4bf
  template.onRendered(function() {
    var self = this;

    self.container = renderInPlaceOfNode(
      // Equivalent to <Component {...this.data} />:
      React.createElement(Component, this.data || {}),
      this.find("span")
    );
/*
    self.autorun(function() {
      React.render(
        React.createElement(
          Component,
          Template.currentData() || {}
        ),
        self.container
      );
    });
*/
  });

  template.onDestroyed(function () {
    React.unmountComponentAtNode(this.container);
  });

  Template[templateName] = template;
};
