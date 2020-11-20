# Gallery (pics-sharer)

![](https://img.shields.io/github/workflow/status/satont/gallery/Publish%20Docker/master?label=docker&style=for-the-badge)

---
# Description

Personally, i getting tired saving pictures to PC from my friends. So, i get simple idea, how i can store and share images from my friends/me.

#### How it works?

1. User send's image to setuped (by you) discord channel.
2. Bot creating new channel for that user (if not exists) and just copying image as embed, after that adds reactions for moderation.
3. Owner of guild uses reactions for `decline/accept/accept as category` that image.
4. Image get to be uploaded.
5. Now it in list on the site!

## Installation
#### Prerequirements

 - `Postgres` >= 11.5
 - `Node.js` >= 12

#### Installation process:
```shell
git clone https://github.com/Satont/gallery
cd gallery
npm install
npm run build
```

As next step you need to fill out `.env`. Example can be found in `.env.example`. So, you simply doing copy of that file and past your data.

#### Docker compose example:
```yml
version: "3.2"

services:
  gallery:
    image: satont/gallery
    restart: always
    env_file:
      - .env
    ports:
      - 3000:3000
```

Also do not forget fill `.env` file in the same directory where you store `docker-compose` file.

# Development

#### Prerequirements

 - `ESLint` installed in your IDE
 - `EditorConfig` installed in your IDE
 - `Postgres` >= 11.5
 - `Node.js` >= 12


 Simply, that's enough for starting development of project.
