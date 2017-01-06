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
- In the ends, using plain JS, CSS, and HTML is pretty good. w3schools is especially good at teaching CSS tricks.
- We are also using TypeScript.
  - In theory, the IDE will become quite large and we need to program like it and declare types as much as we can.
  - The tooling around TypeScript with Visual Studio Code is also great for learning what methods are available on the various classes.

The following things are plans. These things haven't been implemented yet and may change as we discuss them.

- UI is organized as a hierarchical collection of Views.
  - Views contain other Views.
  - The top most view is selected from the Nav Bar
  - Routes select what to show down the hierarchy
- Plug-in architecture similar to Eclipse
  - extension point registry to avoid loading javascript files until needed
  - Use a plugin.json file to specify extensions, extension points
- Since we'll be reusing a lot of core plug-ins from Eclipse One would be good to co-ordinate that
  - Have an Equinox instance running that we can install the needed plug-ins into.
- Reuse an existing editor. For now choose Monaco. Switch to something else if it's better
- Allow for registering other editors, mostly graphical for different file types
  - e.g. link script editor that shows the memory layout graphically
