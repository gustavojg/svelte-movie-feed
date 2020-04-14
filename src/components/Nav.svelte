<script>
  export let segment;
</script>

<style>

</style>

<nav id="navbar" class="bd-navbar navbar has-shadow is-spaced">
  <div class="container">
    <div class="navbar-brand">
      <a
        href="https://developer.nytimes.com"
        style="display:flex;align-items:center"
        target="_blank">
        <img
          src="https://developer.nytimes.com/files/poweredby_nytimes_30a.png?v=1568441069148"
          alt="Using New York Times APS with sapper and svelt"
          width="30"
          height="30" />
      </a>

      <div
        id="navbarBurger"
        class="navbar-burger burger"
        data-target="navMenuExpo">
        <span />
        <span />
        <span />
      </div>
    </div>

    <div id="navMenuExpo" class="navbar-menu">
      <div class="navbar-start">
        <a
          aria-current={segment === 'reviews' ? 'page' : undefined}
          href="reviews"
          class="navbar-item bd-navbar-item-documentation ">
          <span class="is-hidden-touch is-hidden-widescreen">Reviews</span>
          <span class="is-hidden-desktop-only">Movie Reviews</span>
        </a>
        <a
          class="navbar-item bd-navbar-item-videos "
          aria-current={segment === 'about' ? 'page' : undefined}
          href="about">
          <span>About</span>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped is-grouped-multiline">
            <p class="control">
              <a
                target="_blank"
                class="button is-primary"
                style="height: 2.25em; padding: calc(.375em - 1px) .75em;"
                href="https://github.com/gustavojg/svelte-movie-feed">
                <strong>Download</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
