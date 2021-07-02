(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"bE/G":function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return b}));var n=a("Fcif"),i=a("+I+c"),r=(a("mXGw"),a("/FXl")),o=a("TjRS"),l=(a("aD51"),{});void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"pages/Graph/Overview.md"}});var s={_frontmatter:l},c=o.a;function b(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(r.b)(c,Object(n.a)({},s,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"graph"},"Graph"),Object(r.b)("p",null,"This specification describes the social network graph and how it is represented in the protocol. "),Object(r.b)("p",null,"In this context a ",Object(r.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Social_graph"},"social graph")," means a graph that represents social relations between entities."),Object(r.b)("p",null,"The DSNP graph represents users as ",Object(r.b)("a",{parentName:"p",href:"/Identity/Overview"},"DSNP User Ids"),'.\nEach instance of a social network graph is made up of a DSNP User Id following other DSNP User Ids.\nWhen the term "user" is referenced below it is referring to a DSNP User Id.'),Object(r.b)("h2",{id:"specification-status"},"Specification Status"),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Version"),Object(r.b)("th",{parentName:"tr",align:null},"Status"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},"0.1"),Object(r.b)("td",{parentName:"tr",align:null},"Draft")))),Object(r.b)("h2",{id:"purpose"},"Purpose"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Describe the form of Graph Message posted to the blockchain"),Object(r.b)("li",{parentName:"ol"},"Explain how to retrieve and resolve the graph"),Object(r.b)("li",{parentName:"ol"},"Facilitate use of SDK and interpretation of graph-data")),Object(r.b)("h2",{id:"assumptions"},"Assumptions"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"All graph messages will be of type ",Object(r.b)("inlineCode",{parentName:"li"},"GraphChange"),"."),Object(r.b)("li",{parentName:"ul"},"All ",Object(r.b)("inlineCode",{parentName:"li"},"GraphChange")," messages will be added to batch files for an announcement on block chain")),Object(r.b)("p",null,"##Terminology"),Object(r.b)("h4",{id:"friendship"},"Friendship"),Object(r.b)("p",null,'There is no concept of "friendship" within the DSNP social network graph.\nFriendship requires a mutual acknowledgement between 2 different DSNP User Identities.\nFriendship can be thought as "mutual following" - where 2 DSNP User identities are following each other. '),Object(r.b)("h4",{id:"follow"},"Follow"),Object(r.b)("p",null,'A "follow" is the act of publicly following a user (referenced as a (DSNP User Identity)',"[/Identity/Registry]",") which results in adding this DSNP User Id to a user's social graph."),Object(r.b)("h4",{id:"unfollow"},"Unfollow"),Object(r.b)("p",null,'An "unfollow" is the act of publicly unfollowing a user (referenced as a (DSNP User Identity)',"[/Identity/Registry]",") which results in the removal of this DSNP User Id from a user's social graph."),Object(r.b)("h3",{id:"graph-1"},"Graph"),Object(r.b)("p",null,"The collection of DSNP User identities that a given user is following via the DSNP protocol. "),Object(r.b)("h4",{id:"public"},"Public"),Object(r.b)("p",null,"Publicly following or unfollowing a DSNP User Id implies that anyone looking for these follow\nor unfollow events on the blockchain will be able to determine who the follower (DSNP User Id\ndoing the following) and followee (DSNP User Id being followed) are for a given event."),Object(r.b)("h2",{id:"graph-change-announcement-format"},"Graph Change Announcement Format"),Object(r.b)("p",null,'Anytime a user "follows" or "unfollows" someone - a graph change ',Object(r.b)("a",{parentName:"p",href:"/Messages/Overview"},"announcement")," is created.\nA graph change will contain the following information: ",Object(r.b)("inlineCode",{parentName:"p"},"fromId"),", ",Object(r.b)("inlineCode",{parentName:"p"},"changeType"),", ",Object(r.b)("inlineCode",{parentName:"p"},"objectId"),", ",Object(r.b)("inlineCode",{parentName:"p"},"nonce"),". See ",Object(r.b)("a",{parentName:"p",href:"/Messages/Overview"},"Messages Overview")," for more information on these fields."),Object(r.b)("h2",{id:"graph-storage"},"Graph Storage"),Object(r.b)("p",null,"All graph change announcements are signed and added to a ",Object(r.b)("a",{parentName:"p",href:"/Batches/Overview"},"batch file"),".\nOnce that batch file is complete, it is ",Object(r.b)("a",{parentName:"p",href:"/Messages/Announce"},"announced")," on the blockchain per the DSNP specification.\nEach announce event specifies the type of (",Object(r.b)("a",{parentName:"p",href:"/Messages/Announce"},"dsnpType"),") messages that are in the batch file. "),Object(r.b)("h2",{id:"graph-retrieval-ordering--reading"},"Graph Retrieval, Ordering & Reading"),Object(r.b)("p",null,"A user's graph can be derived for any given point in time by retrieving the graph change events for that time period (i.e. from block 0 to block 10).\nOnce those graph change events are retrieved, they can be ordered (as mentioned below) to reflect the current graph state\n(i.e. Charlie has followed Bob then unfollowed him and then followed him again. The graph state reflects that Charlie is Following Bob)."),Object(r.b)("p",null,"To retrieve the graph, do the following:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Retrieve the log events",Object(r.b)("a",{parentName:"li",href:"/Messages/Types"},"dsnpType"),Object(r.b)("inlineCode",{parentName:"li"},"GraphChange")," from the chain for a point in time (i.e. from a specific block number to a specific block number)"),Object(r.b)("li",{parentName:"ol"},"Retrieve the batch file from each log event. Each log event of type ",Object(r.b)("a",{parentName:"li",href:"/Messages/Announce"},"GraphChange")," has a field called ",Object(r.b)("inlineCode",{parentName:"li"},"dsnpUri")," which contains a uri pointing to a ",Object(r.b)("a",{parentName:"li",href:"/Batches/Overview"},"batch file"),". "),Object(r.b)("li",{parentName:"ol"},"Query the batch files for the data for a particular DSNP User Id to retrieve information about the respective graph. For more on how batch file storage and how to query the batch file see - ",Object(r.b)("a",{parentName:"li",href:"/Batches/Overview"},"batches overview")),Object(r.b)("li",{parentName:"ol"},"Order the retrieved data based on the following  ",Object(r.b)("ol",{parentName:"li"},Object(r.b)("li",{parentName:"ol"},"Block Number Ascending"),Object(r.b)("li",{parentName:"ol"},"Transaction Index Ascending"),Object(r.b)("li",{parentName:"ol"},"Log Index Ascending"),Object(r.b)("li",{parentName:"ol"},"Batch File Row Index Ascending\n")))),Object(r.b)("p",null,"For more on ordering see ",Object(r.b)("a",{parentName:"p",href:"/Messages/Ordering"},"Message Ordering Specification"),"."),Object(r.b)("h4",{id:"creating-the-graph"},"Creating the graph"),Object(r.b)("p",null,"Each graph change event represents a state transition for the graph.\nThe state of the graph at any time is given by taking the state of the graph at a previous time and applying all graph change events not previously applied in the order specified above."),Object(r.b)("p",null,"This can be done by retrieving ",Object(r.b)("inlineCode",{parentName:"p"},"GraphChange")," log events starting with a specific block number.\nFor example: The graph for a given user has been retrieved and stored up until block number 18.\nA filter can be added to the logs being retrieved to only retrieve log events starting from block 19."),Object(r.b)("h2",{id:"replay-attacks"},"Replay Attacks"),Object(r.b)("p",null,"Clients must ignore any GraphChange event that comes after another event with the same signature. This avoids ",Object(r.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Replay_attack"},"Replay attacks"),"\nEach graph change event has a timestamp that allows for differing signatures.\nThis timestamp is represented as microseconds since Unix epoch."),Object(r.b)("p",null,"For example:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},'Bob "follows" Charlie and then "unfollows" him then "follows" him again.',Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"If the ",Object(r.b)("inlineCode",{parentName:"li"},"GraphChange")," event has no timestamp, the second follow event would have to be ignored when reading the graph.\nIt would appear to have the same signature as the first event and therefore be a duplicate, and a potential replay attack."),Object(r.b)("li",{parentName:"ul"},"With a timestamp, the second follow event would have a unique signature and could therefore be interpreted as a valid event.")))))}void 0!==b&&b&&b===Object(b)&&Object.isExtensible(b)&&!b.hasOwnProperty("__filemeta")&&Object.defineProperty(b,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"pages/Graph/Overview.md"}}),b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---pages-graph-overview-md-c96849a987be6adcf437.js.map