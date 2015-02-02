## Forcing HTTP->HTTPS on CDNs

A testing site for demonstrating the effects of a 3rd party CDN forcing HTTPS via a redirect.

Will everything still work? Will sites that already linked their `<script>` to the `http://` URL still load the script?

The answer is **Yes.** [Jump to the tests.](#tests)

### Background

CDNs like Google's, jQuery's, and others have typically advocated protocol-relative URLs, like this:

```html
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
```

But now that HTTPS is fast, easy and increasingly necessary, **protocol-relative URLs are an anti-pattern**, so everyone should be using this:

```html
<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
```


## Testing redirects

The tests evaluate fetching `<script>` resources, and making CORS GET requests, in 3 scenarios:

* Fetching an `https://` resource directly. (A control.)
* Fetching an `http://` resource directly. (A control.)
* Fetching an `http://` resource that offers a 301 redirect to an `https://` resource. (The test.)

These are each done via `<script>`, and then via CORS (except on IE9 and below, which do not support CORS).

To support IE6, the test server supports SSLv3 connections, [which is insecure](https://community.qualys.com/blogs/securitylabs/2014/10/15/ssl-3-is-dead-killed-by-the-poodle-attack).

### Results

The short of it is:

* [... everyone? ...] supports the `<script>` redirect.
* [... everyone? ...] that supports CORS supports the CORS redirect, as long as CORS headers are _present at redirect-time_.

On **Internet Explorer 6** on Windows XP SP3:

![IE6 on Win XP SP3](results/ie6-winxp.png)


### Conclusion: CDNs should redirect to HTTPS

CDNs need to **force redirects to HTTPS**, so that even insecure pages served over `http://` that embedded a protocol-relative URL _still_ have to fetch the HTTPS version.

**But wouldn't those pages still have to make an insecure redirect anyway?**

Not if the CDN also then adds **[Strict Transport Security](https://developer.mozilla.org/en-US/docs/Web/Security/HTTP_strict_transport_security)**, an HTTP header that instructs browsers to make all requests over HTTPS.

If a browser sees an `http://` URL for a site that it knows has enabled Strict Transport, it will skip directly to HTTPS without the insecure redirect.

**They'll have to get the insecure redirect at least once, right?**

Even that first insecure request can be eliminated if CDN takes the final step of **[hardcoding their site into browsers](https://hstspreload.appspot.com/)** as HTTPS-only.

Chrome maintains a list (also used by Firefox and Safari) of sites that come baked into the browser as Strict-Transport-enabled, meaning that even the first request is protected.

In this way, CDNs can shift all **past, present, and future** users of their resources to all-HTTPS, all the time.

## Public domain

All of this is [released to the public domain under CC0](LICENSE.md).
