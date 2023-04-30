module.exports = [
  function (req, res, next) {
    const patten =
    {
      response: {
        result: 'true',
        remark: 'success',
        code: res.httpcode || 200
      },
      data: res.body
    }
    res.status(res.httpcode || 200).json(patten)
  },

  function (error, req, res, next) {
    console.log(error)
    const e = new Error(error)
    // console.error(e)
    const patten =
    {
      response: {
        result: 'false',
        remark: e.message,
        code: res.httpcode || 500
      },
      error: {
        message: e.message
      }
    }

    res.status(200).json(patten)
    // res.status(res.httpcode || 500).json(patten)
  }
]
