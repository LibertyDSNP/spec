(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{QSMz:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return c})),a.d(t,"default",(function(){return d}));var n=a("Fcif"),i=a("+I+c"),b=(a("mXGw"),a("/FXl")),r=a("TjRS"),l=(a("aD51"),["components"]),c={};void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!Object.prototype.hasOwnProperty.call(c,"__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/Draft/Archivists.md"}});var s={_frontmatter:c},o=r.a;function d(e){var t=e.components,a=Object(i.a)(e,l);return Object(b.b)(o,Object(n.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(b.b)("h1",{id:"draft-archivists-overview"},"DRAFT: Archivists Overview"),Object(b.b)("p",null,"The job of an Archivist is to permanently store Batch content and DSNP Announcements in a format that is easily validated and retrieved."),Object(b.b)("p",null,"The Archivist must be able to access chain data and all DSNP Announcement URLs."),Object(b.b)("h2",{id:"validations-that-archivists-could-perform"},"Validations that Archivists could perform"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"Signature validation - proof that author provided a real signature"),Object(b.b)("li",{parentName:"ul"},"Signature authentication - proof that the From address is the signer, or that signer is a valid delegate  (proof of authorship)"),Object(b.b)("li",{parentName:"ul"},"There is retrievable content at the URL given in the DSNP message"),Object(b.b)("li",{parentName:"ul"},"The content hash is valid - that is, the URL serves the claimed data")),Object(b.b)("p",null,"All signatures for the announcement are included in the batch regardless of how the signature was requested (or not)"),Object(b.b)("h1",{id:"archive-storage-format"},"Archive Storage Format"),Object(b.b)("p",null,"Specify the off-chain Archivist ",Object(b.b)("em",{parentName:"p"},"storage")," format."),Object(b.b)("h2",{id:"assumptions"},"Assumptions"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"Chain messages are on Ethereum."),Object(b.b)("li",{parentName:"ul"},"Message data is posted via ",Object(b.b)("a",{parentName:"li",href:"https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378"},"Ethereum log events"),"."),Object(b.b)("li",{parentName:"ul"},"Signature algorithm is ",Object(b.b)("a",{parentName:"li",href:"https://en.bitcoin.it/wiki/Secp256k1"},"secp256k1"),". This allows the use ",Object(b.b)("inlineCode",{parentName:"li"},"ecreover")," to get public keys. A public key also need not be included in a log event for ease of validation."),Object(b.b)("li",{parentName:"ul"},"Content hashes are created via the same ",Object(b.b)("a",{parentName:"li",href:"https://keccak.team/files/Keccak-submission-3.pdf"},"keccak-256 hashing algorithm")," used by Ethereum.")),Object(b.b)("h2",{id:"archive-entry"},"Archive Entry"),Object(b.b)("p",null,"An archive entry is a combination of data in a DSNP message and from the block in which it is included.\nIt is a key-value map consisting of the following fields:"),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"field name"),Object(b.b)("th",{parentName:"tr",align:null},"description"),Object(b.b)("th",{parentName:"tr",align:null},"type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"dsnpType")),Object(b.b)("td",{parentName:"tr",align:null},"DSNP message type"),Object(b.b)("td",{parentName:"tr",align:null},"number/enum. see ",Object(b.b)("a",{parentName:"td",href:"/DSNP/Types"},"DSNP Message Types"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"dsnpData")),Object(b.b)("td",{parentName:"tr",align:null},"DSNP message data"),Object(b.b)("td",{parentName:"tr",align:null},"see fields in ",Object(b.b)("a",{parentName:"td",href:"/DSNP/Announcements"},"DSNP Messages"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"signatures")),Object(b.b)("td",{parentName:"tr",align:null},"list of signatures for this message"),Object(b.b)("td",{parentName:"tr",align:null},"array of Signatures")))),Object(b.b)("h3",{id:"dsnptype"},Object(b.b)("inlineCode",{parentName:"h3"},"dsnpType")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"number"),Object(b.b)("li",{parentName:"ul"},"Indicates what type of message this is, useful for indexers and filters.")),Object(b.b)("h3",{id:"dsnpdata"},Object(b.b)("inlineCode",{parentName:"h3"},"dsnpData")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"varies"),Object(b.b)("li",{parentName:"ul"},"This can be encrypted where appropriate. The decrypted, fully deserialized version must be one of the types described in ",Object(b.b)("a",{parentName:"li",href:"/DSNP/Announcements"},"DSNP Messages"),".")),Object(b.b)("h3",{id:"signatures"},Object(b.b)("inlineCode",{parentName:"h3"},"signatures")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"array"),Object(b.b)("li",{parentName:"ul"},"all the signatures applied to this message at the time of archival.")),Object(b.b)("h2",{id:"batch"},"Batch"),Object(b.b)("p",null,"A ",Object(b.b)("em",{parentName:"p"},"Batch")," is data that is referenced by a Batch Announcement.\nIt consists of one or more ArchiveEntries."),Object(b.b)("table",null,Object(b.b)("thead",{parentName:"table"},Object(b.b)("tr",{parentName:"thead"},Object(b.b)("th",{parentName:"tr",align:null},"field"),Object(b.b)("th",{parentName:"tr",align:null},"description"),Object(b.b)("th",{parentName:"tr",align:null},"type"))),Object(b.b)("tbody",{parentName:"table"},Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"archives")),Object(b.b)("td",{parentName:"tr",align:null},"a set of ArchiveEntries"),Object(b.b)("td",{parentName:"tr",align:null},"map",Object(b.b)("inlineCode",{parentName:"td"},"[ArchiveEntry]"))),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"batchID")),Object(b.b)("td",{parentName:"tr",align:null},"keccak-256 hash of content stored at URL"),Object(b.b)("td",{parentName:"tr",align:null},"bytes32")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"blockHeight")),Object(b.b)("td",{parentName:"tr",align:null},"the block number this message was included in"),Object(b.b)("td",{parentName:"tr",align:null},"number")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"fromAddress")),Object(b.b)("td",{parentName:"tr",align:null},"social identity of batch announcer,i.e. message sender"),Object(b.b)("td",{parentName:"tr",align:null},"bytes")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"logIndex")),Object(b.b)("td",{parentName:"tr",align:null},"the index within the logs of this message"),Object(b.b)("td",{parentName:"tr",align:null},"number")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"signature")),Object(b.b)("td",{parentName:"tr",align:null},"announcer's signature"),Object(b.b)("td",{parentName:"tr",align:null},"Signature")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"transactionIndex")),Object(b.b)("td",{parentName:"tr",align:null},"the index of the transaction this message is associated with"),Object(b.b)("td",{parentName:"tr",align:null},"number")),Object(b.b)("tr",{parentName:"tbody"},Object(b.b)("td",{parentName:"tr",align:null},Object(b.b)("inlineCode",{parentName:"td"},"url")),Object(b.b)("td",{parentName:"tr",align:null},"the location of this archive"),Object(b.b)("td",{parentName:"tr",align:null},"string")))),Object(b.b)("h3",{id:"archives"},Object(b.b)("inlineCode",{parentName:"h3"},"archives")),Object(b.b)("p",null,"The set of ArchiveEntries is a key-value map, with the key\nbeing the ",Object(b.b)("inlineCode",{parentName:"p"},"archiveEntryID"),", which is a:"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"bytes32"),Object(b.b)("li",{parentName:"ul"},"The keccak-256 hash of all of the Archive Entry fields in a keccak-256 hash with the archiveEntryID field being blank.")),Object(b.b)("h3",{id:"batchid"},Object(b.b)("inlineCode",{parentName:"h3"},"batchID")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"bytes32"),Object(b.b)("li",{parentName:"ul"},"the keccak-256 hash of content stored at the URL referenced in this batch.")),Object(b.b)("h3",{id:"blockheight"},Object(b.b)("inlineCode",{parentName:"h3"},"blockHeight")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"number"),Object(b.b)("li",{parentName:"ul"},"The block in which this DSNP Message is included.")),Object(b.b)("h3",{id:"fromaddress"},Object(b.b)("inlineCode",{parentName:"h3"},"fromAddress")),Object(b.b)("p",null,"the social identity of the batch announcer, i.e. the message sender."),Object(b.b)("h3",{id:"logindex"},Object(b.b)("inlineCode",{parentName:"h3"},"logIndex")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"number"),Object(b.b)("li",{parentName:"ul"},"The log index in which this DSNP Message is included")),Object(b.b)("h3",{id:"signature"},Object(b.b)("inlineCode",{parentName:"h3"},"signature")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",{parentName:"li",href:"#Signature"},"Signature")," (see below)"),Object(b.b)("li",{parentName:"ul"},"The signature of this batch announcer")),Object(b.b)("h3",{id:"transactionindex"},Object(b.b)("inlineCode",{parentName:"h3"},"transactionIndex")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"number"),Object(b.b)("li",{parentName:"ul"},"The transaction index in which this DSNP Message is included")),Object(b.b)("h3",{id:"url"},Object(b.b)("inlineCode",{parentName:"h3"},"url")),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"string"),Object(b.b)("li",{parentName:"ul"},"The permanent URL address where this archive is stored.")),Object(b.b)("h2",{id:"signature-1"},"Signature"),Object(b.b)("p",null,"A Signature consists of two fields:"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"signature")," - A ",Object(b.b)("a",{parentName:"li",href:"https://en.bitcoin.it/wiki/Secp256k1"},"secp256k1")," signature"),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"result")," - Optional, bytes. A result of an operation performed. For example, if a signing entity wished to prove that they had performed some sort of validation or analysis on the message, they would put the result of the analysis in this field. It could be a meaningful number or string, some sort of proof hash, etc.")),Object(b.b)("h2",{id:"diagram"},"Diagram"),Object(b.b)("p",null,Object(b.b)("img",{alt:"Archive Messages Diagram",src:"https://github.com/LibertyDSNP/spec/blob/c9f55041950e7f54ce07d0f32de6b35d4fa4e7c0/images/ArchiveMessages.png?raw=true"})))}void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!Object.prototype.hasOwnProperty.call(d,"__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/Draft/Archivists.md"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-draft-archivists-md-5ff7c4171ae262e48197.js.map