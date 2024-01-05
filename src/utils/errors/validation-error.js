const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
  constructor(error) {
    super();
    let explanation = [];
    error.errors.forEach((element) => {
      explanation.push(element.message);
    });
    this.message = "Not able to validate the data sent in request";
    this.explanation = explanation;
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.explanation = explanation;
  }
}

module.exports = ValidationError;
