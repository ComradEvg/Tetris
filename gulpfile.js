import gulp from "gulp"

import { path } from "./gulp/config/path.js"

import {plugins} from "./gulp/config/plugins.js"


global.app = {
   isBuild: process.argv.includes('--build'),
   isDev: !process.argv.includes('--build'),
   path: path,
   gulp: gulp,
   plugins: plugins
}

// import tasks from folder tasks

import { copy, copySVG } from "./gulp/tasks/copy.js"
import { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js"
import { server } from './gulp/tasks/server.js'
import { scss } from './gulp/tasks/scss.js'
import { js } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'
import {otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js'
import { svgSprites } from './gulp/tasks/svgSprite.js'


function watcher(){
   gulp.watch(path.watch.files, copy)
   gulp.watch(path.watch.html, html)
   gulp.watch(path.watch.scss, scss)
   gulp.watch(path.watch.js, js)
   gulp.watch(path.watch.images, images)
}



const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

// Base tasks
const mainTasks = gulp.parallel( copy, html, scss, js, images, copySVG)

// Building scenario implementation tasks
const dev = gulp.series(reset, fonts, mainTasks, gulp.parallel(watcher, server))

const svgSprite = svgSprites

const build = gulp.series(reset, mainTasks)

export {svgSprite} /* svgSprite run separately */
export {dev}
export {build}

// Implementation scenario default
gulp.task('default', dev)


/* What would start gulp necessary write 'npm run gulp'
What would svgSprite necessary write 'npm run svgSprite' 

all command indicate in file package.json section scripts*/