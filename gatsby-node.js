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




const getTagQuestionsData = async (cache, id) => {
  const fromCache = await cache.get(`tagQuestions-${id}`)
  let questions

  if(fromCache) {
    ;({questions} = fromCache)
  } else {
    questions = await getData(`/tag/question/${id}/questions`)
    await cache.set(`tagQuestions-${id}`, {
      questions,
    })
  }
  return {
    questions
  }
}





const getTagsCount = async (cache, tags) => {
  let tagsCount = []
  tags.forEach(async (t) => {

    const fromCache = await cache.get(`tagCount-${t.tag_id}`)
    let tagCount
  
    if (fromCache) {
      ;({ tagCount } = fromCache)
    } else {
        tagCount = await getData(`/tag/question/${t.tag_id}/count`)
        console.log('count ' + tagCount)
        await cache.set(`tagCount-${t.tag_id}`, {
          tagCount
        })
    }
    tagsCount.push(tagCount)
  })
  return {
    tagsCount
  }
}



exports.createPages = async ({
  cache,
  actions: { createPage },
}) => {
  const questions = await getData("/question")
  const tags = await getData("/tag")


  for (const q in questions) {
    console.log(`${q} / ${questions.length}`)
    const { id, prompt, description } = questions[q]
    const {tags, options, suggestions, voteTable} = await getQuestionData(cache, id)

    const { tagsCount } = await getTagsCount(cache, tags)

    createPage({
      path: `/question/${id}/`,
      component: require.resolve("./src/templates/question.js"),
      context: {
        prompt,
        description,
        tags,
        tagsCount,
        options,
        suggestions,
        voteTable,
      },
    })
  }


  for (const t in tags) {
    const { id, name, description } = tags[t]
    console.log(`${t} / ${tags.length}, tag: ${id}`)
    const { questions } = await getTagQuestionsData(cache, id)  
    const { tagsCount } = await getTagsCount(cache,[{tag_id:id}])
    createPage({
      path: `/tag/${id}/`,
      component: require.resolve("./src/templates/tagPage.js"),
      context: {
        name,
        description,
        tagsCount,
        questions,
      },
    })
  }
}
