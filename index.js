const http = require('http');
const fs = require('fs');
const handeleServer = (req, res) => {
  const url = req.url;
  if (url === '/') {
    res.write('<html>');
    res.write('<body>');
    res.write(
      '<form action="/user" method="POST"><input type="text" name="username"/><button type="submit">Submit</button></form>'
    );
    res.write('</body>');
    res.write('</html>');
    return res.end('hello');
  }
  if (url === '/user') {
    console.log('getting user');
    const body = [];
    req.on('data', (chunck) => {
      body.push(chunck);
    });
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody.split('=')[1]);
      fs.writeFileSync(parseBody.split('=')[1]);
    });
    res.statusCode = 302;
    res.setHeader('location', '/');
    res.end('getting user');
  }
};
const server = http.createServer(handeleServer);

server.listen(3000, () => {
  console.log('Server Running :)');
});
