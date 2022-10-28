let mode =  process.env.NODE_ENV === 'production' ? 'production' : 'development'
module.exports = {
  mode : mode,
  devtool: 'source-map',
  devServer: {
    static: "./dist",
    hot: true
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