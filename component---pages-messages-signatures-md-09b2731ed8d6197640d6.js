(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{SRiU:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return b})),n.d(t,"default",(function(){return l}));var a=n("Fcif"),s=n("+I+c"),i=(n("mXGw"),n("/FXl")),r=n("TjRS"),b=(n("aD51"),{});void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&!b.hasOwnProperty("__filemeta")&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/Messages/Signatures.md"}});var c={_frontmatter:b},o=r.a;function l(e){var t=e.components,n=Object(s.a)(e,["components"]);return Object(i.b)(o,Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"message-signatures"},"Message Signatures"),Object(i.b)("p",null,"All DSNP announcements provided for batching should include a ",Object(i.b)("a",{parentName:"p",href:"https://google.com/search?hl=en&q=secp256k1"},"secp256k1")," signature for the purposes of verifying the authenticity of the message.\nThis signature should be generated from the ",Object(i.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/SHA-3"},"keccak-256")," hash of the announcement and the publishing user's private key.\nOptionally, anonymous messages may be provided with a zero hash in place of the signature, however behavior for these messages is undefined, and they may be treated as invalid data by archivists or disregarded as spam by indexers or end clients."),Object(i.b)("h2",{id:"specification-status"},"Specification Status"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Version"),Object(i.b)("th",{parentName:"tr",align:null},"Status"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"0.1"),Object(i.b)("td",{parentName:"tr",align:null},"Tentative")))),Object(i.b)("h2",{id:"purpose"},"Purpose"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Describe the process of signing DSNP announcements for inclusion in batches"),Object(i.b)("li",{parentName:"ol"},"Describe the process of verifying DSNP announcements from batches")),Object(i.b)("h2",{id:"assumptions"},"Assumptions"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"All assumptions from ",Object(i.b)("a",{parentName:"li",href:"/Messages/Overview"},"DSNP Messages"))),Object(i.b)("h2",{id:"signing-messages"},"Signing Messages"),Object(i.b)("p",null,"The process for generating signatures for DSNP announcements consists of three distinct steps:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Serialize the DSNP announcement, if not encrypted"),Object(i.b)("li",{parentName:"ol"},"Hash the serialized string"),Object(i.b)("li",{parentName:"ol"},"Sign the hash")),Object(i.b)("p",null,"For encrypted messages, the encrypted bytes of the ",Object(i.b)("inlineCode",{parentName:"p"},"dsnpData")," field can be hashed directly without any serialization.\nFor non-encrypted messages, each key-value pair in the ",Object(i.b)("inlineCode",{parentName:"p"},"dsnpData")," object should be concatenated in alphabetical order with no separator characters."),Object(i.b)("p",null,"Once the data is serialized, the serialized string should be hashed using ",Object(i.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/SHA-3"},"keccak-256"),".\nThis fixed length hash generated can then be signed using ",Object(i.b)("a",{parentName:"p",href:"https://google.com/search?hl=en&q=secp256k1"},"secp256k1")," and the publishing user's private key.\nThe resulting signature should be provided along with the message contents to the announcer for inclusion in the next available batch."),Object(i.b)("p",null,"For example, given the following DSNP broadcast message:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-json"},'{\n  "fromAddress": "0x12345",\n  "contentHash": "0x67890",\n  "uri": "https://www.projectliberty.io/"\n}\n')),Object(i.b)("p",null,"This would be the expected serialization:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"contentHash0x67890fromAddress0x12345urihttps://www.projectliberty.io/\n")),Object(i.b)("p",null,"This would be the expected hash:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"0x45c42591e0154088325055f26664002bf05f211db9e5d7c7bfc588dc309698e0\n")),Object(i.b)("p",null,"And the generated signature would be a string unique to the signing user's keys but looking something like this:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"LJbwyo6oxKd2GRxsUFwxUN1YwBzE9UC4WPvScsh0+vALkocQn60QjgkNd9CB0JUKfVTQdOlTm5gzaengzgmhDw==\n")),Object(i.b)("h2",{id:"verifying-messages"},"Verifying Messages"),Object(i.b)("p",null,"Verifying announcements can be done by repeating the serialization and hashing steps from the signing process then validating the generated hash against the publishing user's public key.\nThe user's public key can be fetched from the Identity contract as described in the ",Object(i.b)("a",{parentName:"p",href:"/Identity/Overview"},"Identity spec"),"."),Object(i.b)("p",null,"Given the message and signature provided in the previous example, the following public key should return true when verifying:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"+IUGiZsGHq+3s/Zgxl8TQMRgydvsOX1hUwMzHykoqGw=\n")))}void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/Messages/Signatures.md"}}),l.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-messages-signatures-md-09b2731ed8d6197640d6.js.map