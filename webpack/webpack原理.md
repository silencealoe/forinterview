## webpack 构建过程
### 第一步 entry-option 启动
* 读取配置文件 得到参数
在命令行输入webpack 后 操作系统会去调用 ./node_modules/.bin/webpack 这个 shell 脚本  这个脚本会去调用./node_modules/webpack/bin/webpack.js 追加输入的参数 如-p -w 
在webpack.js 这个文件中 webpack通过optimist 将读取用户配置的webpack.config.js 和shell脚本 传过来的参数 整和成 options对象传到 下一个流程控制对象   
在加载插件之前，webpack 将 webpack.config.js 中的各个配置项拷贝到 options 对象中，并加载用户配置在 webpack.config.js 的 plugins 。接着 optimist.argv 会被传入到 ./node_modules/webpack/bin/convert-argv.js 中，通过判断 argv 中参数的值决定是否去加载对应插件。options 作为最后返回结果，包含了之后构建阶段所需的重要信息。
### 第二步  run实例化
webpack对象开始初始化 初始化逻辑 在 lib/webpack.js 中
```javascript
function webpack(options) {
    var compiler = new Compiler()
    ...
    return compiler
}
```
webpack 的实际入口 是Compiler 中的run 方法 run一旦执行 就开始编译和构建流程 
将第一步得到的参数 初始化 compiler 对象 加载所有配置插件 执行compiler 的run 方法
开始执行编译
几个关键的webpack事件点：
* compile 开始编译
* make 从入口点分析模块 及其依赖的模块 创建模块对象
* build-module 构建模块
* after-compile 完成构建
* seal 封装构建结果
* emit 把各个chunk 输出到结果文件
* after-emit 完成输出
### 第三步  编译构建
从entry配置 找出所有入口文件
从入口文件出发 调用所有配置的loader对模块进行解析 再找出该模块的依赖模块 
递归本步骤 直到 所有依赖文件都经过本步骤的处理

webpack在build模块时 (`调用doBuild方法`)，要先调用相应的loader对resource进行加工，生成一段js代码后交给acorn解析生成AST.所以不管是css文件，还是jpg文件，还是html模版，
最终经过loader处理会变成一个module：一段js代码。


* 解析入口文件 获取AST
使用 @babel/parse  帮助分析内部语法 包含es6 返回 一个AST抽象语法树

* 找出依赖模块
@babel/traverse(遍历)方法维护这 AST 树的整体状态,我们这里使用它来帮我们找出依赖模块。
* AST 转换为code 
将 AST 语法树转换为浏览器可执行代码,我们这里使用@babel/core 和 @babel/preset-env

### 第四步 完成模块编译
经过上一步各个模块的编译 得到每个模块编译后的最终内容 以及他们之间的依赖关系
合并 ，抽取公共代码 加hash 
### 输出资源 
根据入口与模块之间的依赖关系 组装成一个个包含多个模块的chunk 再把每个chunk 转换成一个单独的文件加入到输出列表 这步是可以修改输出内容的最后机会
### 输出完成
在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。


## webpack 热更新原理
### webpack监听文件变化 
webpack 的watch模式下 文件系统中某一个文件发生变化 webpack可以监听到文件变化 根据配置文件 对模块重新编译打包 并将打包后的代码通过简单的js对象保存再内存中
### webpack-dev-server 和 webpack 之间接口交互
主要是 dev-server 的中间件 webpackdev-middleware 和 webpack 之间的交互， webpack-dev-middleware 调⽤ webpack 暴露的 API对代码变化进⾏监
控， 并且告诉 webpack， 将代码打包到内存中
### 
 