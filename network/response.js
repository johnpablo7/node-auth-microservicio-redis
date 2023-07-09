const statusMessages = {
  200: "Done",
  201: "Created",
  400: "Invalid format",
  500: "Internal error",
};

exports.success = (req, res, message, status = 200) => {
  message = message || statusMessages[status];

  res.status(status).send({
    error: false,
    status: status,
    body: message,
  });
};

exports.error = (req, res, message, status = 500, details) => {
  message = message || statusMessages[status];
  console.error(`${new Date()}: A new error has occurred, detail: ${details}`);

  res.status(status).send({
    error: false,
    status: status,
    body: message,
  });
};
