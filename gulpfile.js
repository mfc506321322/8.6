/* 1.按照原图进行页面的高度还原，结构合理（8），样式精准（8）。
2.实现iphone4到iphonex的设备适配；
3.基于gulp搭建项目开发脚手架，配置server，并实现watch自动刷新；
4.使用gulp进行接口的开发，并实现模拟数据；
5.使用gulp实现css压缩和js压缩；
6.创建github仓库，在开发页面过程中至少更新三次仓库，git不可上传node_modules目录；
7.项目结构规范清晰
8.实现页面轮播图的效果
9.完成列表数据请求和渲染
10.核心代码具有规范的注释；
11.页面功能正常无bug；
12.页面列表实现better-scroll滚动 */
var gulp = require('gulp'),
es5js = require('gulp-babel'),
server = require('gulp-webserver'),
uglify = require('gulp-uglify');
var fs = require('fs'),
path = require('path'),
url = require('url');
var data = require('./mock/data.json');

gulp.task('server',function(){
    return gulp.src('./mock')
        .pipe(server({
            port:8080,
            open:true,
            middleware:function(req,res,next){
                if(req.url == '/favicon.ico'){
                    return;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname == '/'?'index.html':pathname;
                if(pathname == "/api/getData"){
                    res.end(JSON.stringify(data));
                }else{
                    res.end(fs.readFileSync(path.join(__dirname,'src',pathname)));
                }
            }
        }))
})
gulp.task('reload',function(){
    gulp.watch('./src/css/*.scss',["server"]);
})
gulp.task('default',["server","reload"]);