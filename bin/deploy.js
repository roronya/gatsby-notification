const fs = require("fs").promises
const fm = require("front-matter")
const axios = require("axios")

const API_URL = process.env.API_URL
const DEPLOY_BASE_URL = process.env.DEPLOY_BASE_URL
const DIR = "./src"

const main = async () => {
  const files = await fs.readdir(DIR)
  const paths = files
    .filter(file => /.*\.md$/.test(file))
    .map(file => `${DIR}/${file}`)
  const contents = await Promise.all(
    paths.map(async path => {
      const data = await fs.readFile(path, "utf8")
      return fm(data)
    })
  )
  const params = contents.map(content => ({
    title: content.attributes.title,
    published_at: content.attributes.date,
    url: `${DEPLOY_BASE_URL}/${content.attributes.path}`,
    enabled: content.attributes.enabled,
  }))
  console.log(params)
  const response = await axios.post(API_URL, { contents: params })
  console.log(response.data)
}

main()
  .then(console.log("done!"))
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
