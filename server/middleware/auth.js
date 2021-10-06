// 登陆授权中间键

module.exports = (assert, jwt, AdminUser) => {
  return async (req, res, next) => {
    /**
     * 校验用户是否登陆
     * 
     * 前端 Authorization 大写 
     * 后端 authorization 小写
     */
    const token = String(req.headers.authorization || '').split(' ').pop()
    // assert(token, 401, '请提供 jwt token')
    assert(token, 401, '请先登陆')
    /**
     * verify(token: string, secretOrPublicKey: jwt.Secret, options: jwt.VerifyOptions & { complete: true; }): string | jwt.Jwt
     * 
     * 校验方法
     * 
     * decode 只是解密没有校验性
     */
    const { id } = jwt.verify(token, req.app.get('secret'))
    // assert(id, 401, '无效的 jwt token')
    assert(id, 401, '请先登陆')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登陆')
    await next()
  }
}