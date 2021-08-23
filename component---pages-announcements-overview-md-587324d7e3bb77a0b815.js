(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{B1ie:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return c})),n.d(t,"default",(function(){return m}));var a=n("Fcif"),r=n("+I+c"),b=(n("mXGw"),n("/FXl")),l=n("TjRS"),i=(n("aD51"),["components"]),c={};void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/Announcements/Overview.md"}});var o={_frontmatter:c},d=l.a;function m(e){var t=e.components,n=Object(r.a)(e,i);return Object(b.b)(d,Object(a.a)({},o,n,{components:t,mdxType:"MDXLayout"}),Object(b.b)("h1",{id:"announcements-overview"},"Announcements Overview"),Object(b.b)("p",null,"Announcements are content or reference to content that are included in ",Object(b.b)("a",{parentName:"p",href:"/BatchPublications/Overview"},"Batch Publication Files"),"\nto communicate new user activity to the rest of the network.\nAll Announcements have a ",Object(b.b)("a",{parentName:"p",href:"/Announcements/Signatures"},"signature")," to validate the creators authority to publish content."),Object(b.b)("h2",{id:"announcement-types"},"Announcement Types"),Object(b.b)("p",null,"Each Announcement has a enumerated type for use when separating out a stream of Announcements."),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Value"),Object(b.b)("th",{parentName:"tr",align:null},"Name"),Object(b.b)("th",{parentName:"tr",align:null},"Description"),Object(b.b)("th",{parentName:"tr",align:null},"DSNP Announcement URI"),Object(b.b)("th",{parentName:"tr",align:null},"Tombstone Allowed"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"0"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Types/Tombstone"},"Tombstone")),Object(b.b)("td",{parentName:"tr",align:null},"an invalidation of another announcement"),Object(b.b)("td",{parentName:"tr",align:null},"no"),Object(b.b)("td",{parentName:"tr",align:null},"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"1"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Types/GraphChange"},"Graph Change")),Object(b.b)("td",{parentName:"tr",align:null},"social graph changes"),Object(b.b)("td",{parentName:"tr",align:null},"no"),Object(b.b)("td",{parentName:"tr",align:null},"no")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"2"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Types/Broadcast"},"Broadcast")),Object(b.b)("td",{parentName:"tr",align:null},"a public post"),Object(b.b)("td",{parentName:"tr",align:null},"YES"),Object(b.b)("td",{parentName:"tr",align:null},"YES")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"3"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Types/Reply"},"Reply")),Object(b.b)("td",{parentName:"tr",align:null},"a public response to a Broadcast"),Object(b.b)("td",{parentName:"tr",align:null},"YES"),Object(b.b)("td",{parentName:"tr",align:null},"YES")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"4"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Types/Reaction"},"Reaction")),Object(b.b)("td",{parentName:"tr",align:null},"a public visual reply to a Broadcast"),Object(b.b)("td",{parentName:"tr",align:null},"no"),Object(b.b)("td",{parentName:"tr",align:null},"YES")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"5"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("a",{parentName:"td",href:"/Announcements/Types/Profile"},"Profile")),Object(b.b)("td",{parentName:"tr",align:null},"a profile"),Object(b.b)("td",{parentName:"tr",align:null},"YES"),Object(b.b)("td",{parentName:"tr",align:null},"no")))),Object(b.b)("h2",{id:"value-serialization"},"Value Serialization"),Object(b.b)("p",null,"Serialization is how the value should be stringified for signing and for transfer between systems.\nMost serializations use outside standards, but some require additional clarifications, provided here."),Object(b.b)("h3",{id:"hexadecimal"},"hexadecimal"),Object(b.b)("p",null,"Used to represent bytes."),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"MUST use 0-9,a-f representation"),Object(b.b)("li",{parentName:"ul"},"MUST be lowercase"),Object(b.b)("li",{parentName:"ul"},"MUST be prefixed with a ",Object(b.b)("inlineCode",{parentName:"li"},"0x")),Object(b.b)("li",{parentName:"ul"},"MUST NOT have spaces or separators"),Object(b.b)("li",{parentName:"ul"},"MUST have two characters per byte in addition to the ",Object(b.b)("inlineCode",{parentName:"li"},"0x")," characters")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Bytes"),Object(b.b)("th",{parentName:"tr",align:null},"Invalid"),Object(b.b)("th",{parentName:"tr",align:null},"Valid"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"2"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0x123")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0x0123"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"2"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"123h")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0x0123"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"2"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0x0ABC")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0x0abc"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"8"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0xabc")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0x0000000000000abc"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"32"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0x3e34c4325f4461b9355027b314f3eb56d31af549f7da7bd9ef1ce951651e")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0x00003e34c4325f4461b9355027b314f3eb56d31af549f7da7bd9ef1ce951651e"))))),Object(b.b)("h3",{id:"decimal"},"decimal"),Object(b.b)("p",null,"Used to represent integers.\nStrings are used to avoid issues with different implementations of numbers."),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"MUST use 0-9 representation"),Object(b.b)("li",{parentName:"ul"},"MUST NOT have spaces or separators"),Object(b.b)("li",{parentName:"ul"},"MUST be a string")),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"Invalid"),Object(b.b)("th",{parentName:"tr",align:null},"Why"),Object(b.b)("th",{parentName:"tr",align:null},"Valid"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"0x123")),Object(b.b)("td",{parentName:"tr",align:null},"Must be decimal"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},'"291"'))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},"291"),Object(b.b)("td",{parentName:"tr",align:null},"Must be a string"),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},'"291"'))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"291n")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"BigInt(291)")," serialization appends an ",Object(b.b)("inlineCode",{parentName:"td"},"n")),Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},'"291"'))))),Object(b.b)("h2",{id:"duplicate-handling"},"Duplicate Handling"),Object(b.b)("p",null,"Duplicate Announcements may occur.\nDuplicates may be identified as any Announcements that match a previous Announcement's ",Object(b.b)("inlineCode",{parentName:"p"},"signature")," field\n(per the ",Object(b.b)("a",{parentName:"p",href:"#ordering-announcements"},"Announcement Order"),").\nDuplicate Announcements MUST be rejected or ignored."),Object(b.b)("h2",{id:"ordering-announcements"},"Ordering Announcements"),Object(b.b)("p",null,"Announcements are ordered on the network to provide for time dependent resolutions."),Object(b.b)("p",null,"Announcements in ",Object(b.b)("a",{parentName:"p",href:"/BatchPublications/Overview"},"Batch Publication Files")," have an eventually consistent canonical ordering.\nThe ",Object(b.b)("inlineCode",{parentName:"p"},"DSNPBatchPublication")," Ethereum events are ordered by information provided in the transaction.\nAnnouncements in a Batch Publication File are then ordered by row index."),Object(b.b)("ol",null,Object(b.b)("li",{parentName:"ol"},Object(b.b)("inlineCode",{parentName:"li"},"DSNPBatchPublication")," Block number ascending"),Object(b.b)("li",{parentName:"ol"},Object(b.b)("inlineCode",{parentName:"li"},"DSNPBatchPublication")," Transaction index ascending"),Object(b.b)("li",{parentName:"ol"},Object(b.b)("inlineCode",{parentName:"li"},"DSNPBatchPublication")," Log index ascending"),Object(b.b)("li",{parentName:"ol"},"Batch Publication File Announcement row appearance order")),Object(b.b)("h2",{id:"reverting-an-announcement"},"Reverting an Announcement"),Object(b.b)("p",null,"Announcements may not be deleted, but some may be marked as invalid by using a ",Object(b.b)("a",{parentName:"p",href:"/Announcements/Types/Tombstone"},"Tombstone Announcement"),".\nFor example, if a user creates a reaction announcement, they may remove that reaction by creating a tombstone announcement."),Object(b.b)("h2",{id:"non-normative"},"Non-Normative"),Object(b.b)("h3",{id:"announcement-ordering-and-activity-content-published-timestamp"},"Announcement Ordering and Activity Content Published Timestamp"),Object(b.b)("p",null,"Activity Content has a published field that contains a user generated timestamp.\nUser generated timestamps cannot be validated,\nbut may be used to indicate ordering other than the network order for Announcements which are ",Object(b.b)("em",{parentName:"p"},"not")," time dependent."),Object(b.b)("h3",{id:"announcement-reference-ordering"},"Announcement Reference Ordering"),Object(b.b)("p",null,"Some Announcements contain references to other announcements via the ",Object(b.b)("inlineCode",{parentName:"p"},"inReplyTo")," field.\nDue to the distributed nature, the canonical order can have an announcement that refers to another later in the order.\nFor display purposes, these messages should be considered to have occurred after the reference."))}void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!m.hasOwnProperty("__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/Announcements/Overview.md"}}),m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-announcements-overview-md-587324d7e3bb77a0b815.js.map