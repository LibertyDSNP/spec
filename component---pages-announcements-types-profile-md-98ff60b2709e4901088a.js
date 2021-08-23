(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"15kh":function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return d}));var a=n("Fcif"),r=n("+I+c"),b=(n("mXGw"),n("/FXl")),l=n("TjRS"),c=(n("aD51"),["components"]),i={};void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/Announcements/Types/Profile.md"}});var m={_frontmatter:i},o=l.a;function d(e){var t=e.components,n=Object(r.a)(e,c);return Object(b.b)(o,Object(a.a)({},m,n,{components:t,mdxType:"MDXLayout"}),Object(b.b)("h1",{id:"profile-announcement"},"Profile Announcement"),Object(b.b)("p",null,"A Profile Announcement is a constrained version of a ",Object(b.b)("a",{parentName:"p",href:"/Announcements/Types/Broadcast"},"Broadcast Announcement"),".\nThe reference content ",Object(b.b)("em",{parentName:"p"},"MUST be of profile type"),"."),Object(b.b)("h2",{id:"fields"},"Fields"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Field"),Object(b.b)("th",{parentName:"tr",align:null},"Description"),Object(b.b)("th",{parentName:"tr",align:null},"Serialization"),Object(b.b)("th",{parentName:"tr",align:null},"Parquet Type"),Object(b.b)("th",{parentName:"tr",align:null},"Bloom Filter"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"announcementType"),Object(b.b)("td",{parentName:"tr",align:null},"Announcement Type Enum (",Object(b.b)("inlineCode",{parentName:"td"},"5"),")"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Overview#decimal"},"decimal")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"INT32")),Object(b.b)("td",{parentName:"tr",align:null},"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"contentHash"),Object(b.b)("td",{parentName:"tr",align:null},"keccak-256 hash of content stored at URL"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Overview#hexadecimal"},"hexadecimal")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY")),Object(b.b)("td",{parentName:"tr",align:null},"YES")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"createdAt"),Object(b.b)("td",{parentName:"tr",align:null},"milliseconds since Unix epoch"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Overview#decimal"},"decimal")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"UINT_64")),Object(b.b)("td",{parentName:"tr",align:null},"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"fromId"),Object(b.b)("td",{parentName:"tr",align:null},"id of the user creating the announcement"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Overview#decimal"},"decimal")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"UINT_64")),Object(b.b)("td",{parentName:"tr",align:null},"YES")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"url"),Object(b.b)("td",{parentName:"tr",align:null},"Profile content URL"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"https://datatracker.ietf.org/doc/html/rfc3629"},"UTF-8")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"UTF8")),Object(b.b)("td",{parentName:"tr",align:null},"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"signature"),Object(b.b)("td",{parentName:"tr",align:null},"creator signature"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Overview#hexadecimal"},"hexadecimal")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY")),Object(b.b)("td",{parentName:"tr",align:null},"no")))),Object(b.b)("h2",{id:"field-requirements"},"Field Requirements"),Object(b.b)("h3",{id:"announcementtype"},"announcementType"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"MUST be fixed to ",Object(b.b)("inlineCode",{parentName:"li"},"5"))),Object(b.b)("h3",{id:"contenthash"},"contentHash"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"MUST be 32 bytes in length"),Object(b.b)("li",{parentName:"ul"},"MUST be the ",Object(b.b)("a",{parentName:"li",href:"https://keccak.team/files/Keccak-submission-3.pdf"},"keccak-256 hash")," of the bytes of the reference at the url")),Object(b.b)("h3",{id:"createdat"},"createdAt"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"MUST be set to the milliseconds since Unix epoch at time of signing")),Object(b.b)("h3",{id:"fromid"},"fromId"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"MUST be a ",Object(b.b)("a",{parentName:"li",href:"/Identifiers#dsnp-user-id"},"DSNP User Id")),Object(b.b)("li",{parentName:"ul"},"MUST be the ",Object(b.b)("a",{parentName:"li",href:"/Announcements/Signatures"},"signer")," of the announcement")),Object(b.b)("h3",{id:"url"},"url"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"MUST NOT refer to localhost or any reserved IP addresses as defined in ",Object(b.b)("a",{parentName:"li",href:"https://datatracker.ietf.org/doc/html/rfc6890"},"RFC6890")),Object(b.b)("li",{parentName:"ul"},"Resource MUST be a valid ",Object(b.b)("a",{parentName:"li",href:"/ActivityContent/Overview"},"Profile Activity Content")," Type"),Object(b.b)("li",{parentName:"ul"},"MUST use one of the supported URL Schemes")),Object(b.b)("h4",{id:"supported-url-schemes"},"Supported URL Schemes"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Scheme"),Object(b.b)("th",{parentName:"tr",align:null},"Description"),Object(b.b)("th",{parentName:"tr",align:null},"Reference"),Object(b.b)("th",{parentName:"tr",align:null},"DSNP Version Added"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"HTTPS"),Object(b.b)("td",{parentName:"tr",align:null},"Hypertext Transfer Protocol Secure"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"https://datatracker.ietf.org/doc/html/rfc2818"},"RFC2818")),Object(b.b)("td",{parentName:"tr",align:null},"1.0")))),Object(b.b)("h3",{id:"signature"},"signature"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"MUST be an ",Object(b.b)("a",{parentName:"li",href:"/Announcements/Signatures"},"Announcement Signature")," over the all fields except the signature field")),Object(b.b)("h2",{id:"non-normative"},"Non-Normative"),Object(b.b)("h3",{id:"most-recent-profile"},"Most Recent Profile"),Object(b.b)("p",null,"When displaying a DSNP user's profile, the most recent profile should be considered the complete and correct version.\nPrevious Profile Announcements from the same ",Object(b.b)("inlineCode",{parentName:"p"},"fromId")," may be disregarded."))}void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/Announcements/Types/Profile.md"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-announcements-types-profile-md-98ff60b2709e4901088a.js.map