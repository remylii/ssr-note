module.exports = {
  plugins: [
    require('postcss-easy-import')({ glob: true }),
    require('autoprefixer')
  ]
};

