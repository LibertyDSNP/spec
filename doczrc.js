export default {
  base: "/",
  typescript: true,
  ignore: ["CODEOFCONDUCT.md", "LICENSE.md", "README.md"],
  menu: [
    "Introduction",
    "Implementation Status",
    "Networks",
    {
      name: "Identity",
      menu: [
        "Overview",
        "Factory",
        "Registry"
      ]
    },
    {
      name: "Graph",
      menu: [
        "Overview"
      ]
    },
    {
      name: "Messages",
      menu: [
        "Overview",
        "Serialization",
        "Types"
      ]
    },
    {
      name: "Archivists",
      menu: [
        "Overview",
        "Format"
      ]
    },
    {
      name: "Future Proposals",
      menu: [
        "Keys",
        "Verified Attributes"
      ]
    },
    {
      name: "Reference", menu: [
        "Glossary"
      ]
    }
  ]
}
