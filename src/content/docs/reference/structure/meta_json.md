---
title: meta.json
---

A publication's `/meta.json`:

- Contains information which is displayed to potential subscribers on BERG Cloud Remote.
- Specifies whether requests to `/edition/` should include the optional fields `local_delivery_time` and `delivery_count`.
- Describes any optional configuration fields BERG Cloud Remote should present to subscribers.
- Specifies whether your publication needs to authenticate subscribers with a third-party site, or provide further custom configuration.
- Specifies if this is a [Push publication][push].

This table describes each of the possible fields ni the `/meta.json file`. Below it is a an example of a file.

| Name                      | Example value                    | Description                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `owner_email`             | `"tom@example.org"`              | **Required.** Email address for the owner of this publication                                                                                                                                                                                                                                                                                                                                           |
| `publication_api_version` | `"1.0"`                          | **Required.** The API version this publication is using                                                                                                                                                                                                                                                                                                                                                 |
| `name`                    | `"Daily Weather"`                | **Required.** The title of the publication, displayed on BERG Cloud Remote.                                                                                                                                                                                                                                                                                                                             |
| `description`             | `"A forecast for your area"`     | **Required.** A brief description of the publication, displayed on BERG Cloud Remote. It can contain these HTML tags: `<strong> <em> <br> <a>`. All other tags will be stripped                                                                                                                                                                                                                         |
| `delivered_on`            | `"every day"`                    | **Required.** A description of when editions are published. Will be used to complete a sentence starting "Delivered on [...]". Strings must make sense in this context, such as "Delivered on Mondays", "Delivered on Mondays and Tuesdays", "Delivered on the 3rd, 4th and 5th of the month".                                                                                                          |
| `send_timezone_info`      | `true` (Defaults to `false`)     | **Optional.** When this is set to `true` a full [ISO 8601 timestamp][datetime] is sent in the `local_delivery_time` value with every call to `/edition/`. This is useful if the publication is only served on particular days or if the publication includes the time.                                                                                                                                  |
| `send_delivery_count`     | `true` (Defaults to `false`)     | **Optional.** If set to `true`, each call to `/edition/` will contain the `delivery_count` value, indicating how many editions this subscriber has received (0-based). This is the number the user has received, not the number printed, which may be smaller.                                                                                                                                          |
| `config`                  | `Object` (Defaults to `{}`)      | **Optional.** This defines the optional form that can be displayed to the user on BERG Cloud Remote when they subscribe. Currently supported fields are “text”, “radio”, “select” and “checkbox”. Each form item has a type, name, label and (for select, radio and checkbox) some options. The example to the left defines a select box labelled “Choose an option” with three options to select from. |
| `external_configuration`  | `true` (Defaults to `false`)     | **Optional.** Should be true if the publication needs the user to authenticate with a third party, such as Foursquare or Twitter. The subscribing user would then be sent to `/configure/` on your site, where they can be redirected to a third party's OAuth provider before being returned to BERG Cloud Remote.                                                                                     |
| `delivery_type`           | `"push"` (Defaults to `"fetch"`) | **Optional.** Most publications are of type `fetch`, delivered on the hour. If you want your publication to print things based on external events, with editions pushed immediately to a subscriber's printer, set this to `push` and have a look at our [Push API][push].                                                                                                                              |

The following example `meta.json` file shows all of this together, including all currently supported form types:

```json
{
	"owner_email": "publishers@bergcloud.com",
	"publication_api_version": "1.0",
	"name": "Hello, World!",
	"description": "Example publication for Little Printer",
	"delivered_on": "every day",
	"external_configuration": false,
	"send_timezone_info": false,
	"send_delivery_count": false,
	"config": {
		"fields": [
			{
				"type": "select",
				"name": "example_select_box",
				"label": "Choose an option",
				"options": [
					["Option One", "option_one"],
					["Option Two", "option_two"],
					["Option Three", "option_three"]
				]
			},
			{
				"type": "text",
				"name": "example_text_box",
				"label": "Enter some text"
			},
			{
				"type": "check_box",
				"name": "example_check",
				"label": "Check some boxes",
				"options": [
					["Option One", "option_one"],
					["Option Two", "option_two"],
					["Option Three", "option_three"]
				]
			},
			{
				"type": "radio",
				"name": "example_radio",
				"label": "Select an option",
				"options": [
					["Option One", "option_one"],
					["Option Two", "option_two"],
					["Option Three", "option_three"]
				]
			}
		]
	}
}
```

Source: [Wayback Machine][]

[datetime]: https://web.archive.org/web/20150602043650/http://www.w3.org/TR/NOTE-datetime
[push]: #push
[Wayback Machine]: https://web.archive.org/web/20150602044107/http://remote.bergcloud.com/developers/littleprinter/reference/structure/metajson
