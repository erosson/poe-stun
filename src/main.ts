import * as fs from 'fs/promises'
import * as zlib from 'zlib'
import {promisify} from 'util'

async function main() {
    const input = await fs.readFile(`${__dirname}/../test/pob-example.txt`)
    const lines = input.toString().split("\n").filter(l => !(l.startsWith('#') || l.startsWith('//')))
    if (lines.length !== 1) throw new Error('invalid pob file')
    const pob = lines[0]
    const zip = Buffer.from(pob, 'base64url')
    const xml = await promisify(zlib.unzip)(zip)
    // const xml = await promisify(zlib.unzip)(zip)
    console.log(xml.toString())
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})