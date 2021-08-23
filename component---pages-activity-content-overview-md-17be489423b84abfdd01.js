(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{bdou:function(t,e,a){"use strict";a.r(e),a.d(e,"_frontmatter",(function(){return o})),a.d(e,"default",(function(){return s}));var n=a("Fcif"),r=a("+I+c"),b=(a("mXGw"),a("/FXl")),c=a("TjRS"),i=(a("aD51"),["components"]),o={};void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/ActivityContent/Overview.md"}});var l={_frontmatter:o},p=c.a;function s(t){var e=t.components,a=Object(r.a)(t,i);return Object(b.b)(p,Object(n.a)({},l,a,{components:e,mdxType:"MDXLayout"}),Object(b.b)("h1",{id:"activity-content-overview"},"Activity Content Overview"),Object(b.b)("p",null,"Content references shared via the DSNP consists of URLs pointing to documents containing Activity Streams JSON objects.\nFor the purposes of the DSNP, restrictions are placed on the ",Object(b.b)("a",{parentName:"p",href:"https://www.w3.org/TR/activitystreams-core/"},"Activity Streams 2.0")," specification."),Object(b.b)("h2",{id:"json-ld-and-activity-streams"},"JSON-LD and Activity Streams"),Object(b.b)("p",null,"All DSNP Activity Content is compatible with the ",Object(b.b)("a",{parentName:"p",href:"https://www.w3.org/TR/activitystreams-core/"},"Activity Streams 2.0")," specification.\nWhile there are some DSNP extensions, they are guaranteed to use non-colliding terms.\nTherefore, we set the JSON-LD ",Object(b.b)("inlineCode",{parentName:"p"},"@context")," field to ",Object(b.b)("inlineCode",{parentName:"p"},"https://www.w3.org/ns/activitystreams")," according to ",Object(b.b)("a",{parentName:"p",href:"https://www.w3.org/TR/activitystreams-core/#jsonld"},"Activity Streams 2.0 §2.1"),"."),Object(b.b)("h2",{id:"core-activity-content-types"},"Core Activity Content Types"),Object(b.b)("p",null,"DSNP uses only the following content types at the root level."),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Name"),Object(b.b)("th",{parentName:"tr",align:null},"Description"),Object(b.b)("th",{parentName:"tr",align:null},"DSNP Announcements"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/ActivityContent/Types/Note"},"Note")),Object(b.b)("td",{parentName:"tr",align:null},"standard user content"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Types/Broadcast"},"Broadcast"),", ",Object(b.b)("a",{parentName:"td",href:"/Announcements/Types/Reply"},"Reply"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/ActivityContent/Types/Profile"},"Profile")),Object(b.b)("td",{parentName:"tr",align:null},"user profile content"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Types/Profile"},"Profile"))))),Object(b.b)("h2",{id:"associated-types"},"Associated Types"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Name"),Object(b.b)("th",{parentName:"tr",align:null},"Description"),Object(b.b)("th",{parentName:"tr",align:null},"Specification"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/ActivityContent/Associated/Location"},"Location")),Object(b.b)("td",{parentName:"tr",align:null},"add a location to content"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"https://www.w3.org/TR/activitystreams-vocabulary/"},"Activity Vocabulary"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/ActivityContent/Associated/Tag"},"Tag")),Object(b.b)("td",{parentName:"tr",align:null},"add a tag to content"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"https://www.w3.org/TR/activitystreams-vocabulary/"},"Activity Vocabulary"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/ActivityContent/Associated/Attachments"},"Attachments")),Object(b.b)("td",{parentName:"tr",align:null},"supported attachment types"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"https://www.w3.org/TR/activitystreams-vocabulary/"},"Activity Vocabulary"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/ActivityContent/Associated/Hash"},"Hash")),Object(b.b)("td",{parentName:"tr",align:null},"content validation hash"),Object(b.b)("td",{parentName:"tr",align:null},"DSNP Extension")))),Object(b.b)("h2",{id:"supported-url-schema"},"Supported URL Schema"),Object(b.b)("p",null,"URLs in DSNP compatible Activity Content MUST to use one of the following URL schemes."),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Scheme"),Object(b.b)("th",{parentName:"tr",align:null},"Description"),Object(b.b)("th",{parentName:"tr",align:null},"Reference"),Object(b.b)("th",{parentName:"tr",align:null},"DSNP Version Added"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"HTTPS"),Object(b.b)("td",{parentName:"tr",align:null},"Hypertext Transfer Protocol Secure"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"https://datatracker.ietf.org/doc/html/rfc2818"},"RFC2818")),Object(b.b)("td",{parentName:"tr",align:null},"1.0")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"HTTP"),Object(b.b)("td",{parentName:"tr",align:null},"Hypertext Transfer Protocol"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"https://datatracker.ietf.org/doc/html/rfc2616"},"RFC2616")),Object(b.b)("td",{parentName:"tr",align:null},"1.0")))),Object(b.b)("h2",{id:"non-normative"},"Non-Normative"),Object(b.b)("h2",{id:"additional-fields"},"Additional Fields"),Object(b.b)("p",null,"Implementers may choose to support more of the Activity Streams standard as long as it does not conflict with this specification, but as a warning, other implementations may not recognize those additions.\nImplementers who extend their support for Activity Streams objects beyond the subset defined here do so at their own risk."))}void 0!==s&&s&&s===Object(s)&&Object.isExtensible(s)&&!s.hasOwnProperty("__filemeta")&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/ActivityContent/Overview.md"}}),s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-activity-content-overview-md-17be489423b84abfdd01.js.map