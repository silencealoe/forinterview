## DNS解析IP地址过程
* 首先查询浏览器缓存 缓存中有一张 域名与IP对应的表
* 若未找到 则查找操作系统的DNS  (host文件)
* 将域名发至本地服务器查找 本地服务器查找自己的缓存
（本地服务器和主机之间时递归查询）
* 本地服务器向上级域名服务器查询
（本地服务器和其他域名服务器之间是 迭代查询 防止根域名服务器压力过大）
从根域名.com开始查找 直到查找到权威服务器 www.baidu.com 获取到IP地址

* 本地域名服务器 查找到之后 将IP 返回给 主机  同时自己也缓存
* 主机操作系统将IP给浏览器 同时自己也缓存
* 浏览器得到IP 同时缓存

## 域名服务器
* 根域名服务器： 管理顶级域名服务器 返回 .com .cn .net等顶级域名
* 顶级域名服务器： 管理各自下面的权威域名服务器 apple.com 返回权威域名服务器的ip地址
* 权威域名服务器： 管理各自域名下的主机IP 返回 www.apple.com的ip地址

查询规则： 从根域名 -> 顶级域名 -> 权威域名 依次查找

## 域名缓存
* 本地域名服务器 缓存
各大运营商和各个公司 都有自己的dns  一般部署在距离用户较近的地方 可以缓存之前的查询结果 若有记录 直接返回对应的ip 无需向根域名服务器发起查询
* 本地计算机缓存
- 浏览器缓存： 各种浏览器都有一个固定的dns缓存时间 chrome是一分钟
- 操作系统缓存： etc /host文件 （win）