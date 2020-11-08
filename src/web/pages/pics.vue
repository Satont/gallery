<template>
  <div>
    <section class="pics" >
      <div class="container mb-3">
        <b-nav pills fill>
          <b-nav-item active @click="category = 'general'">General</b-nav-item>
          <b-nav-item @click="category = 'nfsw'">NFSW</b-nav-item>
        </b-nav>
      </div>
      <div class="container d-flex h-100 align-items-center">
        <div class="row">
          <div v-for="item in list" :key="item.id" class="col-sm-3 pb-2">
            <img
              :src="item.fileUrl"
              class="list-pic"
              data-toggle="modal"
              data-target="#imgModal"
              :data-id="item.id"
              :data-name="item.name"
              :data-createdat="item.createdAt"
              :data-updatedat="item.updatedAt"
              @click="selected = item; $bvModal.show('bv-modal-example')"
            />
          </div>
        </div>
      </div>
    </section>

    <infinite-loading @infinite="onInfinity" :identifier="infiniteId" spinner="waveDots">
      <div class="text-white-50" slot="no-more">No more pics. :(</div>
    </infinite-loading>

    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title>
        {{ selected.name }}
      </template>
      <div id="bv-modal-example" class="d-block text-center">
        <ul>
          <li>Author: {{ selected.author }}</li>
          <li>Created: {{ new Date(selected.createdAt).toLocaleString() }}</li>
        </ul>
        <img :src="selected.fileUrl" />
      </div>
      <!-- <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button> -->
    </b-modal>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from 'vue-property-decorator'
import InfiniteLoading from 'vue-infinite-loading'

@Component({
  components: {
    InfiniteLoading,
  }
})
export default class App extends Vue {
  loading = false
  page = 1
  category = 'general'
  list = []
  selected = {}
  infiniteId = +new Date()

  async onInfinity($state) {
    const pics = await this.getPics()

    if (pics.length) {
      this.page++
      this.list.push(...pics)
      $state.loaded()
    } else {
      $state.complete()
    }
  }

  async getPics() {
    const request = await fetch(`/api/pics?page=${this.page}&category=${this.category}`)
    const { pics } = await request.json()

    return pics
  }

  @Watch('category')
  onCategoryChange(val: string, oldVal: string) {
    if (val === oldVal) return

    this.page = 1
    this.list = []
    this.infiniteId += 1
  }
}
</script>
