import * as nodepath from 'path';
const ROOTFOLDER = nodepath.basename(nodepath.resolve())

const BUILDFOLDER = './dist';
const SRCFOLDER = './src';

export const path = {
   build: { /* Place where unload recycled files from src folder */
      js: `${BUILDFOLDER}/js/`,
      images: `${BUILDFOLDER}/image/`,
      css: `${BUILDFOLDER}/css/`,
      html: `${BUILDFOLDER}/`,
      fonts: `${BUILDFOLDER}/fonts/`,/* watch no track for fonts, necessary reload gulp in moment add new font */
      files: `${BUILDFOLDER}/files/`,},
   src: {
      js: `${SRCFOLDER}/js/app.js`,
      images: `${SRCFOLDER}/image/**/*.{jpg,jpeg,png,gif,webp}`,
      imagesForSvg: `${SRCFOLDER}/image/icon/**/*.*`,
      imagesSrcSvg: `${SRCFOLDER}/image/`,
      svg: `${SRCFOLDER}/image/**/*.svg`,
      scss: `${SRCFOLDER}/scss/style.scss`,
      html: `${SRCFOLDER}/*.html`,
      files: `${SRCFOLDER}/files/**/*.*`,
      svgicons: `${SRCFOLDER}/svgicons/*.svg`, /* **-проверяем любые папки паки files, *.* - проверяем любые папки с любым названием и любым расширением */
   },
   watch: {
      js: `${SRCFOLDER}/js/**/*.js`,
      scss: `${SRCFOLDER}/scss/**/*.scss`,
      html: `${SRCFOLDER}/**/*.html`,
      images: `${SRCFOLDER}/image/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`, 
      files: `${SRCFOLDER}/files/**/*.*`},
   clean: BUILDFOLDER,
   buildFolder: BUILDFOLDER,
   srcFolder: SRCFOLDER,
   rootFolder: ROOTFOLDER,
   ftp: ''
}

/* EVERY TIME at add new gulp-module create new task in folder tasks */