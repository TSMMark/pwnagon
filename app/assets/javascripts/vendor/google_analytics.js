(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,"script","//www.google-analytics.com/analytics.js","ga");

var gaDomain = window.railsEnv == "development" ? "none" : "auto"
ga("create", window.googleAnalyticsTrackingID, gaDomain);

// We send the pageview from layout instead of here so turbolinks hits it.
// ga("send", "pageview");
