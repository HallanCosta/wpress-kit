UPDATE wp_posts SET guid = REPLACE(guid,'http://localhost:3001','GROK_URL') WHERE guid LIKE '%http://localhost:3001%';
UPDATE wp_posts SET post_content = REPLACE(post_content,'http://localhost:3001','GROK_URL') WHERE post_content LIKE '%http://localhost:3001%';
UPDATE wp_options SET option_value = REPLACE(option_value,'http://localhost:3001','GROK_URL') WHERE option_value LIKE '%http://localhost:3001%';
UPDATE wp_users SET user_url = REPLACE(user_url,'http://localhost:3001','GROK_URL') WHERE user_url LIKE '%http://localhost:3001%';