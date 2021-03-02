(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{KvNg:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return i})),a.d(t,"default",(function(){return s}));var n=a("Fcif"),r=a("+I+c"),l=(a("mXGw"),a("/FXl")),b=a("TjRS"),i=(a("aD51"),{});void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/Messages/Types.md"}});var c={_frontmatter:i},p=b.a;function s(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(l.b)(p,Object(n.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h1",{id:"message-types"},"Message Types"),Object(l.b)("h2",{id:"specification-status"},"Specification Status"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"Version"),Object(l.b)("th",{parentName:"tr",align:null},"Status"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"0.1"),Object(l.b)("td",{parentName:"tr",align:null},"Tentative")))),Object(l.b)("h2",{id:"purpose"},"Purpose"),Object(l.b)("ol",null,Object(l.b)("li",{parentName:"ol"},"List valid message types and their ",Object(l.b)("a",{parentName:"li",href:"/spec/DSNP/DSNP-Messages"},"DSNP Message")," type assigned enumeration"),Object(l.b)("li",{parentName:"ol"},"Facilitate use of SDK"),Object(l.b)("li",{parentName:"ol"},"Facilitate interpretation of on-chain data and message results"),Object(l.b)("li",{parentName:"ol"},"Estimate data size")),Object(l.b)("h2",{id:"assumptions"},"Assumptions"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"All assumptions from ",Object(l.b)("a",{parentName:"li",href:"/spec/DSNP/DSNP-Messages"},"DSNP Messages")),Object(l.b)("li",{parentName:"ul"},"Message types are preset, but the DSNP Message contract will be upgradeable to allow more types."),Object(l.b)("li",{parentName:"ul"},"Message type values outside the contract presets are invalid")),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"name"),Object(l.b)("th",{parentName:"tr",align:null},"description"),Object(l.b)("th",{parentName:"tr",align:null},"value"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"Private"),Object(l.b)("td",{parentName:"tr",align:null},"message and message type are private; message data is encrypted"),Object(l.b)("td",{parentName:"tr",align:null},"0")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"GraphChange"),Object(l.b)("td",{parentName:"tr",align:null},"follow or unfollow an account"),Object(l.b)("td",{parentName:"tr",align:null},"1")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"Broadcast"),Object(l.b)("td",{parentName:"tr",align:null},"a public post or reply"),Object(l.b)("td",{parentName:"tr",align:null},"2")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"Profile"),Object(l.b)("td",{parentName:"tr",align:null},"a Profile change"),Object(l.b)("td",{parentName:"tr",align:null},"3")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"KeyList"),Object(l.b)("td",{parentName:"tr",align:null},"KeyList rotation"),Object(l.b)("td",{parentName:"tr",align:null},"4")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"PrivateGraphKeylist"),Object(l.b)("td",{parentName:"tr",align:null},"PrivateGraph keylist rotation"),Object(l.b)("td",{parentName:"tr",align:null},"5")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"EncryptionKeyList"),Object(l.b)("td",{parentName:"tr",align:null},"Encryption keyList rotation"),Object(l.b)("td",{parentName:"tr",align:null},"6")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"Reaction"),Object(l.b)("td",{parentName:"tr",align:null},"a public visual reply to a Broadcast"),Object(l.b)("td",{parentName:"tr",align:null},"7")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"PrivateGraphChange"),Object(l.b)("td",{parentName:"tr",align:null},"an encrypted follow or unfollow"),Object(l.b)("td",{parentName:"tr",align:null},"8")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"Drop"),Object(l.b)("td",{parentName:"tr",align:null},"a dead drop message"),Object(l.b)("td",{parentName:"tr",align:null},"9")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"EncryptedInbox"),Object(l.b)("td",{parentName:"tr",align:null},"an encrypted direct message"),Object(l.b)("td",{parentName:"tr",align:null},"10")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"PrivateBroadcast"),Object(l.b)("td",{parentName:"tr",align:null},"an encrypted broadcast"),Object(l.b)("td",{parentName:"tr",align:null},"11")))),Object(l.b)("h2",{id:"private-messages"},"Private Messages"),Object(l.b)("p",null,"If it's not desired to specify a message type, use the ",Object(l.b)("inlineCode",{parentName:"p"},"Private")," value as the message type."),Object(l.b)("p",null,"Note that a Drop, i.e. a dead drop message cannot be made private with this message, since the dead drop ID, which is a necessary shared secret for decryption, would not be available."),Object(l.b)("p",null,"See ",Object(l.b)("a",{parentName:"p",href:"/spec/DSNP/DSNP-Message-Serialization"},"DSNP Message Serialization")," for more detail"))}void 0!==s&&s&&s===Object(s)&&Object.isExtensible(s)&&!s.hasOwnProperty("__filemeta")&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/Messages/Types.md"}}),s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-messages-types-md-fef2427acf83e8457e72.js.map