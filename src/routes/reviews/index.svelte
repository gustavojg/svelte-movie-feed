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
  import { onMount, afterUpdate } from "svelte";
  import Progress from "../../components/Progress.svelte";
  export let articleList;
  import { getReviews } from "../../lib/nytData";
  import { getUrl } from "../../lib/urlFormat";

  const loadNewReviews = () => {};
  afterUpdate(observer => {
    //trigered after update page
  });
  export const allYears = () => {
    let years = [];
    for (let i = 1920; i < 2021; i++) {
      years.push(i.toString());
    }
    return years;
  };
  onMount(() => {
    let offset = 20;
    const endElement = document.querySelector("#endPage");
    const rootMargin = `0px 0px 300px 0px`;
    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        async e => {
          if (e[0].isIntersecting === true) {
            const resultados = await getReviews({ offset });
            articleList = articleList.concat(resultados);
            offset += 20;
          }
        },
        { rootMargin }
      );
      observer.observe(endElement);
      return () => observer.unobserve(endElement);
    }
    const handler = () => {
      const bcr = endElement.getBoundingClientRect();
      intersecting =
        bcr.bottom + bottom > 0 &&
        bcr.right + right > 0 &&
        bcr.top - top < window.innerHeight &&
        bcr.left - left < window.innerWidth;

      if (intersecting && once) {
        window.removeEventListener("scroll", handler);
      }
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  });
</script>

<svelte:head>
  <title>Reviews</title>
</svelte:head>
<div class="bd-main-container container">
  <header class="bd-header is-flex">
    <div class="bd-header-titles">
      <h1 class="title is-full">New York Times Movie Reviews</h1>
      <div class="subtitle is-full">
        <Progress yearList={allYears()} />
      </div>
    </div>

  </header>

  <div id="reviewsList">
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
                <a href={`/reviews/${getUrl(review.byline)}/`}>
                  {review.byline}
                </a>
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
</div>
<div id="endPage" />
