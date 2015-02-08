
/**
  Meant to be accessed via CORS at:
  http://www.cdn.konklone.io/cors_hsts.js

  By the time this runs, the browser should have witnessed
  a securely-delivered HTTPS header for the domain, and do an
  internal redirect first.

  Used to pass the test at:
  http://konklone.io/cdns-to-https/
**/

done('cors_hsts');
