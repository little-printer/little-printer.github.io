---
title: Images
---

:::caution
There are several images missing from this page. If you can help restoring them, please [get in touch.][]
:::

To create an image on the thermochromic paper used by Little Printer, a thermal head inside the unit selectively heats the paper as it passes. The heat turns areas black, resulting publications 'printing' in pure black and white. There are no tonal greys.

If your publication is based around visual art or photography, you may wish to experiment with dithering patterns in the graphics application of your choice, to pre-process your images.

You'll see that in many applications as you save your two colour, black and white PNG you are able to choose between 'Diffusion', Pattern' and 'Noise' dither. Choose the one that suits your image best.

Alternatively, you may wish auto-process your images in BERG Cloud.

## Auto-processing images

If your publication design contains areas that are neither solid black or solid white, these pixels will be rounded to the closest option, at a threshold of 50%. Visually, this most resembles a stencil, with solid black and white areas, and no dithering.

![](/images/threshold.png)

Dithering is a technique used to create the illusion of colour depth in images displayed using a limited colour palette. The colours and tones are approximated using a diffusion of pixels — close up, these might look like a pattern, or random dots, but viewed from a distance these dots and patterns are not discernible to the human eye, and the image more closely resembles a photograph.

![](/images/dithered.png)

Little Printer will dither images using the [Floyd-Steinberg][] algorithm, when the class "dither" is included in the image tag:

```html
<img class="dither" src="test-picture.png" />
```

Dithering is only available for images in an <img> tag, and backgrounds set by CSS should be pre-dithered, or will be thresholded.

Source: [Wayback Machine][]

[get in touch.]: https://github.com/little-printer
[Floyd-Steinberg]: http://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering
[Wayback Machine]: https://web.archive.org/web/20140313080404/http://remote.bergcloud.com/developers/littleprinter/reference/style_guide/images
