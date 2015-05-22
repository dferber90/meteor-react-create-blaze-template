/*
  This whole file is based on
  https://github.com/reactjs/react-meteor/blob/master/src/ReactMeteor.js

  First, specify a name for your component, e.g.
  createBlazeTemplate(ReactCompnoent, 'ReactComponentName');
  Now, you can include React Components into Blaze Templates with
  {{> ReactComponentName}}
*/

createBlazeTemplate = function (Component, templateName) {
  if (typeof Template === "function" &&
      typeof templateName === "string") {
    var template = new Template(
      templateName,
      function() {
        // A placeholder HTML element that will serve as the mounting
        // point for the React component. May have siblings!
        return new HTML.SPAN;
      }
    );

    template.onRendered(function() {
      renderInPlaceOfNode(
        // Equivalent to <Cls {...this.data} />:
        React.createElement(Component, this.data || {}),
        this.find("span")
      );
    });

    Template[templateName] = template;
  }
};

// Like React.render, but it replaces targetNode, and works even if
// targetNode.parentNode has children other than targetNode.
function renderInPlaceOfNode(reactElement, targetNode) {
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

  var result = React.render(reactElement, container);
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

  return result;
}
