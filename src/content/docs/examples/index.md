---
title: 'Examples'
---

Here we have a couple of detailed step-by-step looks at how publications are created:

[Hello World][]  
This very basic publication demonstrates how to present each subscriber with options, and deliver personalised content based on these.

[Miniseries][]  
This shows a simple kind of publication, with a different static edition delivered to all subscribers.

[Push API][]  
This is based on the Hello World example, but uses the Push API to deliver content to all subscribers at the press of a button, rather than on a schedule.

## Publications on GitHub

We also have a code for some of our live publications available [on GitHub][]. These are mostly written in Ruby with [Sinatra][] and include:

[Daily Puzzle][]
Publishes a new Sudoku puzzle every day.

[Word of the Day][]
Every day it fetches a word from a third-party source and publishes it.

[How Many People In Space?][]
Fetches data from a third-party page and only publishes a new edition on days when that data changes.

[Daily Weather][]
Publishes a daily weather forecast based on the subscriber's location. It is an example of: providing a custom form with a map for the user to select their location; providing a further form for preferences using the standard Publication API config fields; and fetching weather data from [Forecast.io][].

[Your Best Tweets][]
Displays the subscriber's most Retweeted and Favourited Tweets from the previous day. An example of authenticating a subscriber with a Twitter account and fetching data from Twitter to display.

[Google Analytics][]
This publication displays a subscriber's Google Analytics data as graphs. It demonstrates: publishing separate daily and weekly publications from the same code; authenticating a subscriber with Google Analytics using OAuth 2; presenting the subscriber with a custom options form before returning them to BERG Cloud Remote; and displaying charts using [LP Chart][].

[Gmail Stats][]
Displays charts showing data about the subscriber's Gmail mailboxes. It's an example of: authenticating with Google using OAuth 2.0; authenticating with Gmail's IMAP; fetching data from Gmail; presenting the subscriber with an extra configuration step before returning them to BERG Cloud Remote; and displaying charts using [LP Chart][].

[GitHub Events][]
Two publications from one codebase, displaying either a subscriber's personal GitHub News Feed or events for one of their organizations. It's an example of: authenticating with GitHub using OAuth 2; fetching data from GitHub; and presenting the subscriber with an extra configuration step before returning them to BERG Cloud Remote.

[Twitter Direct Messages][]
This is an example of a publication that uses the Push API. Although it relies on having access to Twitter Site Streams, it's also an example of how to authenticate users with Twitter, how to handle streams of Tweets, and how to periodically push those to subscribers' Little Printers.

## Further helpful code

If you want to make a miniseries publication but your technical skills only stretch as far as uploading PHP files to a server, take a look at our [PHP miniseries template][]. This, with its instructions, makes it possible to create a miniseries without writing any code of your own.

If you want to display line charts in your publication, have a look at our [LP Chart][]. This is based on [d3][] and is a JavaScript helper that makes it much easier to display charts tailored to Little Printer's requirements.

## Publications written by others

Lots of people have made publications using the Publications API and then shared their code. If you're working on a project that you'd like to see on this list email developers@bergcloud.com

- [little-printer-appengine][] (Python/Google App Engine)
- [Little Printer using Node][] (Node.js)
- [Constellatio][] (PHP)
- [Maze-a-day][] (Python/JavaScript)
- [On This Day][] (PHP)
- [Utata tribal photography][] (PHP)
- [Lunchbox notes][] (Ruby/Rails)
- [Nostalgia][] (Ruby/Rails)
- [Little Publisher][] (Ruby)

There are also some things being made using our Direct Print API:

- [Little Receipt Printer][]
- [littleprinteremailbridge][]
- [Little notepad][]

Source: [Wayback Machine][]

[Hello World]: /examples/hello_world
[Miniseries]: /examples/miniseries
[Push API]: /examples/push
[on GitHub]: https://web.archive.org/web/20150205075434/https://github.com/bergcloud
[Sinatra]: http://www.sinatrarb.com/
[Daily Puzzle]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-daily-puzzle
[Word of the Day]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-word-of-the-day
[How Many People In Space?]: https://web.archive.org/web/20140505001456/http://remote.bergcloud.com/developers/littleprinter/examples/#:~:text=How%20Many%20People%20In%20Space%3F
[Daily Weather]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-weather
[Forecast.io]: http://forecast.io/
[Your Best Tweets]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-your-best-tweets
[Google Analytics]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-google-analytics
[Gmail Stats]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-gmail
[LP Chart]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-chart
[GitHub Events]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-github-events
[Twitter Direct Messages]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-twitter-dm-push
[PHP miniseries template]: https://web.archive.org/web/20140505001456/https://github.com/bergcloud/lp-php-miniseries
[d3]: http://d3js.org/
[little-printer-appengine]: https://github.com/liquidx/little-printer-appengine
[Little Printer using Node]: http://roylines.co.uk/2012/10/07/publishing-for-little-printer-using-node-and-heroku.html
[Constellatio]: https://github.com/albyr/constellatio
[Maze-a-day]: https://github.com/knolleary/amazing
[On This Day]: https://github.com/alfo/onthisday
[Utata tribal photography]: https://github.com/dopiaza/utata-little-printer
[Lunchbox notes]: https://github.com/jlooper/lunchboxnotes.git
[Nostalgia]: https://github.com/msolli/nostalgia
[Little Publisher]: https://github.com/Callygraphy/littlepublisher
[Little Receipt Printer]:http://remote.bergcloud.com/developers/littleprinter/examples/#:~:text=Little%20Receipt%20Printer
[littleprinteremailbridge]:http://littleprinteremailbridge.com/
[Little notepad]:http://dopiaza.org/littleprinter/notepad/
[Wayback Machine]: https://web.archive.org/web/20140505001456/http://remote.bergcloud.com/developers/littleprinter/examples/
