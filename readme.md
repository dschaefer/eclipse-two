# Eclipse Two

The real next-generation Eclipse IDE based on Electron.

The philosophy is to treat the IDE as a web-site which has access to local resources and tools as well as cloud based services.
It brings a new user experience to the desktop IDE that is friendly, integrated, and powerful.
The user starts with a dashboard of cards supplied by plug-ins that give the developer access to all the information they need to
do their jobs. From there, the IDE helps the user through working with code, checking that code into source control,
integrating changes with change management systems like JIRA or bugzilla, provides a user interface to cloud services like logs
allowing the developer to associate code changes with cloud resources.

The foundation is Electron which provides an HTML5 user interface with a node.js backend. Plug-ins will be dynamically loaded as
required and can launch and integrate with microservices. The Language Server Protocol will be a key part of this, as will protocols
that integrate other tools.

It's a platform that will serve us well for the next 20 years as Eclipse One has done for the last 20 years.

## Plan

### Phase 1 - Self Host

First stage is to get the IDE to the point where we can self host. That includes the following features

- File Explorer that navigates mounted directories and opens files in the editor.
- Text Editor that supports JavaScript, HTML, CSS, and package.json.
- Folder Editor that supports adding and removing files in a directory.
- Build support that runs 'npm run build' and presents output in a console pane
- Launch support that runs 'npm start', presents output, and has a stop button that kills the process

File Explorer will be hand roled using rc-tree (React Components Tree). Editor is Monaco.
Build and Launch will follow design language of Eclipse Launch Bar.

### Phase 2 - Git support

Add UI to work with Git to further support self hosting.
Also add Github page to support cloning of repo.

Use nodegit as underlying API for Git commands. Added pane to FolderEditor for git operations.
Some may be added to context menus in the FileExplorer.
Github page uses webview with code injection to add a button to clone and set up the workspace.

### Phase 3 - Native support

To support writing extensions using node.js's native build capability, we'll add C++ support
and start working with the LSP and CDT.

## Try it

To get the IDE running, once you check out of source control, do the following

```
npm install
npm run build
npm start
```

That's it. I also have a "watch" script you can use to auto build while developing.
I am also using Flow as a type checker which is pretty good at picking out errors with React.

## Contributing

See the [Architecture guide](architecture.md) for some of the philosophy we're taking here.
The keys are to use React for now since it gives us a great head start.
It's early days so be prepared for a lot of significant changes upstream while I work things out.
