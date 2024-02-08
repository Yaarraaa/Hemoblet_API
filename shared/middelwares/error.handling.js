const { ApiError } = require('../utils/APIError')

const notFound = (req, res, next) => {
   return res.status(403).json({ message: `not found ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
   if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
         message: err.message,
         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
   } else {
    //   return res.status(500).json({
    //      msg: 'Something went wrong, please try again',
    //   });
      console.log(err);
      return;
   }
};

module.exports = {
    notFound,
    errorHandler
}
