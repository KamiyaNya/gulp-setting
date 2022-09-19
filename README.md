Для работы задачи deploy надо в корне сайта или в другом месте создать файл с названием ftp_setting.json или на ваше усмотрение (не забудьте поменять при подключении в файле ftp.js).
Структура файла ftp_setting.json:

```json
{
	"host": "youdomain.ru",
	"user": "user",
	"pass": "password",
	"parallel": 10
}
```
