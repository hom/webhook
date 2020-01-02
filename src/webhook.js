const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function webhook(req, res) {
  const { repository } = req.body;
  let webhook;
  try {
    webhook = await new Parse.Query('Hook').equalTo('name', repository.full_name).first();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'webhook update error',
    });
  }

  if (!webhook) {
    return res.status(200).json({
      message: `can not find webhook script of ${repository.full_name}`,
    });
  }
  const { script } = webhook;
  const { stdout, stderr } = await exec(script);
  if (stderr) {
    console.error(stderr);
    return res.status(501).json({
      message: `webhook of ${repository.full_name} execute error.`,
      error: stderr,
    });
  }
  return res.status(200).json({
    message: `webhook of ${repository.full_name} execute success.`,
    data: stdout,
  });
}

module.exports = webhook;
