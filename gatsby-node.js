const axios = require('axios');

const getData = async path => {
  const response = await axios.get(`https://opinionpedia.net/api${path}`)
  return response.data
}

const getQuestionData = async id => {
  const tags = await getData(`/tag/question/${id}`)
  const options = await getData(`/option/question/${id}`)
  const suggestions = await getData(`/question/${id}/suggestions`)
  const voteTable = await getData(`/question/${id}/vote_table`)
  
  return {
    tags,
    options,
    suggestions,
    voteTable
  }
}

exports.createPages = async ({ actions: { createPage } }) => {
  const questionsFull = await getData('/question')
  
  //temp fix
  const questions = questionsFull.slice(0, 10)
  
  for(const q in questions){
    console.log(`${q} / ${questions.length}`)
    const { id, prompt, description } = questions[q]
    const { tags, options, suggestions, voteTable } = await getQuestionData(id)
    
    
    
    createPage({
      path: `/question/${id}/`,
      component: require.resolve("./src/templates/question.js"),
      context: {
        prompt,
        description,
        tags,
        options,
        suggestions,
        voteTable
      },
    })
  }
}