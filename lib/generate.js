import Metalsmith from 'metalsmith'
import Handlebars from 'handlebars'
import path from 'path'
import chalk from 'chalk'
import meta from './meta.js'
import ask from './ask.js'
import filter from './filter.js'

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
export default function generate(name, tem, done) {
  const opts = meta
  const metalsmith = Metalsmith(path.join(tem, 'template'))
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    configs: []
  })
  console.log(data)

  metalsmith
    .use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(renderTemplateFiles())

  metalsmith
    // 生成目标文件时候，是否清除原来的文件，默认true
    .clean(false)
    // 模板路径
    .source('.')
    // 目标路径
    .destination(tem+ '/111')
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
    ask(prompts, ms.metadata(), done)
  }
}
function filterFiles(filters) {
  return (files, metalsmith, done) => {
    console.log(files, '所有文件的列表')
    console.log(filters, '是否需要的文件')
    console.log(metalsmith.metadata(), '根据用户输入判断是否删除对应配置文件')
    filter(files, filters, metalsmith.metadata(), done)
  }
}

function renderTemplateFiles() {
  return (files, ms, done) => {
    const keys = Object.keys(files)
    const metadate = ms.metadata()
    console.log('renderTemplateFiles------')
    console.log(keys)
    console.log(metadate)
    console.log('------renderTemplateFiles')
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