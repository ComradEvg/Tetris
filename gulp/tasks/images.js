import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'

export const images = () => {
   return app.gulp.src(app.path.src.images, { sourcemaps: true })/* Recieve access to(k) file in folder js */
      .pipe(app.plugins.plumber/* Treats error in time compilation gulp */(
         app.plugins.notify/* Notify output error */.onError({
            title: "IMAGE",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(app.plugins.newer(app.path.build.images))
      .pipe(app.plugins.if(
         app.isBuild,
         webp()
      ))
      .pipe(app.plugins.if(
         app.isBuild,
         app.gulp.dest(app.path.build.images)
      ))
      .pipe(app.plugins.if(
         app.isBuild,
         app.gulp.src(app.path.src.images)
      ))
      .pipe(app.plugins.if(
         app.isBuild,
         app.plugins.newer(app.path.build.images)
      ))
      .pipe(app.plugins.if(
         app.isBuild,
         imagemin({
         progressive: true,
         svgoPlugins: [{removeViewBox: false}],
         interlaced: true,
         optimizationLevel: 3
      })
      ))
      .pipe(app.gulp.dest(app.path.build.images)) /* Recycled in folder dist */
      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(app.plugins.browsersync.stream()) /* Update browser */
}