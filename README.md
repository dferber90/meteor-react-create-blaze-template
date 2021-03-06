# create-blaze-template
This atmosphere package enables you to include React components into Blaze
templates.

# MDG official integration announcement
This package has been available for some time. In the meantime the Meteor
Development Group has started to work on official packages for React
support. I recommend switching to their packages once they are released.
They are available here [github.com/meteor/react-packages](https://github.com/meteor/react-packages).

However, you can still use this package until these are released.
This package will marked as deprecated once MDG's solution is ready.

This package also has an [issue](https://github.com/dferber90/meteor-react-create-blaze-template/issues/1) in case the parent blaze template's data changes.

---


# About
There are two packages which enable you to use React with Meteor.
One of them is `reactjs:react`, the other one is `grove:react`.

`reactjs:react` uses Reacts compiler to transform your jsx-files.
Unfortunately this will not transpile them for backwards compatibility.
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
	</div>
	<p>Some text...</p>
</template>
```


# Shorthand
Every React component is automatically assigned a [displayName](https://facebook.github.io/react/docs/component-specs.html#displayname).
This name will be used as the template name when omitting the second parameter
to `createBlazeTemplate`.

Imagine the React component `Bookface` from the previous example.
Its displayName is `Bookface`. We can omit the template name as you see below.
```js
createBlazeComponent(Bookface);
````
Now we can stil render it with `{{> Bookface}}`.


# Attention

`componentWillUnmount` will only be called in case the React component
has no siblings in the Blaze template.

## componentWillUnmount will be called:
```html
<template name="layout">
	<div>
		{{> Bookface}}
	</div>
	<p>Some text...</p>
</template>
```

## componentWillUnmount will NOT be called:
```html
<template name="layout">
	<div>
		{{> Bookface}}
		<p>Some text...</p>
	</div>
</template>
```


License

The MIT License (MIT)

Copyright (c) 2015 Dominik Ferber

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


