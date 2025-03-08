export default defineEventHandler(async (event) => {
  // 从请求中获取密码参数
  const query = getQuery(event);
  const providedPassword = query.password || '';
  
  // 获取环境变量中的密码
  const weixinPassword = process.env.WEIXIN_PWD || '';
  
  // 对比密码是否相同
  const isAuthenticated = providedPassword === weixinPassword;
  
  // 返回验证结果
  return isAuthenticated;
})
