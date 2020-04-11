<script context="module">
  import apiKey from "../../../apiKey";
  import { getString } from "../../lib/urlFormat";
  export async function preload({ path, query, params }) {
    const result = await this.fetch(
      `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${apiKey}&query=${getString(
        params.slug[1]
      )}&reviewer=${getString(params.slug[0])}&order=by-publication-date`
    );
    const jsonResult = await result.json();
    if (jsonResult) {
      const articleList = jsonResult.results;
      return { articleList };
    } else {
      throw new Error(jsonResult);
    }
  }
</script>

<script>
  import { onMount } from "svelte";
  export let articleList;
  import { getReviews } from "../../lib/nytData";

  const reviews = async () => {
    const resultados = await getReviews();
    articleList = resultados;
  };
  onMount(() => {
    //articleList = reviews();
  });
</script>

<svelte:head>
  <title>Review</title>
</svelte:head>
<div class="bd-main-container container">
  <header class="bd-header">
    <div class="bd-header-titles">
      <h1 class="title">New York Times Movie Reviews</h1>
    </div>
  </header>
  {#await articleList}
    <p>...waiting</p>
  {:then results}
    {#each results as review}
      <div class="container">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{review.display_title}</p>
          </header>
          <div class="card-content">
            <p class="title">{review.summary_short}</p>
            <p class="subtitle">{review.byline}</p>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              Opening:
              <time datetime={review.opening_date}>{review.opening_date}</time>
            </p>
            <p class="card-footer-item">
              Publication:
              <time datetime={review.publication_date}>
                {review.publication_date}
              </time>
            </p>
            <p class="card-footer-item">
              Updated:
              <time datetime={review.date_updated}>{review.date_updated}</time>
            </p>
            <p class="card-footer-item">
              <span>
                <a href={review.link.url} target="_blank">
                  {review.link.suggested_link_text}
                </a>
              </span>
            </p>
          </footer>
        </div>
      </div>
      <hr style="margin: 0 0 3rem;" />
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
