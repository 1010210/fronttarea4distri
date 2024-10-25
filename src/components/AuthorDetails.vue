
<template>
  <div class="row">
    <div class="eleven columns" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="authorInput">Author</label>
            <input class="u-full-width" type="text" v-model="author.author">
          </div>
          <div class="six columns">
            <label for="nationalityInput">Nationality</label>
            <input class="u-full-width" type="text" v-model="author.nationality">
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="birthYearInput">Birth Year</label>
            <input class="u-full-width" type="number" v-model="author.birth_year">
          </div>
          <div class="six columns">
            <label for="fieldsInput">Fields</label>
            <input class="u-full-width" type="text" v-model="author.fields">
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/author">Back</router-link>
          <a v-if="edit" class="button button-primary" style="float: right" @click="updateAuthor(author._id)">Update</a>
          <a v-if="create" class="button button-primary" style="float: right" @click="createAuthor()">Create</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: "AuthorDetails",
  props: ['create', 'edit'],
  data() {
    return {
      title: "Author Data",
      author: {
        author: '',
        nationality: '',
        birth_year: 0,
        fields: '',
      },
    };
  },
  mounted() {
    const route = useRoute();
    if (route.params.id != null) {
      this.findAuthor(route.params.id);
    }
  },
  methods: {
    findAuthor(id) {
      fetch(this.url + '/.netlify/functions/authorFind/' + id, {
        headers: { 'Accept': 'application/json' },
      })
        .then((response) => response.json())
        .then((items) => {
          this.author = items[0];
        });
    },
    updateAuthor(id) {
      fetch(this.url + '/.netlify/functions/authorUpdate/' + id, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(this.author),
      })
        .then((data) => {
          this.$router.push('/authors');
        });
    },
    createAuthor() {
      fetch(this.url + '/.netlify/functions/authorInsert', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(this.author),
      })
        .then((data) => {
          this.$router.push('/authors');
        });
    },
  },
};
</script>
