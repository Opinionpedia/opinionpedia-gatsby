const axios = require("axios")

const getData = async path => {
  const response = await axios.get(`https://opinionpedia.net/api${path}`)
  return response.data
}

const getQuestionData = async (cache, id) => {
  const fromCache = await cache.get(`question-${id}`)
  let tags, options, suggestions, voteTable

  if (fromCache) {
    ;({ tags, options, suggestions, voteTable } = fromCache)
  } else {
    tags = await getData(`/tag/question/${id}/tags`)
    options = await getData(`/option/question/${id}`)
    suggestions = await getData(`/question/${id}/suggestions`)
    voteTable = await getData(`/question/${id}/vote_table`)

    await cache.set(`question-${id}`, {
      tags,
      options,
      suggestions,
      voteTable,
    })
  }
  return {
    tags,
    options,
    suggestions,
    voteTable,
  }
}

exports.createPages = async ({
  cache,
  actions: { createPage },
}) => {
  const questions = await getData("/question")
  
  for (const q in questions) {
    console.log(`${q} / ${questions.length}`)
    const { id, prompt, description } = questions[q]
    const { tags, options, suggestions, voteTable } = await getQuestionData(cache, id)

    createPage({
      path: `/question/${id}/`,
      component: require.resolve("./src/templates/question.js"),
      context: {
        prompt,
        description,
        tags,
        options,
        suggestions,
        voteTable,
      },
    })
  }
}
