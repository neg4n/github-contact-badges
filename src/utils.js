import * as fs from 'fs'
import * as path from 'path'

const dirname = path.resolve(path.dirname(''))
const assetsDir = path.join(dirname, 'assets')

export default class Utils {
  static readAsset(assetName) {
    return fs.readFileSync(path.join(assetsDir, assetName)).toString()
  }
}