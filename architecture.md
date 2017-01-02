# Eclipse Two Architecture Guide

Note, I am experimenting with custom elements as a replacement for React. It's a more VanillaJS way of doing this and so far it's working well.
This may change the decision on frameworks in the upcoming days.

- Platform is Electron, an awesome combination of Chromium and node.js
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
- It's been difficult to decide what to use for an app framework. Here's what I considered
  - Web Components, or at least custom elements.
    - Very hard to use.
    - Want to get this up and running quickly.
  - Angular 2
    - Certainly a lot of buzz. Complete framework. Google.
    - But is it really that popular yet, will it be?
  - React
    - Have some experience with React.
    - Our main wish is to provide a collection of reusable components
    - Popularity is rising. Tools are mature.
    - JSX is weird, but I think we need a template language anyway. As good as any.
- React
  - To start, we'll use React.
  - Use react-bootstrap to get bootstrap.
  - Build with babel directly. Don't need to minimize during development.
  - Use flow for type checking.
  - Typescript would be nice, but React seems pretty against it. And even then what does it's future really hold?