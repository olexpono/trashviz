module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    nodemon:
      prod:
        script: "index.js"

    uglify:
      options:
        mangle: false
      dist:
        files:
          'public/js/trash-min.js' : [
            'public/js/main.js'
          ]

    watch:
      jsfiles:
        files: "public/js/!(trash-min).js"
        tasks: [ "uglify:dist" ]
        options:
          interrupt: true
      less:
        files: "public/**/*.less"
        tasks: [ "less" ]
        options:
          interrupt: true

    less:
      development:
        options: {}
        files:
          "public/css/main.css" : "public/css/main.less"

  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')

  grunt.registerTask("build", ["less", "uglify"])
  grunt.registerTask("launch", ["build", "nodemon:prod"])

  grunt.registerTask("run",
    [ "uglify",
      "watch"])
  grunt.registerTask("default", "run")


