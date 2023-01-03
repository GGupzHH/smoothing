const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const path = require('path')
const chalk = require('chalk')
const meta = require('./meta.js')
const ask = require('./ask.js')

Handlebars.registerHelper('if_eq', function(a, b, opts) {
  return a === b
    ? opts.fn(this)
    : opts.inverse(this)
})
Handlebars.registerHelper('configeach', function(items, opts) {
  let _tem = ''
  items.forEach(item => {
    _tem += `${ item }(`
  })
  for (let i = 0; i < items.length; i++) {
    _tem += ')'
  }
  return _tem
})

module.exports = function generate(name, tem, done) {
  const opts = meta
  // const metalsmith = Metalsmith(path.join(tem, 'template'))
  const metalsmith = Metalsmith(tem)
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    configs: []
  })

  metalsmith
    .use(askQuestions(opts.prompts))
    .use(renderTemplateFiles())

  metalsmith
    // 生成目标文件时候，是否清除原来的文件，默认true
    .clean(false)
    // 模板路径
    .source('.')
    // 目标路径
    .destination(path.join(process.cwd(), name))
    .build((err, files) => {
      done(err)
      if (typeof opts.complete === 'function') {
        const helpers = { chalk }
        opts.complete(data, helpers)
      } else {
        console.log('complete is not a function')
      }
    })
}

// 收集用户信息
function askQuestions(prompts) {
  return (fils, ms, done) => {
    console.log(60)
    ask(prompts, ms.metadata(), done)
  }
}

function renderTemplateFiles() {
  return (files, ms, done) => {
    const keys = Object.keys(files).filter(fileName => fileName.search(/^public|^src/gi) < 0)
    const metadate = ms.metadata()
    keys.forEach(key => {
      const str = files[key].contents.toString()
      // 处理文本，将文本处理成模板语言，等待后续将用户信息填入
      let t = Handlebars.compile(str)
      // 这一步就是讲用户输入的信息匹配文件内容并填充
      let html = t(metadate)
      // 将填充好的文本塞入
      files[key].contents = new Buffer.from(html)
    })
    done()
  }
}