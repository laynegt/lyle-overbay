# Overlay.js #

Overlay is a JavaScript library for creating modal overlays in the browser.

## Building ##

Requirements: npm, grunt-cli

To install grunt-cli:

```
npm install -g grunt-cli
```

Once grunt-cli is installed, run `build.sh`, which will install required modules and kick off the grunt build.

The outputs `overlay.js` and `overlay.css` will be created in `/dist`.

### Grunt tasks/options ###

The default grunt task will produce a minified `overlay.js`.  Run `grunt debug` to get non-minified output.  Run `grunt test` to only run qunit tests.

### jQuery is included ###

Overlay requires and comes bundled with jQuery v1.11.1.

## Usage ##

```
new Overlay(content, options)
```

`content` is a required parameter, while `options` is optional.  `content` is either a DOM element or image URL:

```
new Overlay($("<p>You've got modal!</p>"));
```

or

```
new Overlay("http://www.nicenicejpg.com/300");
```

### Configuration Options ###

```
new Overlay($("<p>Modal with options</p>", options);
```

Overlay accepts the following hash of options (all optional):

* `width`
* `height`
* `closeOnOutsideClick` - close the overlay when a place outside the content is clicked
* `closeOnInsideClick` - close the overlay when the content within is clicked
* `loadingMessage` - if the content is an image URL, the message to show while the image is loading

### Closing the overlay ###

An overlay can be closed by calling `overlay.close()`.  Only one overlay can be open at a time.

## Browser Compatibility ##

Overlay should work fine with IE6/7/8 due to the use of jQuery 1.x.  However you get a plain black underlay.

### Sources ###

http://api.jquery.com/
https://developer.mozilla.org/en-US/docs/Web
various SO articles on checking if a JS Object is a DOM element
http://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen
http://gruntjs.com/ docs

There were undoubtedly a few other SO articles that I neglected to note while in the rhythm of development.

### Third Party Libraries/Tools Used Within ###

jQuery v1.11.1
Grunt + Grunt build plugins (qunit, concat, uglify)
NPM/Node
QUnit

## Integration ###

## Ember.js

Overlay only supports programmatic creation, so you must create an `Ember.View` or `Ember.Component`, and call
`new Overlay()` within `didInsertElement`.  To cleanup the overlay, call `close()` on the Overlay object inside
`willDestroyElement`.

A more idiomatic approach would be to support declarative creation of an Overlay directly.  But putting an
`Ember.View/Component` wrapper around it still allows for declarative creation within Ember.

### Time spent ###

This took ~6 hours over two days.  Core functionality took 2.5-3 hours, the grunt build took an hour+, and
I spent another hour or so manual testing and polishing.  Writing this documentation took another hour.  I also spent
time catching up on the current state of CommonJS vs. AMD, etc. before deciding on using globals (simpler for this),
which I didn't count toward the time.
