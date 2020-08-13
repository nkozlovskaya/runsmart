const gulp        = require('gulp'); /* установлен пакет gulp */
const browserSync = require('browser-sync'); /* установлен пакет browser-sync */
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


// Static server
gulp.task('server', function() {  /* будет запускаться задача "сервер" и выполняться функцмя */
    browserSync.init({
        server: {
            baseDir: "src"  /* папка, из которой будет запускаться этот "лайвсервер" */
        }
    });
});

gulp.task('styles',function(){

    return gulp.src("src/sass/**/*.+(scss|sass)")  /* данная функция возвращает результат компиляции файлов стилей в препроцессорах sass или scss */

            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))  /* компилирует файл этим препроцессором с указанным стилей - здесь сжатый стиль кода, а вторая часть покажет где была ошибка,если она произойдёт */
            .pipe(rename({ /* скомпилированный файл будет переименован, добавится суффикс .min */
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'})) /* файл будет доболнительно очищен и минимизирован */
            .pipe(gulp.dest("src/css")) /* результат компиляции будет положен в папку по указанному пути */
            .pipe(browserSync.stream()); /* после сохранения обновлений файла стилей будет обновляться страница в браузере */
})

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch','server','styles'));