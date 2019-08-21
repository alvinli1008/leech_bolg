import marked from 'marked' // .md
// import hljs from 'highlight' // 高亮
import xss from 'xss' // 处理页面 xss攻击

// marked(markdownString [,options] [,callback])

// markdownString是你渲染的内容，必须是字符串。
// options是你渲染的设置——它是一个对象。当然，你用marked.setOptions也是不错的。
// callback是回调函数。I如果 options 参数没有定义，它就是第二个参数。

// 转化 md 语法为 html
export const translateMarkdown = (plainText, isGuardXss = false) => {
  return marked(isGuardXss ? xss(plainText) : plainText, {
    renderer: new marked.Renderer(),
    gfm: true, // 允许 Git Hub标准的markdown.  // 默认为true
    pedantic: false, // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。 // 默认为false
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签） // 默认为false
    tables: true, // 允许支持表格语法。该选项要求 gfm 为true。  // 默认为true
    breaks: true, // 允许回车换行。该选项要求 gfm 为true。 // 默认为false
    smartLists: true, // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉. // 默认为false
    smartypants: true, // 使用更为时髦的标点，比如在引用语法中加入破折号。  // 默认为false
    // highlight: function(code) {
    //   // 语法高亮
    //   return hljs.highlightAuto(code).value
    // }
  })
}

// 获取 url query 参数
export const decodeQuery = url => {
  let params ={}
  const paramsStr = url.replace(/\.*\?/, '')  // a=1&b=2&c=&d=xxx&
  paramsStr.split('&').forEach(v => {
    const d = v.split('=')
    if (d[1] && d[0]) params[d[0]] = d[1]
  })
  return params
}

// 计算 评论数
export const getCommentsCount = commentList => {
  let count = commentList.length
  commentList.forEach(item => {
    count += item.replies.length
  })
  return count
}

// 取数组中的随机数
export const random = arr => Math.floor(Math.random() * arr.length)

/**
 * 对数组进行分组
 * @param {Array} arr - 分组对象
 * @param {Function} f
 * @returns 数组分组后的新数组
 */
export const groupBy = (arr, f) => {
  const groups = {}
  arr.forEach(item => {
    const group = JSON.stringify(f(item))
    groups[group] = groups[group] || []
    groups[group].push(item)
  })
  return Object.keys(groups).map(group => groups[group])
}