(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{F4nq:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return o})),a.d(t,"default",(function(){return b}));var n=a("Fcif"),s=a("+I+c"),c=(a("mXGw"),a("/FXl")),i=a("TjRS"),o=(a("aD51"),{});void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/Batches/Overview.md"}});var r={_frontmatter:o},l=i.a;function b(e){var t=e.components,a=Object(s.a)(e,["components"]);return Object(c.b)(l,Object(n.a)({},r,a,{components:t,mdxType:"MDXLayout"}),Object(c.b)("h1",{id:"batches"},"Batches"),Object(c.b)("p",null,"The Batches specifications describe how Batches are announced, stored and queried. A batch file is made of one type of DSNP message."),Object(c.b)("h2",{id:"file-format"},"File Format"),Object(c.b)("p",null,"The storage file format is ",Object(c.b)("a",{parentName:"p",href:"https://github.com/apache/parquet-format"},"Apache Parquet"),"."),Object(c.b)("h2",{id:"batch-announcements"},"Batch Announcements"),Object(c.b)("p",null,"DSNP Messages are queued where they go directly into one or more DSNP Message Type queues. At some point when a queue is filled, the messages are dequeued and written to a Batch files and stored. The details of each created batch are sent to IAnnounce. IAnnounce emits one message per Batch file. Please see ",Object(c.b)("a",{parentName:"p",href:"/Messages/Announce"},"Announce Message")," documentation for more details."),Object(c.b)("h2",{id:"batch-file-urls"},"Batch file URLs"),Object(c.b)("p",null,"The Batch file URL accepts different schemes to assist with knowing how to retrieve\nand query the file contents.  This allows adapters to be written to support different\nmethods of storage and retrieval."),Object(c.b)("p",null,"For HTTPS downloads, the SDK uses ",Object(c.b)("inlineCode",{parentName:"p"},"https")," as needed:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-typescript"},"    queue.commit({scheme: 'https'})    \n")),Object(c.b)("p",null,"so that the URI emitted in the announcement would look something like:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-typescript"},'   dsnpUri: "https://some.cloudhosting.com/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41.parquet"\n')),Object(c.b)("p",null,"If it were for retrieval directly from Amazon S3, the SDK could use ",Object(c.b)("inlineCode",{parentName:"p"},"s3"),":"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-typescript"},"    queue.commit({scheme: 's3'})    \n")),Object(c.b)("p",null,"Resulting in s3 instead of https in the announcement:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-typescript"},'    dsnpUri: "s3://s3.us-west-2.amazonaws.com/mybucket/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41.parquet"\n')),Object(c.b)("h2",{id:"queries"},"Queries"),Object(c.b)("p",null,"Querying a batch file is done via Bloom filters.  The query call is done through the SDK and\nconsists of a URL and an object of DSNP message column name/value pairs.  Example:"),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-typescript"},'    includes:boolean = sdk.batchIncludes(\n        "https://mycloudhost.com/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41",\n        { fromAddress: "45cdf29f9d10e57a5c1d993745acd65315cabs2a3aa2b1b",\n          dsnpType: 2\n        }\n    )\n')),Object(c.b)("p",null,"Not all fields of a DSNP data type are added to the Bloom filters.  Generally speaking, content hashes and URIs are omitted, whereas any field containing a socialAddress or other meaningful text is included in the Bloom filter.  For more detail, see ",Object(c.b)("a",{parentName:"p",href:"/Messages/Overview"},"See the Messages Overview"),"."),Object(c.b)("h2",{id:"validation"},"Validation"),Object(c.b)("h3",{id:"batch-file-validation"},"Batch File Validation"),Object(c.b)("p",null,"Batch files are hashed using ",Object(c.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/SHA-3"},"keccak-256")," so that it can later be used to verify the integrity of the file. The ",Object(c.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/SHA-3"},"keccak-256")," hash of the file is submitted as part of a batch ",Object(c.b)("a",{parentName:"p",href:"/Messages/Announce"},"announcement")," that result in a ",Object(c.b)("a",{parentName:"p",href:"/Messages/Announce#announcing-dsnp-events"},"DSNPBatch")," Ethereum log event."),Object(c.b)("h3",{id:"batch-file-dsnp-type-validation"},"Batch File DSNP Type Validation"),Object(c.b)("p",null,"Each batch file consists of one type of ",Object(c.b)("a",{parentName:"p",href:"/Messages/Overview#dsnp-announcement-formats"},"DSNP announcement"),". Therefore, the file columns should correspond to the format listed in the DSNP announcement dsnpData field. For example, if the file claims to be of DSNP type Broadcast, then the file is expected to include the following columns: ",Object(c.b)("inlineCode",{parentName:"p"},"fromId"),", ",Object(c.b)("inlineCode",{parentName:"p"},"contentHash"),", ",Object(c.b)("inlineCode",{parentName:"p"},"uri"),".  As long as the batch file hash can be verified, order of dsnpData fields are irrelevant. Also note , if the announcement format does not match the format listed in ",Object(c.b)("a",{parentName:"p",href:"/Messages/Overview#dsnp-announcement-formats"},"DSNP announcement"),", reading a file is not possible. Hence, being able to successfully read the file means that the file is valid."))}void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&!b.hasOwnProperty("__filemeta")&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/Batches/Overview.md"}}),b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-batches-overview-md-fc32c8cdd6a82c2c386c.js.map