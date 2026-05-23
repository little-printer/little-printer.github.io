---
title: Structure
---

:::caution
These pages serve a historic purpose only. With the BERG Cloud long offline, these reference pages _could_ be used to rebuild a faithful API. However, at this point no such effort has been made.
:::

# Creating a publication

*If you have any feedback or feature requests please contact publishers@bergcloud.com*

## How a publication works

A Little Printer publication is a small website. When it's time to deliver an edition of your publication to a subscriber's Little Printer, BERG Cloud requests the `/edition/` URL of your publication and the page displayed there is converted to a delivery that, shortly afterwards, is sent to the Little Printer.

There are many variations of this. For example, your publication might accept configuration variables that enable the delivery of different content to each user. More complex and personalised publications can also require subscribers to authenticate with third-party services (such as Twitter or Google) in order to deliver personalised content.

It is up to you which tools you use to build a publication – BERG Cloud doesn't mind if your website is built in Ruby, PHP, Python, etc. It's not possible to create a publication using only HTML (with or without JavaScript), because some required functionality (such as sending [ETag headers][]) relies on back-end code.

A publication's pages are standard web pages, using HTML/CSS, 384 pixels wide, in black and white (read more in the [style guide][]). The BERG Cloud rendering engine sits on top of a modified version of [WebKit][] and, with the assistance of [Phantom.js][], renders a web page to a two-tone PNG image which is queued for delivery to Little Printers.

As well as the `/edition/` endpoint, BERG Cloud expects other endpoints to be defined, and these enable users to subscribe, view a sample, enter configuration options, etc. These are outlined below, and described in detail on subsequent pages.

To run a publication you will need to:

- Create a website with the required endpoints.
- Go to your [~~publications~~][publications] and tell BERG Cloud where to find your website.

## Endpoints

Your publication's Base URL is the top-level of your small website. For example, we might put our publication at a Base URL like:

```
http://www.example.org/my-publication/
```

That URL itself doesn't need to deliver anything – BERG Cloud will never request it. The following endpoints are relative to that Base URL. So our example publication should have some or all of:

```
http://www.example.org/my-publication/meta.json
http://www.example.org/my-publication/edition/
http://www.example.org/my-publication/sample/
http://www.example.org/my-publication/icon.png
http://www.example.org/my-publication/validate_config/
http://www.example.org/my-publication/configure/
```

| Name            | REST URI                 | Description                                                                                                                                                                                                                                                                                                                                                                         |
| --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| meta.json       | `GET /meta.json`         | **Required.** The JSON in this file is displayed on BERG Cloud Remote to describe the publication to potential subscribers. It can also be used to add configuration options, and set some parameters required by calls to `/edition/`.                                                                                                                                             |
| edition         | `GET /edition/`          | **Required.** Returns a single edition of your publication for a subscriber. For some publications, such as miniseries, this will be the same for all subscribers. Configuration options (if any) will be passed in along with the Little Printer's current time and the number of this delivery (if these are requested in [meta.json][])                                      |
| sample          | `GET /sample/`           | **Required.** Returns sample content for the publication, which is displayed to potential subscribers in BERG Cloud Remote.                                                                                                                                                                                                                                                         |
| icon            | `GET /icon.png`          | **Required.** An icon to show in the list of publications on BERG Cloud Remote.                                                                                                                                                                                                                                                                                                     |
| validate_config | `POST /validate_config/` | **Optional.** This endpoint is only required if your publication is configurable by the subscriber. For example, if your subscriber must choose a difficulty level if your publication prints a puzzle. When someone subscribes to your publication, their input will be POSTed to this endpoint for you to validate it and return success or failure.                              |
| configure       | `GET /configure/`        | **Optional.** If your publication requires the user to authenticate with a third party (e.g. Foursquare, for a publication showing recent checkins), set `"external_config":true` in [meta.json][]. During the subscription process, a user will then be sent to this endpoint for your code to manage the authentication process, before it returns them to BERG Cloud Remote. |

On subsequent pages you can read more detailed information about each of these endpoints, starting with [meta.json][].

Source: [Wayback Machine][]

[ETag headers]: /reference/structure/edition#etags
[style guide]: /reference/style_guide/layout
[WebKit]: https://en.wikipedia.org/wiki/WebKit
[Phantom.js]: http://phantomjs.org/
[publications]: http://remote.bergcloud.com/developers/littleprinter/publications
[meta.json]: /reference/structure/metajson
[Wayback Machine]: https://web.archive.org/web/20150602014119/http://remote.bergcloud.com/developers/littleprinter/reference/structure
