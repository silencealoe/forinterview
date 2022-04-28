## webpack作用
* 模块打包
* 编译兼容  各种loader  支持sass less 
* 能力扩展 
## 配置项
* mode  
* publicPath  
* entry 指定模块的入口 让源文件加入构建流程 被webpack控制
* output 配置如何输出最终代码
* resolve 配置webpack寻找模块规则
* plugin
* loader 
* devserver 实现本地http服务 端口 ip
* module 配置各种类型模块的处理规则和解析策略
## 常用loader
* style-loader 将样式模块导出的内容 用在<head>中注入<style>的方式 添加到dom中 
* css-loader 加载css文件 并解析 @import的css文件 将url处理成require请求 最终返回css代码
 sass-loader 加载并编译sass
 post-css-loader 自动生成浏览器兼容前缀 
 file-loader 把文件输出到文件夹中，在代码中通过相对路径引入url 可以配置文件名称等
 url-loader 文件很小的情况下 将文件以base64的形式注入到代码中，减少http请求
## 常用plugin
* clear-webpack-plugin 打包前清空目录
* copywebpackplugin 将单个目录或者文件赋值到构建目录
* minicssextractPlugin： 将css抽离 单独打包 支持按需加载
异步加载 不会重复编译 只适用于css

* hardSourcewebpackPlugin 为模块提供中间缓存
缓存存放路径 node-modules/.cache/hard-source
首次构建无太大变化，二次构建 时间减少约80%

* htmlwebpackplugin
简化html 生成, 文件hash改变, 动态引入css和js

## loader和plugin区别？
* loader 加载器 webpack将所有文件视为模块 webpack只识别js和json文件 如果想要将其他文件打包的话，就需要使用loader 所以loader的作用就是加载和解析 非js和json文件的能力
* plugin 插件 扩展webpack的功能
loader在webpack的rules中配置 作为模块的解析规则存在 
plugin 在plugins中单独配置

## 优化构建速度
 speed-measure-webpack-plugin 通过插件分析构建时间
 * 优化resolve配置
 - alias 简化模块的引用
 ```
 const path = require('path')
...
// 路径处理方法
function resolve(dir){
  return path.join(__dirname, dir);
}

 const config  = {
  ...
  resolve:{
    // 配置别名
    alias: {
      '~': resolve('src'),
      '@': resolve('src'),
      'components': resolve('src/components'),
    }
  }
};

 ```
 - extensions 省略文件后缀
 默认配置
 ```
 const config = {
  //...
  resolve: {
    extensions: ['.js', '.json', '.wasm'],
  },
};
 ```
 按照数组从左到右顺序解析模块
 注意：高频文件放到前面，手动配置后默认配置会失效
 保留默认配置 可使用... 代表
 ```
 const config = {
  //...
  resolve: {
    extensions: ['.ts', '...'], 
  },
};
 ```
 - modules 告诉webpack解析模块时应该搜索的目录
 ```javascript
 const path = require('path');

// 路径处理方法
function resolve(dir){
  return path.join(__dirname, dir);
}

const config = {
  //...
  resolve: {
     modules: [resolve('src'), 'node_modules'],
  },
};
 ```
 webpack 优先查找src下目录，减少依赖文件查找时间

 *  resolveloader  和 resolve配置相同 仅用于loader包解析 （自定义loader 需要配置）

 例如在loader中存放自定义loader
 ```
 const path = require('path');

// 路径处理方法
function resolve(dir){
  return path.join(__dirname, dir);
}

const config = {
  //...
  resolveLoader: {
    modules: ['node_modules',resolve('loader')]
  },
};
 ```

 * externals 配置从输出的bundle中排除依赖的方法  
 例如：  
 从cdn引入的jquery不需要打包 直接使用链接 
 ```javascript
 const config = {
  //...
  externals: {
    jquery: 'jQuery',
  },
};
```
可以用这样的方法来剥离不需要改动的一些依赖，大大节省打包构建的时间
* 缩小范围
在配置 loader 的时候，我们需要更精确的去指定 loader 的作用目录或者需要排除的目录
通过使用include和exclude
- include 符合条件的进行解析
- exclude 排除符合条件的模块， 不进行loader解析
```
const path = require('path');

// 路径处理方法
function resolve(dir){
  return path.join(__dirname, dir);
}

const config = {
  //...
  module: { 
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.js$/i,
        include: resolve('src'),
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      },
      // ...
    ]
  }
};

```
* noParse
- 不需要解析依赖的第三方大型类库等，可以通过这个字段进行配置，以提高构建速度
- 用 noParse 进行忽略的模块文件中不会解析 import、require 等语法
```
const config = {
  //...
  module: { 
    noParse: /jquery|lodash/,
    rules:[...]
  }

};
```
* IgnorePlugin
```
// 引入 webpack
const webpack = require('webpack')

const config = {
  ...
  plugins:[ // 配置插件
    ...
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ]  
};
```
的是将插件中的非中文语音排除掉，这样就可以大大节省打包的体积了
* thread-loader 多进程 
仅在耗时的loader上使用
配置在 thread-loader 之后的 loader 都会在一个单独的 worker 池（worker pool）中运行
```
const path = require('path');

// 路径处理方法
function resolve(dir){
  return path.join(__dirname, dir);
}

const config = {
  //...
  module: { 
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.js$/i,
        include: resolve('src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader', // 开启多进程打包
            options: {
              worker: 3,
            }
          },
          'babel-loader',
        ]
      },
      // ...
    ]
  }
};
```
* happypack 开启多进程打包
webpack5弃用
* 使用缓存
-  babel-loader 开启缓存
babel 在转译 js 过程中时间开销比价大，将 babel-loader 的执行结果缓存起来，重新打包的时候，直接读取缓存  
缓存位置： node_modules/.cache/babel-loader
```
const config = {
 module: { 
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.js$/i,
        include: resolve('src'),
        exclude: /node_modules/,
        use: [
          // ...
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true // 启用缓存
            }
          },
        ]
      },
      // ...
    ]
  }
}
```

- cache-loader
缓存一些性能开销比较大的 loader 的处理结果
缓存位置：node_modules/.cache/cache-loader
```
const config = {
 module: { 
    // ...
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i, //匹配所有的 sass/scss/css 文件
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'cache-loader', // 获取前面 loader 转换的结果
          'css-loader',
          'postcss-loader',
          'sass-loader', 
        ]
      }, 
      // ...
    ]
  }
}

```
- hard-source-webpack-plugin 
为模块提供了中间缓存，重复构建时间大约可以减少 80%，但是在 webpack5 中已经内置了模块缓存，不需要再使用此插件

## 优化构建结果
* 压缩css js
optimize-css-assets-webpack-plugin  
```
// ...
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// ...

const config = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      // 添加 css 压缩配置
      new OptimizeCssAssetsPlugin({}), 
      new TerserPlugin({})
    ]
  },
 // ...
}

// ...
```
* 压缩js
terser-webpack-plugin
* 提取共用代码
CommonsChunkPlugin 
* 清除无用css
purgecss-webpack-plugin
* tree-shaking
生产环境下默认自动开启
静态分析 使用es6模块化
* Scope Hoisting
Scope Hoisting 即作用域提升，原理是将多个模块放在同一个作用域下，并重命名防止命名冲突，通过这种方式可以减少函数声明和内存开销()。
webpack5 默认支持，在生产环境下默认开启
只支持 es6 代码
```
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```
## 优化运行时体验
运行时优化的核心就是提升首屏的加载速度，主要的方式就是
降低首屏加载文件体积，首屏不需要的文件进行预加载或者按需加载
* 入口点切割
- splitchunks
webpack 将根据以下条件自动拆分 chunks：

新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
当按需加载 chunks 时，并行请求的最大数量小于或等于 30
当加载初始化页面时，并发请求的最大数量小于或等于 30
- import()按需加载
- prefetch
浏览器空闲时进行资源拉取
```
// 按需加载
img.addEventListener('click', () => {
  import( /* webpackPrefetch: true */ './desc').then(({ default: element }) => {
    console.log(element)
    document.body.appendChild(element)
  })
})
```
- preload（预加载）
提前加载会用到的资源
```
import(/* webpackPreload: true */ 'ChartingLibrary');

```

## bundle chunk module 分别是什么？
* bundle 是webpack 打包出来的文件 未拆分
* chunk 是一个代码块 一个chunk由多个模块组合而成 用于代码的合并和分割
* module 开发中的单个模块 webpack 中 一切皆是模块 一个文件对应一个模块 webpack会从配置的entry入口 递归 找出所有依赖模块 

##  prerender-spa-plugin 预渲染？
适用于静态页面 有seo需求的页面
配置的路由 
原理：在webpack打包结束并生成文件后（after-emit hook），会启动一个server模拟网站的运行，用puppeteer（google官方的headless 无头浏览器）访问指定的页面route，得到相应的html结构，并将结果输出到指定目录，过程类似于爬虫。

参考： https://zhuanlan.zhihu.com/p/272037693

