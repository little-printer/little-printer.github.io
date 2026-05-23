---
title: edition
---

The `/edition/` endpoint is requested by BERG Cloud to gather the latest content from your publication. It should return some HTML/CSS and an [ETag](#etags) defining the latest edition of the publication for this subscription. Viewing this URL in your browser should display what you expect to see printed out. BERG Cloud will call this endpoint once a day for each subscription.

There are several things to bear in mind with a publication's responses from `/edition/`:

- [Receiving and parsing parameters](#parameters) from the GET string.
- [Sending correct HTTP Status Codes](#statuscodes) for editions with no content, or finished publications.
- [Sending an ETag header](#etags) with an edition's content.
- [Setting the character set](#charactersets) in the Content-Type header.
- Formatting the content correctly for printing (see the [style guide][]).

A request to the `/edition/` endpoint will be something like:

```
GET http://[your site]/[optional directories]/edition/?[optional parameters]
```

For example:

```
GET http://example.org/edition/?local_delivery_time=2013-07-16T19:20:30+01:00&delivery_count=12
```

## Optional parameters

There are two optional parameters specified by BERG Cloud (`local_delivery_time` and `delivery_count`) along with any others defined in the config part of the publication's [meta.json] file.

### `local_delivery_time`

A request including only this parameter would look something like:

```
GET http://[your site]/edition/?local_delivery_time=2013-07-16T19:20:30+01:00
```

If `send_timezone_info` is set to `true` in [meta.json][] then the `local_delivery_time` parameter will be present in calls to `/edition/`.

The value provided is an [ISO 8601 timestamp][] representing the time in the timezone of the Little Printer for which this publication delivery is scheduled. So if a subscription is set up for 8am in New York, and it is winter, the timestamp provided will be `2012-05-05T08:00:00-05:00`. If your publication only publishes on specific days then you should use this timestamp to deduce if today is a delivery day for this subscriber.

### `delivery_count`

A request including only this parameter would look something like:

```
GET http://[your site]/edition/?delivery_count=12
```

If `send_delivery_count` is set to `true` in [meta.json][] BERG Cloud will provide the number of deliveries this user has received from you. If the delivery failed, or the user didn't print a delivery, the number will still increase.

This value is useful if you are providing a consecutive series of editions. This count starts from zero, so the fifth delivery will have a parameter like `delivery_count=6`.

### Configuration options

If your publication has config parameters specified in [meta.json][], then each call to `/edition/` will include the values the user submitted when subscribing.

If a publication had `name` and `language` configuration options, a request to `/edition/` with only these parameters would look something like:

```
GET http://[your site]/edition/?name=Édouard%20Vuillard&language=french
```

For more defails, see [validate_config][].

## HTTP status codes

Requests to `/edition/` should always return one of these:

- A `200` status code and content to be printed, with an ETag header.
- A `204` status code and no content if there is nothing to print for this subscriber.
- A `410` status code and no content if this is a finite publication and it has finished for this subscriber.

Sending a `204` or `410` status code is done something like this in [Sinatra][] (Ruby):

```
return 204
```

In [Flask][] (Python):

```
return Response(response=None, status=204)
```

In PHP:

```
http_response_code(204);
```

### 200

By default most languages and frameworks will, by default, send a status code of `200` when there's content to display. You shouldn't have to do anything special for this to happen.

### 204
If a request to a publication's `/edition/` returns no content, then the page should return a `204` (No Content) status code. This might be because your publication doesn't publish every day or because there is no content to deliver to this particular subscriber at this time.

### 410

If your publication is of a finite length (e.g. the user will receive ten editions and then the series is finished) you can, at the end of the content, return a status code of `410`. This will delete the subscription for the user and notify them that their subscription has ended, and they may resubscribe to receive the content from edition 0.

## ETags

BERG Cloud uses [HTTP ETags][] to ensure that users do not receive the same content twice. An ETag is a text string that is sent in the headers of a request to a webpage. If the content of the page changes then the value of the ETag should also change. This allows services, such as BERG Cloud, to quickly check whether a remote page's content has changed or not.

The ETag is sent in the [HTTP response headers][] of a webpage and is a string of characters. It looks like this:

```
ETag: "a9ea7b2f7e6f6db5385343fefe4fb563"
```

When you're making a publication, you need to generate an ETag for every request to `/edition/`. You should ensure that the ETag changes whenever the content changes. If the ETag stays the same then BERG Cloud will assume the content is also unchanged, which could result in subscribers not receiving any further editions.

### How to set ETags

We'll look at the different data you could use to set ETags appropriately in a moment, but first let's look at how you set them. In these initial examples we'll base the ETag solely on the `delivery_count` parameter – you may need to use something different, as outlined in the next section.

In [Sinatra][] (Ruby) an ETag is set like this:

```ruby
etag Digest::MD5.hexdigest(params[:delivery_count])
```

In Flask (Python):

```python
from flask import make_response
# Change the standard `return render_template()` to:
response = make_response(render_template('mytemplate.html', key=value))
response.headers['ETag'] = hashlib.md5(
                                    str( request.args.get('delivery_count', 0) )
                                  ).hexdigest()
return response
```

In PHP:

```php
header('ETag: "' . md5($_GET['delivery_count']) . '"');
```

Because ETags are part of the HTTP respnse headers they must be generated by code on the server-side. It is impossible to generate them with something like JavaScript running on the client-side. You should also be sure to set the ETag before you display any of your page content.

### How often to change ETags

The data used to generate an ETag depends on how your publication works. If your publication is a miniseries that shows a different image every day, with the content changing based on the `delivery_count` variable, then using this value to generate the ETag would work. This is what we did in the code examples above. Every request to `/edition/?delivery_count=0` will result in the same content, so the ETag on each request can be the same. The ETag should be different when `/edition/?delivery_count=1` is requested.

Or, your publication might generate content that varies depending on the date/time, as specified in the `local_delivery_time` variable. Maybe your publication displays today's news, but the headlines only change once per day. In this case you should base the ETag on the date, as in this Ruby and Sinatra example:

```ruby
require 'time'
printer_time = Time.parse(params[:local_delivery_time])
etag Digest::MD5.hexdigest(printer_time.strftime('%Y-%m-%d'))
```

This would generate the ETag using a string like `2013-12-31`, based on the printer's local time. If your content changed daily, but based on UTC rather than the `local_delivery_time` then you'd do something more like this:

```ruby
etag Digest::MD5.hexdigest(Time.now.utc.strftime('%Y-%m-%d'))
```

If your content changed every hour, then you should make the ETag more specific. Here, we use a more detailed time, using the hour as well:

```ruby
etag Digest::MD5.hexdigest(Time.now.utc.strftime('%Y-%m-%d-%H'))
```

Many publications will be more complicated. Maybe subscribers have to choose some options on subscribing, or authenticate with a third-party service (such as Twitter or Google) in order to receive personalised content. In these cases ETags will change much more often and should be unique to each subscriber and each edition.

In our [Hello World example][] users must choose a language and enter their name when they subscribe to the publication. Both these variables affect the content of the publication and so we should use them in the ETag:

```ruby
etag Digest::MD5.hexdigest(lang + name + Time.now.utc.strftime('%d%m%Y'))
```

If you've looked through the [Hello World example code][] then you might notice that the content doesn't change from one day to the next. So, strictly speaking, there's no need for us to put the date in the ETag – we usually only want it to change when the content changes. However, as an example, we want it to print out every day, and so we make sure the ETag changes daily.

You too might have a publication which might print the same content every day. For example, there's a chance a weather publication could show the same forecast two days running. In this case you should ensure the ETag is different each day, even though the content might remain the same (eg, base the ETag on the date, rather than the specific content of the forecast). Otherwise, BERG Cloud will see the ETag is unchanged, will assume the content is the same, and the subscriber won't receive the new edition(s).

### Testing your ETags

Because ETags are sent in the HTTP headers they are, obviously, not immediately visible. One way to see the headers are using the developer tools in a web browser. Chrome has its [DevTools][] and Safari has [Developer Tools][] (enable them in the "Advanced" tab of Safari's Preferences).

Once you've got the developer panel open, then go to the section for Network or Network Requests, and find the line that corresponds to your page (rather than the lines for images, CSS files, etc). You may need to refresh the page to see it. If you click on that you should be able to see the Response Headers, where the ETag should be listed. Here's a screenshot of the Chrome DevTools, showing the Response Headers, including the ETag for a file at the URL `/littleprinter-pub/edition/?delivery_count=3`:

![Chrome DevTools screenshot](/images/chrome_dev_tools_etag)

## Character sets

In order to make sure we print the text in your publication correctly it helps to include a Content-Type header specifying the character set.

The most supported character set is UTF-8 which will let you write text in most languages. However if you are making a publication using Cyrillic or Asian characters then you may wish to change this.

### Setting the Content-Type

As with [ETags](#etags) setting the Content-Type requires setting an HTTP header.

In [Sinatra][] (Ruby) this would work:

```ruby
content_type "text/html; charset=utf-8"
```

In [Flask][] (Python):

```python
response.headers["Content-Type"] = "text/html; charset=utf-8"
```

In PHP:

```php
header("Content-Type: text/html; charset=utf-8");
```

Source: [Wayback Machine][]

[style guide]: /reference/style_guide/layout
[meta.json]: /reference/structure/metajson
[ISO 8601 timestamp]: https://web.archive.org/web/20150602044102/http://www.w3.org/TR/NOTE-datetime
[validate_config]: /reference/structure/validate_config
[Sinatra]: http://www.sinatrarb.com/
[Flask]: http://flask.pocoo.org/
[HTTP ETags]: http://en.wikipedia.org/wiki/HTTP_ETag
[HTTP response headers]: http://en.wikipedia.org/wiki/List_of_HTTP_header_fields
[Hello World example]: /examples
[Hello World example code]: /examples/hello_world
[DevTools]: https://developers.google.com/chrome-developer-tools/
[Developer Tools]: https://developer.apple.com/technologies/safari/developer-tools.html
[Wayback Machine]: https://web.archive.org/web/20151209201338/http://remote.bergcloud.com/developers/littleprinter/reference/structure/edition
