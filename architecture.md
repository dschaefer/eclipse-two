# Eclipse Two Architecture Guide

- Platform is Electron, an awesome combination of Chromium and node.js
  - Chrome Dev Tools is also very useful for debugging and inspecting the pages
- After considering web front end frameworks, especially React, we're instead focusing on the core frameworks provided by the Chromium browser itself.
  - The UI elements are componentized using custom elements from the Web Components spec using document.registerElement.
  - Custom events are created to signal actions have been requested, like open-file.
- Use of third party libraries will be considered carefully
  - Care must be taken to ensure future proofing, but if use of a library is isolated, then that should be OK
  - For example, we've started using Font Awesome for icons.
  - We're trying hard not to use Bootstrap, convenient as it may be, it is somewhat opinionated on how it works
- In the end, using plain JS, CSS, and HTML is pretty good. w3schools is especially good at teaching CSS tricks.
- We are also using TypeScript.
  - In theory, the IDE will become quite large and we need to program like it and declare types as much as we can.
  - The tooling around TypeScript with Visual Studio Code is also great for learning what methods are available on the various classes.

## UI Architecture

This describes the current thinking around how we'll layout the UI. This will definitely evolve as we learn and as we get more ideas.

- Top level is a nav bar that selects between pages to view. This is similar to the Eclipse Perspective. However it is more whole.
- The pages are simply custom HTML elements. There is no preconceived notion of what's on the pages.
- To help around standardization of the look and feel and to speed development, we'll create a reusable collection of elements that
page designers can subclass.
