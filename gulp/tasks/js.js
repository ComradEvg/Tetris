import webpack from 'webpack-stream'

export const js = () => {
   return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })/* Recieve access to(k) file in folder js */
      .pipe(app.plugins.plumber/* Treats error in time compilation gulp */(
         app.plugins.notify/* Notify output error */.onError({
            title: "JS",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(webpack({
         mode: app.isBuild ? 'production' : 'development',
         output: {
            filename: 'app.min.js'
         }
      }))
      .pipe(app.gulp.dest(app.path.build.js)) /* Recycled in folder dist */
      .pipe(app.plugins.browsersync.stream()) /* Update browser */
}


/* Finally export this task in gulpfile.js in section 'import tasks from folder tasks' */