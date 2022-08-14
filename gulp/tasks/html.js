import fileInclude from "gulp-file-include"
import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number' /* append some key every time by style-files, which no allow them кешировать 39:45 */
export const html = () => {
   return app.gulp.src(app.path.src.html)
   .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: 'HTML',
      message: "Error: <%= error.message %"
   })))
      .pipe(fileInclude())
      .pipe(app.plugins.replace(/@img\//g, 'image/'))
      .pipe(app.plugins.if(
         app.isBuild,
         webpHtmlNosvg()
      ))
      .pipe(
         app.plugins.if(
            app.isBuild,
            versionNumber({
            'value': '%DT%',
            'append': {
               'key': '_v',
               'cover': 0,
               'to': [
                  'css',
                  'js',
               ]
            },
            'output': {
               'file': 'gulp/version.json'
            }
         })
         )
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
}