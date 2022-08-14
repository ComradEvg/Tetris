import svgSprite from 'gulp-svg-sprite'

export const svgSprites = () => {
   return app.gulp.src(`${app.path.src.svgicons}`, {})/* Recieve access to(k) file in folder js */
      .pipe(app.plugins.plumber/* Treats error in time compilation gulp */(
         app.plugins.notify/* Notify output error */.onError({
            title: "SVG",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(svgSprite({
         mode: {
            stack: {
               sprite: '../icons/icons.svg',
               example: true
            }
         },
         
      }))

      .pipe(app.gulp.dest(app.path.srcFolder)) /* Recycled in folder dist */
}


/* Finally export this task in gulpfile.js in section 'import tasks from folder tasks' */