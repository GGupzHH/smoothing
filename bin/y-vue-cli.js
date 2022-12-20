import { program } from 'commander'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import exists from 'fs'
import generate from '../lib/generate.js'
import download from 'download-git-repo'
import ora from 'ora'

import { readFile } from 'fs/promises'

/**
 * 注册一个help的命令
 * 当在终端输入 dg --help 或者没有跟参数的话
 * 会输出提示
 */
function initHelp () {
  program.on('--help', () => { {
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # create a new project with an template'))
    console.log('    $ node bin/y-vue-cli.js dgtemplate my-project')
  } })

  program.parse(process.argv)
  if (program.args.length < 1) return program.help()
}

initHelp()

/**
 * 获取命令行参数
 */
const templateName = program.args[0] // 命令行第一个参数 文件夹名字 template
console.log(program.args, '-----')
/**
 * 获取项目和模版的完整路径
*/
const targetPath = path.join(process.cwd(), templateName) // 模版的路径  cwd是当前运行的脚本是在哪个路径下运行 tem
console.log(targetPath)

// if (exists.existsSync(targetPath)) {
//   console.log(chalk.red('  # The same project name already exists in the current directory.'))
// } else {
  run()
// }

/**
 * run函数则是用来调用generate来构建项目
 */
function run() {
  const spinner = ora({
    text: `${chalk.green('downloading template')}`,
  })
  // spinner.start()
  // TODO 这里可以先获取用户输入，然后下载文件的时候过滤去填充
  generate(templateName, targetPath, (err) => { // 构建完成的回调函数
    console.log('构建完成')
    if (err) console.log(err) // 如果构建失败就输出失败原因
  })
  // download(`tccsg/next-template`, targetPath, {}, err => {
  //   spinner.stop()
  //   if (err) return
  //   console.log(chalk.green(`模版下载完成 ${ targetPath }`))
  // })
}