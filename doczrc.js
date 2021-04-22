export default {
  base: "/",
  typescript: true,
  ignore: ["CODEOFCONDUCT.md", "LICENSE.md", "README.md"],
  themeConfig: {
    colors: {
      primary: "#21cf80",
      secondary: "#21cf80",
      accent: "#21cf80",
      header: {
        bg: "#424242",
      },
      sidebar: {
        navLinkActive: "#21cf80",
        bg: "#f7f7f7",
      },
      muted: '#f6f6f6',
      modes: {
        dark: {
          background: "#2b2b2b",
          primary: "#26e990",
          secondary: "#26e990",
          accent: "#26e990",
          header: {
            bg: "#000",
          },
          sidebar: {
            navLinkActive: "#26e990",
            bg: "#1c1c1c",
          },
        }
      }
    },
    fonts: {
      heading: 'Helvetica',
      body: 'Helvetica',
      sidebar: 'Helvetica'
    },
    fontSizes: [
      12, 14, 16, 18, 22, 30, 38, 50
    ],
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
  },
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
    },
    {
      name: '↩ Developer Portal', route: 'https://www.projectliberty.io/#/developer-portal'
    }
    ]
}