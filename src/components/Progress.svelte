<script>
  export let yearList = [];
</script>

<ul class="steps has-gaps is-thin has-content-centered">
  {#each yearList as year}
    {#if year.charAt(3) === '0'}
      <li class="steps-segment">
        <span class="steps-marker" />
        <div class="steps-content">
          <p class="heading">{year}</p>
        </div>
      </li>
    {:else}
      <li class="steps-segment">
        <a href={`reviews/year/${year}`} title={year} alt={year} data-tooltip={year}>·</a>
      </li>
    {/if}
  {/each}
</ul>
