var gulp     = require('gulp')
var iconutil = require('gulp-iconutil')
var childProcess = require('child_process')
var fs = require('fs')

var packageJson = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('icon', function(){
  gulp.src('./icon/icon_*.png')
    .pipe(iconutil('app.icns'))
    .pipe(gulp.dest('./icon/'))
})

gulp.task('build',['icon'],function(cb){

  var build = 'electron-packager . ' + packageJson.name + ' --platform=darwin --arch=x64 --version=0.33.4 --icon=./icon/app.icns --overwrite --out ./release/' + packageJson.version + '/'
  ls = childProcess.exec(build, function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code: '+error.code);
    console.log('Signal received: '+error.signal);
  }
  console.log('Child Process STDOUT: '+stdout);
  console.log('Child Process STDERR: '+stderr);
  });

  ls.on('exit', function (code) {
    cb()
  })
})
