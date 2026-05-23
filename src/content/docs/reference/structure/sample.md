---
title: sample
---

![Icon](/images/print_sample.png)

Before subscribing to a publication, users of BERG Cloud are given an opportunity to ‘Print a sample’. Doing this will make their Little Printer output an example of the publication. This example is also what is used in BERG Cloud Remote to show potential subscribers what a publication looks like.

Publications should provide this content in response to requests for:

```
GET /sample/
```

It is up to the publication's creator to choose which sample content to output. The sample content should be essentially the same as what might be returned from a request to `/edition`. It doesn't need to change.

No parameters are sent with the request to `/sample/`.

The response does not need to return an [ETag header][etag].

Source: [Wayback Machine][]

[etag]: reference/structure/edition#etags
[Wayback Machine]: https://web.archive.org/web/20150602044107/http://remote.bergcloud.com/developers/littleprinter/reference/structure/sample
