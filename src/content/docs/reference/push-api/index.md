---
title: Push API
---

:::caution
These pages serve a historic purpose only. With the BERG Cloud long offline, these reference pages _could_ be used to rebuild a faithful API. However, at this point no such effort has been made.
:::

# Push API

Conventional publications are delivered to Little Printers at a time the subscriber chooses, up to once per day. By contrast, push publications have no schedule and are sent to subscribed Little Printers whenever the publication chooses. This could be in response to external events such as news headlines, received Tweets, Foursquare check-ins or other "live" occurrences.

When making a Push publication there are a few differences to bear in mind:

- A `delivery_type` of `"push"` in `meta.json`.
- When a user subscribes to a publication a request is always made to its `/validate_config/` endpoint.
- Sending content to a Little Printer requires authentication with OAuth 1.0, using tokens which are unique to the publication.
- Each Little Printer that subscribes to a publication has a unique URL that editions are POSTed to.
- There will be no requests made to `/edition/`.

We look at these differences in more detail below. You can also have a look at [our example Push publication][example].

## Delivery type

Every publication's [meta.json][] file has an entry for `delivery_type`. Most publications have this set to `fetch`, but this should be changed to `push` for push publications:

```json
"delivery_type": "push",
```

Changing this changes when publications are printed; instead of being collected together as part of an hourly delivery, they will print out individually as the result of a POST request made by your publication to BERG Cloud.

## Validation config

With conventional publications, a POST request is made to its `/validate_config/` only if it has any config options set in its `meta.json`.

By contrast, push publications will always receive a POST request to this endpoint when a user subscribes. This request will contain two extra, push-specific, parameters:

1. `subscription_id`: An identifier unique to this subscription.
2. `endpoint`: The URL to which your publication should POST HTML for printing. HTML posted to this location will be printed by the subscribed printer immediately.

This data is POSTed to `/validate_config/` in the `config` parameter as a JSON string like this:

```json
{
  "subscription_id": "2ca7287d935ae2a6a562a3a17bdddcbe81e79d43",
  "endpoint": "http://api.bergcloud.com/v1/subscriptions/2ca7287d935ae2a6a562a3a17bdddcbe81e79d43/publish"
}
```

Parsing that would be done something like this using Ruby and the [Sinatra][] framework:

```ruby
post '/validate_config/' do
  config = JSON.parse(params[:config])
  subscription_id = params[:subscription_id]
  endpoint = params[:endpoint]
end
```

## Authentication

In order to POST to the supplied endpoint a publication must authenticate with BERG Cloud using OAuth 1.0 ([RFC5849][]).

Once a push publication has been added to [Your publications][publications] then its page there will have an “API credentials” section. This will show a pair of Consumer tokens and a pair of Access tokens that can be used to make requests.

If you're using Ruby the [oauth][] gem works well. In Python you can use the [oauth2][] module.

In Ruby, authentication and posting to the endpoint would be done like this (assuming the variables used are already populated with their appropriate values):

```ruby
require 'oauth'

consumer = OAuth::Consumer.new(consumer_token, consumer_token_secret,
								:site => "http://api.bergcloud.com")

access_token = OAuth::AccessToken.new(consumer,
                                      access_token, access_token_secret)

access_token.post(
  "http://api.bergcloud.com/v1/subscriptions/2ca7287d935ae2a6a562a3a17bdddcbe81e79d43/publish",
  "<h1>Hello world</h1>",
  "Content-Type" => "text/html; charset=utf-8")
```

While your publication is in “developer test” mode, or if it is paused, then authentication errors will show up on the publication's Errors page with provided and expected values to help with debugging.

## Posting content to a printer

Once a publication has authenticated with BERG Cloud it should POST content to the subscription's `endpoint`.

The POST's body should be HTML and the `Content-Type` header should be set to `text/html; charset=utf-8` (or the character set you are using). If you are unable to generate a POST body you can include the content as a query parameter called `html`.

Here's an example, in Ruby and Sinatra, of POSTing the content, having already authenticated:

```ruby
response = access_token.post(
  "http://api.bergcloud.com/v1/subscriptions/2ca7287d935ae2a6a562a3a17bdddcbe81e79d43/publish",
  "<h1>Hello world</h1>"
  "Content-Type" => "text/html; charset=utf-8")

response.code
# "202", "410", "429" or "503"

JSON.parse(response.body)
# { "accepted" => true } or { "accepted" => false }
```

The response returned should have one of the following HTTP status codes:

- `202` Accepted: If the POST was successful.
- `410` Gone: If the user has unsubscribed from this publication.
- `429` Too Many Requests: The printer currently has too many pending push deliveries.
- `503` Service unavailable: If the printer is not currently online

In the case of a `410` response, the publication should remove any local record of this subscription, and not send content to it again.

If the POST response was successful (a `202`) the `Location` header will include a URL from which the status of a print can be found. Continuing from the previous example:

```ruby
status_url = response.headers['Location']
status = JSON.parse(access_token.get(status_url))
# { "status" => "waiting" }
# status will be one of ['accepted', 'failed', 'waiting', 'printed']
```

Source: [Wayback Machine][]

[example]: /examples/push
[Wayback Machine]: https://web.archive.org/web/20151208193702/http://remote.bergcloud.com/developers/littleprinter/reference/style_guide/layout
