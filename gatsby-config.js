const config = require('./src/config')

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    author: config.siteAuthor,
    siteUrl: config.siteUrl,
    logo: {
      src: config.siteLogo,
      alt: config.siteLogoAlt,
    },
    logoText: config.siteTitleAlt,
    defaultTheme: 'dark',
  },
  
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleAlt,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `standalone`,
        icon: config.siteIcon,
        include_favicon: true, // Include favicon
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: true,
      },
    },
    `gatsby-plugin-offline`
  ],
}