(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{CGNr:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return c}));var n=a("Fcif"),r=a("+I+c"),i=(a("mXGw"),a("/FXl")),o=a("TjRS"),l=(a("aD51"),{});void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/BatchPublications/FileFormat.md"}});var s={_frontmatter:l},b=o.a;function c(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(i.b)(b,Object(n.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"batch-file-storage"},"Batch File Storage"),Object(i.b)("p",null,"Batch files are stored and transferred in Apache Parquet format."),Object(i.b)("h2",{id:"requirements"},"Requirements"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Batch File MUST match the spec for a single ",Object(i.b)("a",{parentName:"li",href:"/Announcements/Overview"},"Announcement Type"),"."),Object(i.b)("li",{parentName:"ul"},"Batch File MUST have Bloom filters set in accordance to the Announcement Type Spec."),Object(i.b)("li",{parentName:"ul"},"Batch File MUST have NO MORE THAN 128*1024 rows")),Object(i.b)("h2",{id:"bloom-filter"},"Bloom Filter"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Bloom filter MUST be a ",Object(i.b)("a",{parentName:"li",href:"https://github.com/apache/parquet-format/blob/apache-parquet-format-2.9.0/BloomFilter.md"},"Split Block Bloom filter"),"."),Object(i.b)("li",{parentName:"ul"},"False positive rate MUST be 0.001.")),Object(i.b)("p",null,"Calculation for filter bits is different and nearly a factor of 10 lower than for a standard bloom filter.\n128*1024 rows with a 0.001 false positive rate results in around 29,000 bits for a Split Block Bloom filter."),Object(i.b)("p",null,"Bloom filters are ONLY added to some fields.\nSee also ",Object(i.b)("a",{parentName:"p",href:"/Announcements/Overview"},"Announcement Types"),"."),Object(i.b)("h3",{id:"columns-with-bloom-filters"},"Columns with Bloom Filters"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Column"),Object(i.b)("th",{parentName:"tr",align:null},"Parquet Type"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"contentHash"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"emoji"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"fromId"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"inReplyTo"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"objectId"),Object(i.b)("td",{parentName:"tr",align:null},Object(i.b)("inlineCode",{parentName:"td"},"BYTE_ARRAY"))))),Object(i.b)("h2",{id:"non-normative"},"Non-Normative"),Object(i.b)("h3",{id:"design-requirements"},"Design Requirements"),Object(i.b)("p",null,"Batch files need to be quickly and easily searchable.\nMinimal storage size and fast, simple querying are preferred to guarantees of no false positives or advanced data manipulation and column relationships.\nThe files are parseable by client applications, web views or browsers running pure JavaScript without a need to convert the format."),Object(i.b)("p",null,"Applications need to know if a given Batch file has any information they are interested in without downloading the file first."),Object(i.b)("h3",{id:"why-parquet"},"Why Parquet?"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Parquet is a ",Object(i.b)("strong",{parentName:"li"},"column-oriented format"),". Since DSNP Batch Message data will have a very small column-to-row ratio compared to a typical web application database, it makes sense to prefer a column-oriented format."),Object(i.b)("li",{parentName:"ol"},"Parquet format ",Object(i.b)("strong",{parentName:"li"},"has been field-tested under extreme network conditions"),". It has broad support in cloud storage solutions, with libraries in multiple languages."),Object(i.b)("li",{parentName:"ol"},Object(i.b)("strong",{parentName:"li"},"Bloom filters are already supported")," in the Parquet specification, which allows for fast and accurate searching (with caveats for proper configuration)."),Object(i.b)("li",{parentName:"ol"},Object(i.b)("strong",{parentName:"li"},"Amazon S3 support"),": we anticipate that some Batch Announcers, and possibly Archivists, will store Batch files on Amazon S3. Amazon Athena also supports storage in Parquet, and its API supports SQL-like queries."),Object(i.b)("li",{parentName:"ol"},"Parquet also ",Object(i.b)("strong",{parentName:"li"},"allows references to the same column across files"),", which could enable multi-file querying in the future."),Object(i.b)("li",{parentName:"ol"},"Parquet ",Object(i.b)("strong",{parentName:"li"},"supports compression formats")," such as Brötli, which itself is already a browser standard and has a demonstrated improvement in compression speed and file size over older formats."),Object(i.b)("li",{parentName:"ol"},"Parquet ",Object(i.b)("strong",{parentName:"li"},"files can be transferred directly")," to clients, which can parse the files in the app or browser. No conversion to some serialization format is necessary. This eliminates an entire class of bugs as well as making both fetching and querying faster."),Object(i.b)("li",{parentName:"ol"},"Parquet ",Object(i.b)("strong",{parentName:"li"},"uses schemas"),", which additionally reduces file size.")),Object(i.b)("h3",{id:"rejected-alternatives"},"Rejected alternatives"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Cassandra, RocksDB, CouchDB, MongoDB, HBASE were rejected since DSNP data needs neither a database for storage nor the overhead of one. Each of these was designed for use cases ranging from somewhat to drastically different to the DSNP network."),Object(i.b)("li",{parentName:"ol"},"JSON, BSON and SQLite, while used for storage sometimes, are intended for serialization. They are schemaless, which results in redundant information and therefore a larger size than formats with schemas. They also don't support Bloom filters; instead indexing would be required, or new batches would need to be downloaded entirely.  The exception is SQLite, which does support more advanced queries, however, it was designed for in-memory storage.")))}void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/BatchPublications/FileFormat.md"}}),c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-batch-publications-file-format-md-3fdee4f75a13bacb9d2e.js.map