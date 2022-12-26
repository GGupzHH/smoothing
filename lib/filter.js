const match = require('minimatch')

module.exports = (files, filters, data, done) => {
  if (!filters) {
    return done()
  }
  const fileNames = Object.keys(files)
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if (match(file, glob, { dot: true })) {
        console.log("----filter")
        console.log(glob)
        const condition = filters[glob]
        console.log(condition)
        data[condition]
        // if (!evaluate(condition, data)) {这地方好像没用
        // 这里判断用户需要哪些文件不需要哪些文件，将不需要的文件从文件列表删除
        if (data[condition] === false) {
          console.log(file)
          delete files[file]
        }
        console.log("filter----")
      }
    })
  })
  done()
}
