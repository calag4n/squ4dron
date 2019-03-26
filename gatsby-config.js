module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Antre Cool`,
        short_name: `AntreCool`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#9060eb`,
        display: `standalone`,
        icon: `src/ec.png`, // This path is relative to the root of the site.
        include_favicon: true, // Include favicon
      },
    },
    `gatsby-plugin-offline`
  ],
}