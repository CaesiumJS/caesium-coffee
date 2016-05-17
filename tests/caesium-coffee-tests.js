expect = require('chai').expect

Mod = require('../')

describe('Caesium Coffee', function(){
  fileObject = {
    descriptor: "example.coffee",
    frontMatter: {}
  }

  it('should create paths', function(){
    paths = Mod.createRoute(fileObject)

    expect(paths.path).to.equal('/example')
    expect(paths.targetFile).to.equal('example/index.html')
    expect(paths.folder).to.equal('example')
  })
})
