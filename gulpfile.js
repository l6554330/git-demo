/*
 * @Author: 我是帅比
 * @Date:   2017-05-20 12:50:24
 * @Last Modified by:   我是帅比
 * @Last Modified time: 2017-05-20 14:22:22
 */

'use strict';
/**
 * 1.less编译 压缩 合并
 * 2.js合并 压缩 混淆
 * 3.img复制
 * 4.html压缩
 */
//在gulpfile中先载入gulp包，英文因为这个包提供了一些api
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

//1.less编译 压缩 合并
gulp.task('style', function() {
    //这里是在执行style任务时自动执行的
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//js合并 压缩 混淆
gulp.task('script', function() {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//img复制
gulp.task('image', function() {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//html压缩
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: ['dist']
        },
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch('src/styles/*.less', ['style']);
    gulp.watch('src/scripts/*.js', ['script']);
    gulp.watch('src/images/*.*', ['image']);
    gulp.watch('src/*.html', ['html']);
});
