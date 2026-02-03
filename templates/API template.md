endpoint url: `/api/1/<url>/`

# List
`GET https://www.irk.ru/api/1/<url>/`
Ответ:

```
{
	"next": "https://www.irk.ru/api/1/news/?page=2",
	"previous": null,
	"results": [
	]
}
```

# Get
`GET https://www.irk.ru/api/1/<url>/<id>/`

Ответ:
```
{
}
```