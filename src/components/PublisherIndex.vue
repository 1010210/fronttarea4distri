<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Publishers</th>
            <th>Country</th>
            <th>Founded</th>
            <th>Gender</th>
            <th>Books</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="publisher in publishers" :key="publisher._id">
            <td>{{ publisher._id }}</td>
            <td>{{ publisher.publisher }}</td>
            <td>{{ publisher.country }}</td>
            <td>{{ publisher.founded }}</td>
            <td>{{ publisher.genere }}</td>
            <td>{{ formatBooks(publisher.books) }}</td>
            <td>
              <router-link class="button" :to="'/publisher/show/' + publisher._id">Show</router-link>
              &nbsp;
              <router-link class="button" :to="'/publisher/edit/' + publisher._id">Edit</router-link>
              &nbsp;
              <a class="button" @click="deletePublisher(publisher._id)">Erase</a>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="button button-primary" to="/publisher/create">New</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publisher Index",
  data() {
    return {
      title: "Publisher List",
      publishers: [],
    };
  },
  mounted() {
    this.allPublishers();
  },
  methods: {
    allPublishers() {
      fetch(this.url + "/.netlify/functions/publisherFindAll", {
        headers: { Accept: "application/json" },
      })
        .then((response) => response.json())
        .then((items) => {
          this.publishers = items;
        });
    },
    deletePublisher(id) {
      fetch(this.url + "/.netlify/functions/publisherDelete/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      }).then(() => {
        this.allPublishers();
      });
    },
    formatBooks(books) {
      return books.map((book) => book.title).join(", ");
    },
  },
};
</script>
