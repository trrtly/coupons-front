/**
 * @description 测试环境api地址
 */
export const apiDevelop =
  process.env.NODE_ENV === 'production'
    ? 'http://dev.yituoke.ac.com'
    : 'http://dev.yituoke.ac.com'
export const uploadApi =
  process.env.NODE_ENV === 'production'
    ? 'http://dev.yituoke.ac.cn'
    : 'http://dev.yituoke.ac.cn'

/**
 * @description 本地环境api地址
 */
export const apiLocalhost = 'http://dev.yituoke.ac.cn'

/**
 * @description token在Cookie中存储的天数，默认1天
 */
export const cookieExpires = 1



