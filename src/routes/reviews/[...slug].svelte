<script context="module">
  import apiKey from "../../../apiKey";
  import { getString, getUrl } from "../../lib/urlFormat";
  export async function preload({ path, query, params }) {
    const result = await this.fetch(
      `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${apiKey}&critics-pick=Y&query=${getString(
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
            <p class="card-header-title">
              <a href={review.link.url} target="_blank">
                {review.display_title}
              </a>
            </p>
          </header>
          <div class="card-content">
            <p class="title">{review.summary_short}</p>
            <p class="subtitle">
              <a href={`/reviews/${getUrl(review.byline)}/`}>{review.byline}</a>
            </p>
          </div>
          <footer class="card-footer">
            <nav class="level card-footer-item">
              <div class="level-item has-text-centered is-hidden-mobile">
                <div>
                  <p class="heading">Opening</p>
                  <p class="subtitle">
                    <time datetime={review.opening_date}>
                      {review.opening_date}
                    </time>
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Publication</p>
                  <p class="subtitle">
                    <time datetime={review.publication_date}>
                      {review.publication_date}
                    </time>
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Updated</p>
                  <p class="subtitle">
                    <time datetime={review.date_updated}>
                      {review.date_updated}
                    </time>
                  </p>
                </div>
              </div>
            </nav>
            <p class="card-footer-item is-hidden-mobile">
              <span>
                <a href={review.link.url} target="_blank">
                  {review.link.suggested_link_text}
                </a>
              </span>
            </p>
          </footer>
          <footer class="card-footer is-hidden-desktop">
            <a
              href={review.link.url}
              target="_blank"
              class="button is-black is-medium is-fullwidth">
              {`Read the complete Review`}
            </a>
          </footer>
        </div>
      </div>
      <hr style="margin: 0 0 3rem;" />
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</div>
