const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  } 

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog
  } 

  return blogs.length === 0
    ? null
    : blogs.reduce(reducer)

}

module.exports = {
  dummy, totalLikes, favoriteBlog
}



