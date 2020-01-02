const util = require('util');
const { exec } = require('child_process');

async function webhook(req, res) {
  const { repository } = req.body;
  let result;
  try {
    result = await new Parse.Query('Hook').equalTo('name', repository.full_name).first();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'webhook update error',
    });
  }

  if (!result) {
    return res.status(200).json({
      message: `can not find webhook script of ${repository.full_name}`,
    });
  }

  const { script } = result.toJSON();
  // start execute webhook script
  exec(script, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  return res.status(200).json({
    message: `webhook of ${repository.full_name} is running.`,
  });
}

module.exports = webhook;
