# Eclipse Two Architecture Guide

- Platform is Electron, an awesome combination of Chromium and node.js
- Lifespan is expected to be 20+ years so picking frameworks needs to be done carefully. Only long proven frameworks will be accepted.
  - To start, we accept and use Bootstrap and JQuery.
- Use custom elements for componentizing the UI. Not much else interesting from web components.
- Typescript is the language of choice. The application will grow pretty large and Typescript provides good modularity and type enforcement.
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
