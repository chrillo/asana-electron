a very basic electron wrapper for the Asana (https://app.asana.com). This is not an official project from Asana! I just wanted a desktop app with an icon.

building
========

  gulp build


this will run a small gulp script building the icon and then running electron packager, right now its just configured for mac. The final build will be available in the release folder.

TODO
====

- explore if there is a way to wire up a badge icon for overdue tasks
- explore if there is a way to have desktop notifications
