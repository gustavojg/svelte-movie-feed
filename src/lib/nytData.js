import apiKey from "../../apiKey";

const getReviews = async (offset) => {
  const result = await fetch(
    `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${apiKey}&critics-pick=Y&order=by-publication-date&offset=${offset}`
  );
  const jsonResult = await result.json();
  if (jsonResult) {
    //const articleList = jsonResult.results;
    return jsonResult.results;
  } else {
    throw new Error(jsonResult);
  }
};
const getReviewsByWriter = (id) => {};
const getReviewById = (id) => {};

export { getReviews, getReviewsByWriter, getReviewById };
