## Fastify REST API


* "@fastify/auth"
* "@fastify/autoload"
* "@fastify/compress"
* "@fastify/cors"
* "fastify-guard"
* "@fastify/helmet"
* "@fastify/jwt"
* "fastify-knexjs"
* "@fastify/multipart"
* "fastify-nodemailer"
* "@fastify/rate-limit"
* "fastify-socket.io"
* "@fastify/static"

### Install and Run 

```bash
npm install
```

**knex (postgresql)**

DB migration
```bash
npm run migrate
```

**API**
```bash
npm run dev
```

**Rotas**

https://httpie.io/docs#installation

```bash
http post http://localhost:3000/users name=Nome password=Senha role=Função
```
```bash
http get http://localhost:3000/users
```

**Auth/JWT**

```bash
http post http://localhost:3000/auth name=Nome password=Senha
```

**Guard**

```bash
http delete http://localhost:3000/users/1/delete x-access-token:token
```

**Multipart/Upload**

```bash
http -f http://localhost:3000/upload @~/avatar.jpg
```

**Email**

Configure nodemailer in src/plugins/nodemailer.js
```bash
http post http://localhost:3000/email to=email@email.com subject=Assunto text=Mensagem
```

**Socket.io**

```bash
npm install http-server
```
```bash
http-server .
```
```bash
http post http://localhost:3000/socket message="Send Message"
```
