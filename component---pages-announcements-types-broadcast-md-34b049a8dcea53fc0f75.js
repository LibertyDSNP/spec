(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{rWiO:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return c})),n.d(t,"default",(function(){return d}));var a=n("Fcif"),b=n("+I+c"),r=(n("mXGw"),n("/FXl")),l=n("TjRS"),c=(n("aD51"),{});void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/Announcements/Types/Broadcast.md"}});var i={_frontmatter:c},m=l.a;function d(e){var t=e.components,n=Object(b.a)(e,["components"]);return Object(r.b)(m,Object(a.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"broadcast-announcement"},"Broadcast Announcement"),Object(r.b)("p",null,"A Broadcast Announcement is a way to send a public message to everyone."),Object(r.b)("h2",{id:"specification-status"},"Specification Status"),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Version"),Object(r.b)("th",{parentName:"tr",align:null},"Status"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"1.0"),Object(r.b)("td",{parentName:"tr",align:null},"Proposed")))),Object(r.b)("h2",{id:"fields"},"Fields"),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Field"),Object(r.b)("th",{parentName:"tr",align:null},"Description"),Object(r.b)("th",{parentName:"tr",align:null},"Serialization"),Object(r.b)("th",{parentName:"tr",align:null},"Parquet Type"),Object(r.b)("th",{parentName:"tr",align:null},"Bloom Filter"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"announcementType"),Object(r.b)("td",{parentName:"tr",align:null},"Announcement Type Enum (",Object(r.b)("inlineCode",{parentName:"td"},"2"),")"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("a",{parentName:"td",href:"/Announcements/Overview#hexadecimal"},"hexadecimal")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"INT32")),Object(r.b)("td",{parentName:"tr",align:null},"no")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"contentHash"),Object(r.b)("td",{parentName:"tr",align:null},"keccak-256 hash of content stored at URL"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("a",{parentName:"td",href:"/Announcements/Overview#hexadecimal"},"hexadecimal")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY")),Object(r.b)("td",{parentName:"tr",align:null},"YES")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"createdAt"),Object(r.b)("td",{parentName:"tr",align:null},"milliseconds since Unix epoch"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("a",{parentName:"td",href:"/Announcements/Overview#hexadecimal"},"hexadecimal")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"INT64")),Object(r.b)("td",{parentName:"tr",align:null},"no")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"fromId"),Object(r.b)("td",{parentName:"tr",align:null},"id of the user creating the announcement"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("a",{parentName:"td",href:"/Announcements/Overview#hexadecimal"},"hexadecimal")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY")),Object(r.b)("td",{parentName:"tr",align:null},"YES")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"url"),Object(r.b)("td",{parentName:"tr",align:null},"content URL"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("a",{parentName:"td",href:"https://datatracker.ietf.org/doc/html/rfc3629"},"UTF-8")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY")),Object(r.b)("td",{parentName:"tr",align:null},"no")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"signature"),Object(r.b)("td",{parentName:"tr",align:null},"creator signature"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("a",{parentName:"td",href:"/Announcements/Overview#hexadecimal"},"hexadecimal")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY")),Object(r.b)("td",{parentName:"tr",align:null},"no")))),Object(r.b)("h2",{id:"field-requirements"},"Field Requirements"),Object(r.b)("h3",{id:"announcementtype"},"announcementType"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"MUST be fixed to ",Object(r.b)("inlineCode",{parentName:"li"},"2"))),Object(r.b)("h3",{id:"contenthash"},"contentHash"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"MUST be 32 bytes in length"),Object(r.b)("li",{parentName:"ul"},"MUST be the ",Object(r.b)("a",{parentName:"li",href:"https://keccak.team/files/Keccak-submission-3.pdf"},"keccak-256 hash")," of the bytes of the reference at the url.")),Object(r.b)("h3",{id:"createdat"},"createdAt"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"MUST be set to the milliseconds since Unix epoch at time of signing")),Object(r.b)("h3",{id:"fromid"},"fromId"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"MUST be a ",Object(r.b)("a",{parentName:"li",href:"/Identifiers#dsnp-user-id"},"DSNP User Id")),Object(r.b)("li",{parentName:"ul"},"MUST be the ",Object(r.b)("a",{parentName:"li",href:"/Announcements/Signatures"},"signer")," of the announcement")),Object(r.b)("h3",{id:"url"},"url"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"MUST NOT refer to localhost or any reserved IP addresses as defined in ",Object(r.b)("a",{parentName:"li",href:"https://datatracker.ietf.org/doc/html/rfc6890"},"RFC6890"),"."),Object(r.b)("li",{parentName:"ul"},"Resource MUST one of the supported ",Object(r.b)("a",{parentName:"li",href:"/ActivityContent/Overview"},"Activity Content")," Types"),Object(r.b)("li",{parentName:"ul"},"MUST use one of the supported URL Schemes")),Object(r.b)("h4",{id:"supported-url-schemes"},"Supported URL Schemes"),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Scheme"),Object(r.b)("th",{parentName:"tr",align:null},"Description"),Object(r.b)("th",{parentName:"tr",align:null},"Reference"),Object(r.b)("th",{parentName:"tr",align:null},"DSNP Version Added"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"HTTPS"),Object(r.b)("td",{parentName:"tr",align:null},"Hypertext Transfer Protocol Secure"),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("a",{parentName:"td",href:"https://datatracker.ietf.org/doc/html/rfc2818"},"RFC2818")),Object(r.b)("td",{parentName:"tr",align:null},"1.0")))),Object(r.b)("h3",{id:"signature"},"signature"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"MUST be an ",Object(r.b)("a",{parentName:"li",href:"/Announcements/Signatures"},"Announcement Signature")," over the all fields except the signature field.")))}void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/Announcements/Types/Broadcast.md"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-announcements-types-broadcast-md-34b049a8dcea53fc0f75.js.map