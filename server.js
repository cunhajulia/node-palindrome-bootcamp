const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet') //yassifies the 404 error 

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') { //path - localhost8000 (or whatever other port #, for example)
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  
  else if (page == '/palindrome') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const word = params["word"].toLowerCase() //building api url with the [] 
    const database = {
      check: word === word.split("").reverse().join("")
    }
    
    res.end(JSON.stringify(database)); //this is what'll turn my database object into data (JSON)
  }

  else if (page == '/css/style.css'){ //if it is, it will read file and send back to the browser 
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(5000);
