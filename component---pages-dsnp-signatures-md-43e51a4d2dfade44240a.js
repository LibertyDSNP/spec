(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{p6Ks:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return c})),n.d(t,"default",(function(){return d}));var a=n("Fcif"),b=n("+I+c"),i=(n("mXGw"),n("/FXl")),r=n("TjRS"),l=(n("aD51"),["components"]),c={};void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!Object.prototype.hasOwnProperty.call(c,"__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/DSNP/Signatures.md"}});var p={_frontmatter:c},o=r.a;function d(e){var t=e.components,n=Object(b.a)(e,l);return Object(i.b)(o,Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"announcement-signatures"},"Announcement Signatures"),Object(i.b)("p",null,"Announcements are signed using recoverable ECDSA signatures similarly to how transactions are signed (",Object(i.b)("a",{parentName:"p",href:"https://ethereum.github.io/yellowpaper/paper.pdf"},"Ethereum Yellow Paper Appendix F"),").\nThe signatures use the ",Object(i.b)("a",{parentName:"p",href:"https://link.springer.com/chapter/10.1007%2F978-3-662-44893-9_12"},"SECP-256k1 curve"),"\nand matches the signature algorithms found in the Ethereum JSON-RPC method ",Object(i.b)("a",{parentName:"p",href:"https://eth.wiki/json-rpc/API#eth_sign"},Object(i.b)("inlineCode",{parentName:"a"},"eth_sign")),".\nAll parties interacting with Announcements should independently validate signatures to guard against creator impersonation."),Object(i.b)("h2",{id:"signing-an-announcement"},"Signing an Announcement"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Serialize all Announcement fields (except the signature field)."),Object(i.b)("li",{parentName:"ol"},"Hash the serialized string."),Object(i.b)("li",{parentName:"ol"},"Sign the hash with an SECP-256k1 private key that is ",Object(i.b)("a",{parentName:"li",href:"/Ethereum/Identity"},"authorized to Announce")," on the given DSNP User Id in the ",Object(i.b)("inlineCode",{parentName:"li"},"fromId")," field of the Announcement.")),Object(i.b)("h3",{id:"serialization"},"Serialization"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"The key of each field (except the signature field) of the Announcement MUST be concatenated with the value."),Object(i.b)("li",{parentName:"ol"},"Each concatenated field string MUST then be ",Object(i.b)("a",{parentName:"li",href:"http://www.unicode.org/reports/tr10/"},"sorted alphabetically")," and concatenated."),Object(i.b)("li",{parentName:"ol"},"Prefix the alphabetized concatenated string with the ",Object(i.b)("a",{parentName:"li",href:"https://eth.wiki/json-rpc/API#eth_sign"},"Ethereum RPC prefix")," (",Object(i.b)("inlineCode",{parentName:"li"},"\\x19Ethereum Signed Message:\\n"),") and the byte length of the string.")),Object(i.b)("p",null,Object(i.b)("em",{parentName:"p"},"Note: If signing with a wallet, the ",Object(i.b)("a",{parentName:"em",href:"https://eth.wiki/json-rpc/API#eth_sign"},"Ethereum RPC prefix")," will be added by the wallet.")),Object(i.b)("h4",{id:"example"},"Example"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Field"),Object(i.b)("th",{parentName:"tr",align:null},"Value"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"announcementType"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"1"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"contentHash"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"createdAt"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"1627726272000"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"fromId"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"74565"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"url"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"https://www.dsnp.org/"))))),Object(i.b)("p",null,"Expected serialization:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"\\x19Ethereum Signed Message:\\n64announcementType1contentHash0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658createdAt1627726272000fromId74565urlhttps://www.dsnp.org/\n")),Object(i.b)("p",null,"Serialization in hexadecimal:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"0x19457468657265756d205369676e6564204d6573736167653a0a313531616e6e6f756e63656d656e745479706531636f6e74656e74486173683078396332326666356632316630623831623131336536336637646236646139346665646566313162323131396234303838623839363634666239613363623635386372656174656441743136323737323632373230303066726f6d4964373435363575726c68747470733a2f2f7777772e64736e702e6f72672f\n")),Object(i.b)("h3",{id:"hashing"},"Hashing"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"MUST hash the UTF-8 serialization with ",Object(i.b)("a",{parentName:"li",href:"https://keccak.team/files/Keccak-submission-3.pdf"},"keccak-256"),".")),Object(i.b)("h4",{id:"example-1"},"Example"),Object(i.b)("p",null,"For the previous example, the resulting hexadecimal hash MUST match:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"0xabaae4d8fda61c1b9cf481ef784158ebae5cea36f5cb7d1242987553a6dc6aa8\n")),Object(i.b)("h3",{id:"signing"},"Signing"),Object(i.b)("h4",{id:"wallet-signing"},"Wallet Signing"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Ethereum Wallets will do the prefix and hashing")),Object(i.b)("h4",{id:"example-2"},"Example"),Object(i.b)("p",null,"A signature would be unique to the signing key.\nA signature of the previous example with the given private key produces:"),Object(i.b)("p",null,"Private Key: ",Object(i.b)("inlineCode",{parentName:"p"},"0xd9d3b5afb7765ffd9f047fd0d1d9b47d4d538b6a56f1cf29dc160ab9c6d30aa3")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"{\n  v: '0x1c',\n  r: '0x2e05b0f769b0344a58a06718f90f5d605878b6d5e9e14e1f235de24b399cfe42',\n  s: '0x7135a0b704862a8bc2847c4bb9f78bb43f707d427f0ba19bb43f66d5666934c9',\n}\n")),Object(i.b)("p",null,"The compressed form of the above being this (",Object(i.b)("inlineCode",{parentName:"p"},"r + s + v"),"):"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"0x2e05b0f769b0344a58a06718f90f5d605878b6d5e9e14e1f235de24b399cfe427135a0b704862a8bc2847c4bb9f78bb43f707d427f0ba19bb43f66d5666934c91c\n")),Object(i.b)("h2",{id:"recovering-a-signers-ethereum-address"},"Recovering a Signer's Ethereum Address"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Repeat the serialization above."),Object(i.b)("li",{parentName:"ol"},"Perform ",Object(i.b)("a",{parentName:"li",href:"https://web.archive.org/web/20170921160141/http://cs.ucsb.edu/~koc/ccs130h/notes/ecdsa-cert.pdf"},"elliptic curve recovery")," with the serialization and signature.")),Object(i.b)("h4",{id:"example-3"},"Example"),Object(i.b)("p",null,"Given the message and signature provided in the previous examples, the elliptic curve recovery MUST match the following Ethereum address:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"0x59DAD64610319200800D7A9b5259B7CbA937cc12\n")),Object(i.b)("h2",{id:"non-normative"},"Non-Normative"),Object(i.b)("h3",{id:"ethereum-wallets"},"Ethereum Wallets"),Object(i.b)("p",null,"Ethereum wallets can use the JSON-RPC method ",Object(i.b)("a",{parentName:"p",href:"https://eth.wiki/json-rpc/API#eth_sign"},Object(i.b)("inlineCode",{parentName:"a"},"eth_sign")),"\nto go directly from announcement serialization sans-prefix to signature.\nThe Announcement Signature specification matches this signature algorithm."))}void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!Object.prototype.hasOwnProperty.call(d,"__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/DSNP/Signatures.md"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-dsnp-signatures-md-43e51a4d2dfade44240a.js.map