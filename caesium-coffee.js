path = require('path')
vm = require('vm')

CoffeeScript = require('coffee-script')
React = require('react')
ReactDOMServer = require('react-dom/server')

module.exports = {
  fileTypes: [
    ".coffee"
  ],
  parseWeight: 15,
  displayName: 'Coffee Script',

  createRoute: function(fileObject){
    if(fileObject.frontMatter.path){
      route = fileObject.frontMatter.path
      if(path.extname(route) == ''){
        target = route + 'index.html'
      }else{
        target = route
      }
    }else{
      route = fileObject.descriptor
      target = route.replace(/\.coffee$/, '.html')
    }

    folder = target.replace(/\/[^/.]+\.[^/.]+$/, "")

    return {
      route: route,
      targetFile: target,
      folder: folder
    }
  },

  getComponent: function(fileObject){
    sandbox = {
      require: require,
      module: {
        exports: null
      }
    }

    fileObject.rawBody = CoffeeScript.compile(fileObject.rawBody)
    vm.runInNewContext(fileObject.rawBody, sandbox)

    return sandbox.module.exports
  },

  parseFile: function(fileObject, options){
    return new Promise(function(resolve, reject){
      process.bundleModules.push([fileObject.router.component.displayName, fileObject.rawBody])
      process.writeQueue.push(fileObject)

      resolve()
    })
  }
}
