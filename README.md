# create-blaze-template
This atmosphere package enables you to include React components into Blaze
templates.

# About
There are two packages which enable you to use React with Meteor.
One of them is `reactjs:react`, the other one is `grove:react`.

`reactjs:react` uses Reacts compiler to transform your jsx-files.
Unfortunately this will not transpile them for backwards compability.
However, it offers the nice feature to include React components directly in
Blaze templates.

`grove:react` uses [Babel](https://babeljs.io/) to transform jsx-files.
This makes the compiled js backwards compatible.
However, it lacks the feature of being able to directly include React
components into Blaze templates.


That's why I extracted the "use React components in
Blaze templates" feature from `reactjs:react` into this package.
The feature can now be used with any React component.



# Installation
```
$ meteor add dferber:react-create-blaze-template
```

# Usage

## 1. Define your React Component as usual
This step has nothing to do with this package. Simply define your React component.
```js
Bookface = React.createClass({
  mixins: [ ReactiveMixin ],

  getReactiveState: function() {
    return {
      friends: Friends.find().fetch(),
      loggedIn: !!Meteor.user()
    }
  },

  render: function() {
    if (this.state.loggedIn) {
        if (this.state.friends.length > 0) {
          return <h1>You've got friends!</h1>
        }
        return <h1>Forever alone...</h1>;
     }
     return <h1>Please log in</h1>
  }
});
```

## 2. Generate Blaze Template from the React Component
Use the function `createBlazeTemplate` provided by this package to
transform the React component into a Blaze template.
```js
createBlazeTemplate(Bookface, 'Bookface');
```

## 3. Include in Blaze
```html
<template name="layout">
	<div>
		{{> Bookface}}
		<p>Some text...</p>
	</div>
</template>
```


