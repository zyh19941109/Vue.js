const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const vsftp = require('gulp-vsftp');
const zip = require('gulp-zip');
const dayjs = require('dayjs');
const distFile = 'dist';//打包目录
const packageInfo = require("./package.json");

// gulp.task--定义任务
// gulp.src--找到需要执行任务的文件
// gulp.dest--执行任务的文件的去处
// gulp.watch--观察文件是否发生变化

//压缩打包文件
gulp.task('zip', _ => gulp.src(path.resolve(distFile + '/**'))
    .pipe(zip('uufe' + packageInfo.version + '-' + dayjs().format('YYYY-MM-DD HH-mm-ss') + '.zip'))
    .pipe(gulp.dest('./')))

gulp.task('test', _ => {//上传生产目录到测试环境
    return gulp.src(distFile+'/**')
        .pipe(vsftp({
            host: '192.168.1.100',
            user: 'admin',
            pass: 'xxxxxx',
            cleanFiles: true,
            remotePath: '/www/web/pc/',
        }));
});

gulp.task('pre', _ => {//上传生产目录到线上环境
    return gulp.src(distFile+'/**')
        .pipe(vsftp({
            host: '192.168.1.101',
            user: 'admin',
            pass: 'xxxxxx',
            cleanFiles: true,
            remotePath: '/www/web/pc/',
        }));
});
