const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter Username</title></head>');
    res.write('<body><h1>Hello, enter your username!</h1></body>');
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">send</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Users</title></head>');
    res.write('<body><ul><li>User1</li><li>User2</li><li>User3</li></ul></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split('=')[1]);
    })
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
}

module.exports = requestHandler;
