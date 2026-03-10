# Project development documentation
Link: {{GOOGLE_DOCS_LINK}}

# Repository Branchs
production - Used to deploy in production environment<br>
staging - Used to develop and test in local and deploy staging environment

# Requeriments
Node: v16 <br> 

#### Active mode api of Wordpress 
Url: http://localhost:3001/wp-admin/options-permalink.php <br>
Enable option: Estrutura personalizada (/blog/%postname%/) <br>

#### Install plugins 
By default, the boilerplate lists the most used plugins for development, feel free to install, configure and use them if necessary.

## Run Wordpress in Docker
```
# Clean containers running (fish terminal)
sudo docker rm -f (sudo docker ps -aq)

# Run docker
sudo docker compose -f docker-compose.yml up

# Wait 5 seconds to run full permission on root folder
sudo chmod 777 -R .
```

## Run build to generate style.css and bundle.js
```
# Enter the folder
cd build

# Change node version
nvm use 16

# Install dependencies
npm install --legacy-peer-deps

# Run the build with live relaod
npm run watch:docker
```

#### Configure .env
Change the environment variables according to each project environment

#### Folder ./plugins
Somes plugins pro for developmet in builder or code programmatically

#### Folder ./build
Used to create a custom theme that goes in the wordpress themes folder and wpresskit 

#### How to code a new project
1. Search and change the name of every place that has <b>"wpresskit"</b> to the <b>new name</b>, for example <b>"apple"</b>
2. Turn off the build in docker and, if necessary, delete ./docker/mysql to run the configuration again with the new name in containers, variables and the theme

#### Access live reload
Url: http://localhost:12345

# PhpMyAdmin - Database Manager
Url: http://localhost:8080 <br>
Username: root <br>
Password: secret

# Wordpress 
Url: http://localhost:3001 <br>
Username: <br> 
Password: <br> 
Password Access Site Url: senha

# Staging
Url: https://staging.production.com.br<br>
DB Host: localhost<br> 
DB Name: <br>
DB Username: <br> 
DB Password: <br> 
Password Access Site Url: senha

# Production
Url: https://production.com.br<br>
DB Host: localhost<br> 
DB Name: <br>
DB Username: <br> 
DB Password: <br>

# Gmail - No Reploy and Analytics and Tag manager
Username: <br>
Password: 

# Ngrok
Url: http://localhost:4551 <br>

# Configure the repository secrets for deploy CI/CD
```
FTP_PRODUCTION_HOST: ftp.test.com.br
FTP_PRODUCTION_USERNAME: test
FTP_PRODUCTION_PASSWORD: test123
FTP_PRODUCTION_PROJECT_DIR: domains/hallan.com.br/public_html/
FTP_PRODUCTION_DEPLOY_ENV: INSERT ALL LINES FROM .env

FTP_STAGING_HOST: ftp.testhallan.com.br
FTP_STAGING_USERNAME: testhallan
FTP_STAGING_PASSWORD: testhallan123
FTP_STAGING_PROJECT_DIR: domains/hallan.com.br/public_html/
FTP_STAGING_DEPLOY_ENV: INSERT ALL LINES FROM .env
```

# Deploy CI/CD with Github CLI
```
# Run a pipeline on the main branch (Production)
gh workflow run main.yml --ref main

# View run pipelines:
gh run list --workflow=main.yml
```

# Migration URL WordPress

Para migrar URLs do WordPress (de produção para staging/local), execute os seguintes comandos SQL no banco de dados:

```sql
-- Substitua 'https://algumsiteparamigrarlinks.com.br' pela URL de origem
-- Substitua 'http://localhost:3001' pela URL de destino

UPDATE wp_posts SET guid = REPLACE(guid,'https://algumsiteparamigrarlinks.com.br','http://localhost:3001') WHERE guid LIKE '%https://algumsiteparamigrarlinks.com.br%';

UPDATE wp_posts SET post_content = REPLACE(post_content,'https://algumsiteparamigrarlinks.com.br','http://localhost:3001') WHERE post_content LIKE '%https://algumsiteparamigrarlinks.com.br%';

UPDATE wp_options SET option_value = REPLACE(option_value,'https://algumsiteparamigrarlinks.com.br','http://localhost:3001') WHERE option_value LIKE '%https://algumsiteparamigrarlinks.com.br%';

UPDATE wp_users SET user_url = REPLACE(user_url,'https://algumsiteparamigrarlinks.com.br','http://localhost:3001') WHERE user_url LIKE '%https://algumsiteparamigrarlinks.com.br%';
```

> **Nota:** O prefixo das tabelas pode variar (wp_ é o padrão). Ajuste conforme o prefixo do seu projeto.

# Duplicator

### To Install Using Duplicator
1. Place the files in the root directory of the domain on the server.
2. Append the installer name to the domain URL. Example:  
   `https://sitedomainproduction.com.br/18112024_sitedomainproduction_d93b86c7197b86e58019_20241118201454_installer.php`
3. Follow the installer steps and provide the database credentials.

### Required Knowledge for Development and Running the Project
- Docker  
- WordPress  
- MySQL  
- NPM / NVM

# Author
| [<img src="https://avatars2.githubusercontent.com/u/60573155?s=115&v=3"><br><sub>@HallanCosta</sub>](https://github.com/HallanCosta) |
| :---: |