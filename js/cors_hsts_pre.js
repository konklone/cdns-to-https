
/**
  Meant to be accessed via CORS at:
  https://www.cdn.konklone.io/cors_hsts_pre.js

  This should work without issue, and cause a HSTS-supporting
  browser to remember the HSTS value for the next request.

  Used to pass the test at:
  http://konklone.io/cdns-to-https/
**/

hsts_set();
