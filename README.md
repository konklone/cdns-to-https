## Forcing HTTP->HTTPS on CDNs

A testing site for demonstrating the effects of a 3rd party CDN forcing HTTPS via a redirect.

Will everything still work? Will sites that already linked their `<script>` to the `http://` URL still load the script?

_[ .. almost done proving that the answer is YES ..]_

### Background

CDNs like Google's, jQuery's, and others have typically advocated protocol-relative URLs, like this:

```html
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
```

But now that HTTPS is fast, easy and increasingly necessary, **protocol-relative URLs are an anti-pattern**, so everyone should be using this:

```html
<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
```

In fact, what CDNs really need to do is **force redirects to HTTPS**, so that even insecure pages served over `http://` that embedded a protocol-relative URL _still_ have to fetch the HTTPS version.

**But wouldn't those pages still have to make an insecure redirect anyway?**

Not if the CDN also then adds **[Strict Transport Security](https://developer.mozilla.org/en-US/docs/Web/Security/HTTP_strict_transport_security)**, an HTTP header that instructs browsers to make all requests over HTTPS.

If a browser sees an `http://` URL for a site that it knows has enabled Strict Transport, it will skip directly to HTTPS without the insecure redirect.

**They'll have to get the insecure redirect at least once, right?**

Yes, though that's not a huge issue, given how often major CDN resources get served.

But even that first insecure request can be eliminated if CDN takes the final step of **[hardcoding their site into browsers](https://hstspreload.appspot.com/)** as HTTPS-only.

Chrome maintains a list (also used by Firefox and Safari) of sites that come baked into the browser as Strict-Transport-enabled, meaning that even the first request is protected.

## Conclusion

In this way, CDNs can shift all past, present, and future users of their resources to all-HTTPS, all the time.
