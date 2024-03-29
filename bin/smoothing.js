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
 * 当在终端输入 smoothing --help 或者没有跟参数的话
 * 会输出提示------------------
 */
function initProgram () {
  // program
  //   .command('create <app-name>')
  //   .description('create a new project')

  program
    .version(pkg.version)
    .parse(process.argv);

  if (program.args.length < 1) return program.help();
}

function start() {

  initProgram()
  /**
   * 获取命令行参数
   */
  const templateName = program.args[0] // 命令行第一个参数 文件夹名字 template
  /**
   * 获取项目和模版的完整路径
  */
  const targetPath = path.join(process.cwd(), templateName) // 模版的路径  cwd是当前运行的脚本是在哪个路径下运行 tem

  if (exists.existsSync(targetPath)) {
    console.log(chalk.red('  # The same project name already exists in the current directory.'))
  } else {
    exists.mkdirSync(targetPath)
    run(templateName, targetPath)
  }
}

/**
 * 调用generate来构建项目
 */
function run(templateName, targetPath) {
  const spinner = ora({
    // 下载的时候给到更多的提示 作者信息等
    text: `${chalk.green('downloading template')}`,
  })
  spinner.start()
  download(`GGupzHH/Vue3-Vite3-TS-Template#y-cli-template`, targetPath, {}, err => {
    spinner.stop()
    if (err) return
    generate(templateName, targetPath, (err) => { 

      // 构建完成的回调函数
      console.log(`🎉  Successfully created project ${templateName}.`)
      console.log(`👉  Get started with the following commands:`)
      console.log(`  $ cd ./${templateName}`)
      
      if (err) console.log(err) // 如果构建失败就输出失败原因
    })
    // console.log(chalk.green(`模版下载完成 ${ targetPath }`))
  })
}

start();
