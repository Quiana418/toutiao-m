module.exports = {
  plugins: {
    // 重复配置了
    /* autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 8"],
    }, */
    'postcss-pxtorem': {
      // rootValue: 37.5,
      // 如果是vant的样式 按照37.5来转换
      // 如果是自己写的样式 按照75来换换
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
