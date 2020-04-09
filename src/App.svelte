<script>
  import { getReviews } from "./lib/nytData";
  const reviews = async () => {
    const resultados = await getReviews();
    return resultados;
  };
  const promise = reviews();
  export let title;
</script>

<main>
  <h1>{title}</h1>
  {#await promise}
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
          <hr />
        </dt>
      {/each}
    </dl>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}

</main>
