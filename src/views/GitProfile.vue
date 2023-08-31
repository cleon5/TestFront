<template>
  <div class="">
    <div>
      <h1 class="tittle-page">Git Profile</h1>
      <hr class="tittle-hr" />
    </div>
    <div class="search">
      <b-field>
        <b-input
          placeholder="Search..."
          type="search"
          icon="magnify"
          icon-clickable
          @icon-click="searchIconClick"
        >
        </b-input>
      </b-field>
    </div>

    <div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "GitProfile",
};
</script>

<style>
.search{
  width: 70%;
  margin: 0 auto;
}
</style>