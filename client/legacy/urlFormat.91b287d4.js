import{r,u as e}from"./client.52882176.js";var t="iqc3CVv8sR3rYXGctAiap5CLJQ7z8dls",n=function(){var n=r(e.mark(function r(n){var s,a,i;return e.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return s=c(n),r.next=3,fetch("https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=".concat(t,"&").concat(s));case 3:return a=r.sent,r.next=6,a.json();case 6:if(!(i=r.sent)){r.next=11;break}return r.abrupt("return",i.results);case 11:throw new Error(i);case 12:case"end":return r.stop()}},r)}));return function(r){return n.apply(this,arguments)}}(),c=function(r){var e=[];return r.query&&e.push("query=".concat(r.query)),r.offset&&e.push("offset=".concat(r.offset)),r.reviewer&&e.push("reviewer=".concat(r.reviewer)),r.year&&e.push("publication-date=".concat(r.year,"-01-01;").concat(parseInt(r.year)+1,"-01-01")),r["critics-pick"]?e.push("reviewer=".concat(r["critics-pick"])):e.push("critics-pick=Y"),r.order?e.push("order=".concat(r.order)):e.push("order=by-publication-date"),e.join("&")},s=function(r){return r.split(" ").join("-").toLowerCase()},a=function(r){return r.split("-").join(" ")};export{t as a,n as b,c,a as d,s as g};