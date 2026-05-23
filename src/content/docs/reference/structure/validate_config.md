---
title: validate_config
---

If a publication has custom `config` options specified in its [meta.json][], a subscriber will be presented with a form containing those options on BERG Cloud Remote. When they submit the form, the subscriber's choices will be POSTed as JSON to `/validate_config/` for validation. The returned response should also be JSON.

Our Hello World example, has a `meta.json` specifying `config` values like this:

```json
{
  "owner_email": "publishers@bergcloud.com",
  "publication_api_version": "1.0",
  "name": "Hello, World!",
  "description": "Example publication for Little Printer",
  "delivered_on": "every Monday",
  "send_timezone_info": true,
  "send_delivery_count": false,
  "external_configuration": false,
  "config": {
    "fields": [
      {
        "type": "text",
        "name": "name",
        "label": "Enter your name"
      },
      {
        "type": "select",
        "name": "lang",
        "label": "Select your greeting language",
        "options": [
          [ "English", "english" ],
          [ "French", "french" ],
          [ "German", "german" ],
          [ "Spanish", "spanish" ],
          [ "Portuguese", "portuguese" ],
          [ "Italian", "italian" ],
          [ "Swedish", "swedish" ]
        ]
      }
    ]
  }
}
```

This results in the following form being shown to a subscriber on BERG Cloud Remote:

![Screenshot of BERG Cloud Remote on an iPhone](/images/example_publication_subscribe_form.png)

Once the form is submitted, the following POST request is made to the publication's `/validate_config/`:

```
POST /validate_config/
config={"name":"Alice", "lang":"english"}
```

The publication should parse the JSON in the `config` POST parameter and check the submitted values. The response should be valid JSON, containing a `valid` key and, if there are errors, an array of `errors`.

In the simplest case, where all the parameters are valid, `/validate_config/` should return:

```json
{
  "valid": true
}
```

If the submitted config values are not valid, the publication should respond with something more like this:

```json
{
  "valid": false,
  "errors": [
    "Please enter your name into the name box.",
    "Please select a language."
  ]
}
```

This would result in the subscriber seeing something like this:

![](/images/example_publication_subscribe_form_error.png)

The initial alert ("There was an error creating your subscription") is generic, and displayed by BERG Cloud Remote when the publication returns `valid:"false`. Subsequent error messages are the error texts returned by the publication, and are displayed with the relevant form fields.

Once the form is successfully submitted and validated, the subscriber's selections are stored at BERG Cloud and are sent to the publication whenever a request is made for `/edition/` for that subscriber. See the [documentation about `/edition/`][edition] for more information.

Source: [Wayback Machine][]

[meta.json]: /reference/structure/metajson
[Wayback Machine]: [/reference/structure/metajson](https://web.archive.org/web/20150602044125/http://remote.bergcloud.com/developers/littleprinter/reference/structure/validate_config)
