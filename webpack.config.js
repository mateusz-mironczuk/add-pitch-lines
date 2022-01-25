import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const currentFile = fileURLToPath(import.meta.url)
const directory = dirname(currentFile)

export default {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(directory, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
