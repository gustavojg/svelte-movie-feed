import apiKey from "../../apiKey";

const getReviews = async (params) => {
  const query = createQueryString(params);
  const result = await fetch(
    `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${apiKey}&${query}`
  );
  const jsonResult = await result.json();
  if (jsonResult) {
    //const articleList = jsonResult.results;
    return jsonResult.results;
  } else {
    throw new Error(jsonResult);
  }
};
const createQueryString = (params) => {
  let queryString = [];
  params.query && queryString.push(`query=${params.query}`);
  params.offset && queryString.push(`offset=${params.offset}`);
  params.reviewer && queryString.push(`reviewer=${params.reviewer}`);
  params["critics-pick"]
    ? queryString.push(`reviewer=${params["critics-pick"]}`)
    : queryString.push("critics-pick=Y");
  params.order
    ? queryString.push(`order=${params.order}`)
    : queryString.push("order=by-publication-date");
  return queryString.join("&");
};
const getReviewsByWriter = (id) => {};
const getReviewById = (id) => {};

export { getReviews, getReviewsByWriter, getReviewById, createQueryString };
