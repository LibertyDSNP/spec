(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{giJM:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return c})),a.d(t,"default",(function(){return b}));var n=a("Fcif"),i=a("+I+c"),s=(a("mXGw"),a("/FXl")),r=a("TjRS"),c=(a("aD51"),{});void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/Batches/Queries.md"}});var l={_frontmatter:c},o=r.a;function b(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(s.b)(o,Object(n.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(s.b)("h1",{id:"queries"},"Queries"),Object(s.b)("p",null,"This specification describes how Batch files should be queried."),Object(s.b)("h2",{id:"specification-status"},"Specification Status"),Object(s.b)("table",null,Object(s.b)("thead",{parentName:"table"},Object(s.b)("tr",{parentName:"thead"},Object(s.b)("th",{parentName:"tr",align:null},"Version"),Object(s.b)("th",{parentName:"tr",align:null},"Status"))),Object(s.b)("tbody",{parentName:"table"},Object(s.b)("tr",{parentName:"tbody"},Object(s.b)("td",{parentName:"tr",align:null},"0.1"),Object(s.b)("td",{parentName:"tr",align:null},"Draft")))),Object(s.b)("h2",{id:"purpose"},"Purpose"),Object(s.b)("ol",null,Object(s.b)("li",{parentName:"ol"},"Specify how Batch files may be queried"),Object(s.b)("li",{parentName:"ol"},"Outline the API to be implemented in the SDK")),Object(s.b)("h2",{id:"assumptions"},"Assumptions"),Object(s.b)("ul",null,Object(s.b)("li",{parentName:"ul"},"All assumptions from ",Object(s.b)("a",{parentName:"li",href:"/Messages/Overview"},"DSNP Messages"))),Object(s.b)("h2",{id:"goals-of-batch-design"},"Goals of Batch Design"),Object(s.b)("p",null,"We wish to minimize the number of queries needed and the amount of data clients must retrieve in order to get data the client wants.\nThis is to be balanced with avoiding operational overhead of a database, which would do indexing and support more advanced queries.\nIt is anticipated that indexing services would fill this need if it arises."),Object(s.b)("h2",{id:"details"},"Details"),Object(s.b)("p",null,"Following the ",Object(s.b)("a",{parentName:"p",href:"https://github.com/apache/parquet-format"},"Parquet spec"),", the query values are hashed and the Bloom filter in the batch file is pulled from the file and checked for that hash.\nOnly valid DSNP message fields, that is, columns in Parquet, can be checked."),Object(s.b)("p",null,"Here is an example use case of how a batch file containing Broadcasts might be queried for a specific social address."),Object(s.b)("p",null,Object(s.b)("strong",{parentName:"p"},"NOTE the following SDK functions don't exist at this time")),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-typescript"},"function getLatestPostsFrom(socialAddress: string, lastLogin: Date): Array<DSNPMessage> {\n\n    const lastLoginBlock = sdk.timestampToBlockHeight(lastLogin)\n\n    const batches: Array<Batch> = sdk.getBatchesSince(lastLoginBlock)\n    let matchUrls: Array<string>\n\n    const query: Record<Keys,Type> = { fromAddress: socialAddress }\n\n    batches.map(batchUrl => {\n        // fetch the BloomFilters from the URLs provided and check the filters\n        // for the hashed value\n        if (sdk.bloomFilterQuery(batchUrl, query)) matchUrls.push(batchUrl)\n    })\n\n    // this function fetches each batch file, then returns rows\n    // matching fromAddress === socialAddress\n    return sdk.batchQuery(matchUrls, query)\n}\n")))}void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&!b.hasOwnProperty("__filemeta")&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/Batches/Queries.md"}}),b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-batches-queries-md-b171affc628bb5f3b8c8.js.map