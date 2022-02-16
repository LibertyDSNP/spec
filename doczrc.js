export default {
  base: "/",
  typescript: true,
  ignore: ["CODEOFCONDUCT.md", "LICENSE.md", "README.md"],
  themeConfig: {
    colors: {
      primary: "#f6695d",
      secondary: "#f6695d",
      accent: "#f6695d",
      header: {
        bg: "#E0E0E0",
      },
      sidebar: {
        navLinkActive: "#f6695d",
        bg: "#f7f7f7",
      },
      muted: '#f6f6f6',
      modes: {
        dark: {
          background: "#2b2b2b",
          primary: "#f6695d",
          secondary: "#f6695d",
          accent: "#f6695d",
          header: {
            bg: "#000",
          },
          sidebar: {
            navLinkActive: "#f6695d",
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
    {
      name: "DSNP",
      menu: [
        "Overview",
        "Identifiers",
        "Graph",
        "Batch Publications",
        "Batch Publication File Format",
        "Announcements"
      ]
    },
    {
      name: "Announcements",
      menu: [
        "Overview",
      ],
    },
    {
      name: "Activity Content",
      menu: [
        "Overview",
      ]
    },
    "DSNP Implementations",
    {
      name: "DSNP: Ethereum",
      menu: [
        "Overview"
      ]
    },
    {
      name: "Reference", menu: [
        "Glossary"
      ]
    },
    "Draft Specifications",
    {
      name: '↩ Developer Portal', route: 'https://www.dsnp.org/developer-portal/'
    }
  ]
}
