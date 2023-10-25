const express = require('express')
const app = express()
app.get('/', (req: any, res: any) => {
	res.send('Hello World!')
})

app.listen(7000, () => {
	console.log(`Example app listening on port 7000`)
})
