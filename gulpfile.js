var gulp     = require('gulp')
var iconutil = require('gulp-iconutil')
var childProcess = require('child_process')
var fs = require('fs')
var path = require('path');
var im = require('imagemagick');

var packageJson = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('icns', function(){
  gulp.src('./icon/icon_*.png')
    .pipe(iconutil('app.icns'))
    .pipe(gulp.dest('./icon/'))
})

gulp.task('ico', function(cb){
  var input = './icon/icon_512x512.png'
  var output = './icon/app.ico'

  im.convert([input,
      '-resize', '256x256',
      '-gravity', 'center',
      '-background', 'transparent',
      '-flatten',
      output
  ], cb);
})

gulp.task('build',['icns','ico'],function(cb){

  var build = 'electron-packager . ' + packageJson.name + ' --platform=darwin --arch=all --version=0.33.4 --icon=./icon/app --overwrite --out ./release/' + packageJson.version + '/'
  ls = childProcess.exec(build, function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code: '+error.code);
    console.log('Signal received: '+error.signal);
  }
  cb()
  //console.log('Child Process STDOUT: '+stdout);
  //console.log('Child Process STDERR: '+stderr);
  });
  ls.stdout.on('data', function(data) {
    console.log(data.toString());
  })
  ls.stderr.on('data', function(data) {
    console.error(data.toString());
  })
  ls.on('exit', function (code) {

  })
})
