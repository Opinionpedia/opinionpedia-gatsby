module.exports = {
  siteMetadata: {
    title: `Opinionpedia`,
    description: `an encylopedia for opinions, free software, non-profit, free survey site`,
    author: `Opinionpedia`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Opinionpedia.org - an encylopedia for opinions`,
        short_name: `Opinionpedia`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/opinionpedia.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    `gatsby-plugin-offline`,
  ],
}
