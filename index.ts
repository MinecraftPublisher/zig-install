import fs from 'fs'
import os from 'os'

console.log('Starting build...')

try { fs.mkdirSync('build/') } catch (e) { }

console.log('Fetching release page data...')
let index = await fetch('https://ziglang.org/download/index.json').then(e => e.json())

let target = process.arch.replace('x64', 'x86_64') + '-' + process.platform
console.log('Looking for build target:', target)
let tarball_url = index.master[target].tarball
let tarball_version = tarball_url.substring('https://ziglang.org/builds/'.length)

let dir = 'build/' + tarball_version.substring(0, tarball_version.length - '.tar.xz'.length)

if (fs.existsSync(dir)) {
    console.log('Skipping download and extraction...')
} else {
    console.log('Retreiving tarball...')
    let tarball_file = Bun.file('build/' + tarball_version)
    let tarball

    if (await tarball_file.exists()) {
        console.log('Using cached tarball:', new Date(tarball_file.lastModified))
        tarball = await tarball_file.stream()
    } else {
        console.log('Using tarball url:', tarball_url)

        console.time('Download tarball')
        let tarball_image = await fetch(tarball_url).then(e => e.blob())
        tarball = tarball_image.stream()
        console.timeEnd('Download tarball')
    }

    console.log('Writing to', tarball_version, '...')
    let tarblob = await Bun.readableStreamToBlob(tarball)
    await Bun.write('build/' + tarball_version, tarblob)

    Bun.spawnSync(['tar', '-xf', 'build/' + tarball_version, '-C', 'build/'])
}

console.log('Copying to home directory...')

let home = os.homedir()
console.log('Home directory:', home)

Bun.spawnSync(['rm', '-rf', home + '/zig/'])
Bun.spawnSync(['cp', '-r', dir, home])
Bun.spawnSync(['mv', home + '/' + dir.split('/').slice(1).join('/'), home + '/zig'])