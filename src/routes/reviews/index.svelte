<script context="module">
  import apiKey from "../../../apiKey";
  export async function preload({ page, session, query }) {
    const result = await this.fetch(
      `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${apiKey}&critics-pick=Y&order=by-publication-date`
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
    articleList = reviews();
  });
</script>

<svelte:head>
  <title>Reviews</title>
</svelte:head>

<main>
  <h1>New York Times Movie Reviews</h1>
  <button on:click={reviews} />
  {#await articleList}
    <p>...waiting</p>
  {:then results}
    <dl>
      {#each results as review}
        <dt>
          <h4>{review.display_title}</h4>
          {review.summary_short}
          <br />
          <a target="_blank" href={review.link.url}>
            {review.link.suggested_link_text}
          </a>
          <sub>by {review.byline}</sub>
          <br/>
          {review.headline}
          <br/>
          {review.opening_date}
          <br/>
          {review.publication_date}
          <br/>
          {review.date_updated}
          <br/>
          {review.mpaa_rating}
          <br/>
          {review.critics_pick}
          <hr />
        </dt>
      {/each}
    </dl>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

</main>
<noscript>
  {#await articleList then results}
    <dl>
      {#each results as review}
        <dt>
          <h4>{review.display_title}</h4>
          {review.summary_short}
          <br />
          <a target="_blank" href={review.link.url}>
            {review.link.suggested_link_text}
          </a>
          <hr />
        </dt>
      {/each}
    </dl>
  {/await}
</noscript>
