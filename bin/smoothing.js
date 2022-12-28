#!/usr/bin/env node
"use strict";

const path = require('path')
const chalk = require('chalk')
const { program } = require('commander')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const exists = require('fs')
const generate = require('../lib/generate.js')
const ora = require('ora')
const pkg = require('../package.json')

const { readFile } = require('fs/promises')

/**
 * 注册一个help的命令
 * 当在终端输入 dg --help 或者没有跟参数的话
 * 会输出提示------------------
 */
function init () {
  // ({ clear = true }) => {
  //   unhandled();
    // welcome({
    //   title: `smoothing`,
    //   tagLine: `by Brandon Zhang`,
    //   description: pkg.description,
    //   version: pkg.version,
    //   bgColor: '#36BB09',
    //   color: '#000000',
    //   bold: true,
    //   // clear
    // });
  // }

  program
    .version(pkg.version)
    .on('--help', 
      () => { 
        {
          console.log()
          console.log('Examples:')
          console.log(chalk.gray('# create a new project with an template'))
        } 
      }
    )
    .parse(process.argv);


  if (program.args.length < 1) return program.help()
}

function start() {

  init()
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

  if (exists.existsSync(targetPath)) {
    console.log(chalk.red('  # The same project name already exists in the current directory.'))
  } else {
    exists.mkdirSync(targetPath)
    run(templateName, targetPath)
  }
}

/**
 * run函数则是用来调用generate来构建项目
 */
function run(templateName, targetPath) {
  const spinner = ora({
    text: `${chalk.green('downloading template')}`,
  })
  spinner.start()
  // TODO 这里可以先获取用户输入，然后下载文件的时候过滤去填充
  download(`GGupzHH/Vue3-Vite3-TS-Template#y-cli-template`, targetPath, {}, err => {
    spinner.stop()
    if (err) return
    generate(templateName, targetPath, (err) => { // 构建完成的回调函数
      console.log('构建完成')
      console.log(`🎉  Successfully created project ${templateName}.`)
      console.log(`👉  Get started with the following commands:`)
      console.log(`  $ cd ${templateName}`)
      // console.log(`  $ yarn serve`)
      
      if (err) console.log(err) // 如果构建失败就输出失败原因
    })
    // console.log(chalk.green(`模版下载完成 ${ targetPath }`))
  })
}

// console.log(process.cwd())
start()
// init()