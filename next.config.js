const slashes = require("remove-trailing-slash")
const imgHost = slashes(process.env.NEXT_PUBLIC_WORDPRESS_URL).split("/")[2]
const path = require("path")

module.exports = {
  images: {
    // domains: [`${imgHost}`, `localhost`],
    domains: [`${imgHost}`, "localhost", "res.cloudinary.com"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
}
