<template>
  <div>
    <section class="pics" >
      <div class="container mb-3">
        <ul class="nav category-selector nav-pills nav-fill">
          <li class="nav-item">
            <a class="nav-link active" href="#">General</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">NFSW</a>
          </li>
        </ul>
      </div>
      <div class="container d-flex h-100 align-items-center">
        <div v-for="img in list" :key="img.src" class="col-sm-3 pb-2">
          <img
            :src="img.fileUrl"
            class="pic"
            data-toggle="modal"
            data-target="#imgModal"
            :data-id="img.id"
            :data-name="img.name"
            :data-createdat="img.createdAt"
            :data-updatedat="img.updatedAt"
          />
        </div>
      </div>
    </section>

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title>
        {{ selected.name }}
      </template>
      <div id="bv-modal-example" class="d-block text-center">
        <ul>
          <li>Author: {{ selected.author }}</li>
          <li>Created: {{ new Date(selected.createdAt).toLocaleString() }}</li>
        </ul>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
    </b-modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  page = 1
  category = 'general'
  list = []
  selected = {}

  async mounted() {
    const request = await fetch(`/api/pics?page=${this.page}&category=${this.category}`)
    const { pics } = await request.json()

    this.list = pics
  }

  showModal() {

  }
}
</script>
