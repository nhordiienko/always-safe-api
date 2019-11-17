const express = require('express');
const cors = require('cors');
//app.get()
//app.post()
//app.put()
//app.delete()

const port = process.env.PORT || 5000;
const admins = [
  {
    name: "admin",
    pass: "admin123",
    info: 'i love you',
  },
];

express()
.use(cors())
.post('/adminLog/', function(req, res){
  const name = req.body.name;
  const pass = req.body.pass;

  if (!name || !name.match(/[a-zA-Z]/)) {
    const result = {
      status: false,
      error: 'Name must have at least one latin character',
    }
    res.status(400).send(result);
    return;
  }
  if (!name.match(/^[a-zA-Z0-9]{4,20}$/)) {
    const result = {
      status: false,
      error: 'Name must have at least 4 characters and max 20 characters of latin alphabet or digits',
    }
    res.status(400).send(result);
    return;
  }

  if (!pass || !pass.match(/^[a-zA-Z0-9]{8,30}$/)) {
    const result = {
      status: false,
      error: 'Password must have at least 8 characters and max 30 characters of latin alphabet or digits'
    }
    res.status(400).send(result);
    return;
  }

  const answer = admins.filter((el) => {
    return el.name == name && el.pass == pass;
  })

  if (answer.length > 0) {
    const result = {
      status: true,
      info: answer[0].info,
    }
    res.status(200).send(result);
  } else {
    const result = {
      status: false,
      error: 'No such admin found',
    }
    res.status(404).send(result);
  }
})

.listen(port, () => console.log(`listening on port ${port}...`));
