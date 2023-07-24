const path = require('path')
const { installDependencies } = require('./index.js')

/***
 * 要交互的问题都放在 prompts中 
 * when是当什么情况下 用来判断是否 显示这个问题
 * type是提问的类型
 * message就是要显示的问题
 */
module.exports = {
  prompts: {
    name: {
      when: 'ismeta',
      type: 'string',
      message: '项目名称:'
    },
    description: {
      when: 'ismeta',
      type: 'string',
      message: '项目介绍:'
    },
    repository: {
      when: 'ismeta',
      type: 'string',
      message: '仓库地址:'
    },
    // author: {
    //   when: 'ismeta',
    //   type: 'string',
    //   message: '项目作者:'
    // },
    // withCss: {
    //   when: 'ismeta',
    //   type: 'confirm',
    //   message: '是否安装css模块'
    // },
    pkgCli: {
      when: 'ismeta',
      type: 'list',
      message: '选择使用`npm`、`yarn`、`pnpm`构建依赖',
      choices: [
        {
          name: 'npm',
          value: 'npm',
          short: 'npm'
        },
        {
          name: 'yarn',
          value: 'yarn',
          short: 'yarn'
        },
        {
          name: 'pnpm',
          value: 'pnpm',
          short: 'pnpm'
        }
      ]
    },
    // withTypescript: {
    //   when: 'ismeta',
    //   type: 'confirm',
    //   message: '是否使用typescript'
    // },
    // antd: {
    //   when: 'ismeta',
    //   type: 'confirm',
    //   message: '是否使用ant-design'
    // },
    // store: {
    //   when: 'useStore',
    //   type: 'list',
    //   message: '选择安装redux或者mobx（目前仅支持redux来管理状态,mobx将在后面更新）',
    //   choices: [
    //     {
    //       name: '不使用',
    //       value: false,
    //       short: 'no'
    //     },
    //     {
    //       name: 'redux',
    //       value: 'redux',
    //       short: 'redux'
    //     },
    //     {
    //       name: 'mobx',
    //       value: 'mobx',
    //       short: 'mobx'
    //     }
    //   ]
    // },
    // server: {
    //   when: 'ismeta',
    //   type: 'confirm',
    //   message: '是否要自定义端口'
    // },
    autoInstall: {
      when: 'ismeta',
      type: 'confirm',
      message: '是否安装依赖',
    }
  },
  filters: {
    '.babelrc': 'withTypescript',
    'tsconfig.json': 'withTypescript',
    'server.js': 'server',
    'store.js': "store",
    'pages/_app.js': 'store',
    'next.config.js': 'configs.length > 0',
    'lib/with-redux-store.js': 'store'
  },
  complete: function(data, { chalk }) {
    /**
     * 用于判断是否执行自动安装依赖
     */
    const green = chalk.green // 取绿色
    const cwd = path.join(process.cwd(), data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.pkgCli, green) // 这里使用npm安装
        .then(() => {
          console.log('依赖安装完成')
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      // printMessage(data, chalk)
    }
  }
}