let mode =  process.env.NODE_ENV === 'production' ? 'production' : 'development'
module.exports = {
  mode : mode,
  devtool: 'source-map',
  devServer: {
    static: "./dist",
  }, 
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}