export const copy = () => {
   return app.gulp.src(app.path.src.files)
      .pipe(app.gulp.dest(app.path.build.files))
}

export const copySVG = () => {
   return app.gulp.src(app.path.src+"icons/")
      .pipe(app.gulp.dest(app.path.build.images))
}
/* Task which copy all files to build from src */