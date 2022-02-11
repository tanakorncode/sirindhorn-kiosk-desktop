const devMode = process.env.NODE_ENV === "development";

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: (config) => {
    // if (devMode) {
    //   config.module.rules.push({
    //     enforce: "pre",
    //     test: /\.(js|vue)$/,
    //     loader: "eslint-loader",
    //     exclude: /(node_modules)/,
    //     options: {
    //       fix: true,
    //     },
    //   });
    // }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: "src/preload.js",
      builderOptions: {
        productName: "Kiosk Desktop",
        copyright: "Copyright © 2022 ${author}",
        appId: "com.tanakorncode.app",
        publish: [
          {
            provider: "generic",
            url: process.env.PUBLISH_URL,
          },
        ],
        win: {
          icon: "sirintorn.ico",
          target: [
            {
              target: "nsis",
              arch: ["x64", "ia32"],
            },
          ],
        },
        linux: {
          target: [
            {
              target: "AppImage",
              arch: ["x64"],
            },
          ],
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: "link",
              path: "/Applications",
            },
            {
              x: 130,
              y: 150,
              type: "file",
            },
          ],
          icon: "sirintorn.icns",
        },
        mac: {
          icon: "sirintorn.icns",
        },
        nodeGypRebuild: false,
        extraResources: ["./environment/**"],
        // externals: [],
        // nodeModulesPath: ["./node_modules"],
      },
    },
  },
};
