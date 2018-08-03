var gulp = require('gulp'),
nodemon = require('gulp-nodemon'),
gulpMocha = require('gulp-mocha'),
env = require('gulp-env');




gulp.task('default',function(){
nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
        port:8000
    },
ignore: ['./node_module/**']
})
.on('restart',function(){
console.log('Restarting');

});
});
gulp.task('test',function(){
    
    gulp.src('Tests/*.js',{read: false})
    .pipe(gulpMocha({reporter: 'Bir'}))


});