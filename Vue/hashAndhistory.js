/**
 * 
 * 单页面应用中的hash和history
 * hash  都支持
 * 虽然出现在url中，但是不会被包含中http请求中，改变hash不会重新加载页面
 * 
 * history  低端浏览器不支持
 * 利用的html5 history Api pushState和replaceState
 * 用户直接在地址栏输入或者刷新会向后端请求，出现404问题
*/