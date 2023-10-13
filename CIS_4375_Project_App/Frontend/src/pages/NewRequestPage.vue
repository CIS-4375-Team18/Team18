<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md q-mr-lg q-ml-lg q-mt-md">
      <q-card class="q-ma-lg">
        <q-card-section class="text-white bg-secondary">
          <div class="text-h6 text-left">Create New Support Ticket</div>
        </q-card-section>
        <q-separator />

        <div class="q-pl-xl q-pr-xl q-pt-md q-pb-md">
          <div class="row-inline row q-mt-md">
            <div class="col-4">
              <q-select
                class="ticket-select"
                transition-show="scale"
                transition-hide="scale"
                emit-value
                label="Select Priority"
                map-options
                color="secondary"
                v-model="PriorityList"
                :options="priorityData"
                option-value="TICKET_PRIORITY_ID"
                option-label="TICKET_PRIORITY_DESC"
              />
            </div>
            <div class="col-4">
              <q-select
                transition-show="scale"
                transition-hide="scale"
                class=" ticket-select"
                color="secondary"
                emit-value
                map-options
                label="Select Main Category"
                v-model="categoryModel"
                :options="categoryData"
                option-value="TICKET_CATEGORY_ID"
                option-label="TICKET_CATEGORY_DESC"
              />
            </div>
            <div class="col-4">
              <q-select
                transition-show="scale"
                transition-hide="scale"
                class="ticket-select"
                color="secondary"
                emit-value
                map-options
                label="Select Subcategory"
              />
            </div>
          </div>

          <!-- Hide entire row if any category besides hardware is selected -->
          <div class="row-inline flex-direction-down row q-mt-md row-custom">
            <div class="col-4">
              <q-input
                class="new-request-input"
                label="Asset Tag"
                color="secondary"
              >
                <template v-slot:append>
                  <q-icon
                    :align="top"
                    size="xs"
                    class="q-mb-sm"
                    name="help"
                    color="secondary"
                  >
                    <q-tooltip>
                      Unique identifier allocated to device
                    </q-tooltip>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col">
              <div>
                <q-input
                  class="new-request-input"
                  label="Asset Make"
                  color="secondary"
                >
                  <template v-slot:append>
                    <q-icon
                      :align="top"
                      size="xs"
                      class="q-mb-sm"
                      name="help"
                      color="secondary"
                    >
                      <q-tooltip> i.e., DELL, Acer, Lenovo, etc. </q-tooltip>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="col-4">
              <q-input
                class="new-request-input"
                label="Asset Model"
                color="secondary"
              >
                <template v-slot:append>
                  <q-icon
                    :align="top"
                    size="xs"
                    class="q-mb-sm"
                    name="help"
                    color="secondary"
                  >
                    <q-tooltip> i.e., G7-700 </q-tooltip>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row-inline flex-direction-down row q-mt-md row-custom">
            <div class="col-4">
              <div class="col-4">
              <q-select
                transition-show="scale"
                transition-hide="scale"
                class=" ticket-select"
                color="secondary"
                emit-value
                map-options
                label="Select Availability"

              >
              <template v-slot:append>
                  <q-icon
                    :align="top"
                    size="xs"
                    class="q-mb-sm"
                    name="help"
                    color="secondary"
                  >
                    <q-tooltip> Select period to indicate availbe time </q-tooltip>
                  </q-icon>
                </template>
            </q-select>
            </div>
            </div>
            </div>
          <div class="row-inline flex-direction-down row q-mt-lg">
            <div class="col">
              <q-input
                class="new-request-subject"
                label="Subject"
                color="secondary"
              >
                <template v-slot:append>
                  <q-icon
                    :align="top"
                    size="xs"
                    class="q-mb-sm"
                    name="help"
                    color="secondary"
                  >
                    <q-tooltip>
                      Provide a sentence describing the issue
                    </q-tooltip>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row-inline flex-direction-down row q-mt-lg">
            <div class="col">
              <q-item-label class="text-subtitle1 text-primary q-mb-sm"
                >Description:
                <q-icon
                  :align="top"
                  size="xs"
                  class="q-mb-sm"
                  name="help"
                  color="secondary"
                >
                  <q-tooltip>
                    Provide a detailed description of the issue
                  </q-tooltip>
                </q-icon>
              </q-item-label>
              <q-input clearable outlined type="textarea" color="secondary" />
            </div>
          </div>
          <div class="row-inline flex-direction-down row q-mt-lg">
            <div class="col">
              <!-- Decide to use file uploader file picker depending on functionality -->
              <!--
              <q-uploader
                class="new-req-uploader"
                url=""
                label="Upload Image"
                color="secondary"
                text-color="white"
              />
              -->
              <q-file
              class="new-req-uploader"
                :dense="dense"
                v-model="model"
                filled
                bg-color="transparent"
                label="Attach image"
                clearable
                color="secondary"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" color="secondary" />
                </template>
              </q-file>
            </div>
          </div>

          <div class="col q-mb-md q-mt-lg" align="right">
            <q-btn
              color="accent"
              text-color="secondary"
              no-caps
              label="Cancel"
              type="submit"
              @click="confirmCancel"
            />
            <q-btn
              class="q-ml-xl"
              color="secondary"
              no-caps
              label="Submit"
              type="submit"
            />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      categoryData: [],
      priorityData: [],
      subCategoryData: [],
      hardwCatId: [],
    };
  },

  created() {
    axios.get(`http://localhost:8001/api/activecategories`).then((res) => {
      this.categoryData = res.data;
      this.findHardwareId();
    });
    axios.get(`http://localhost:8001/api/activepriorities`).then((res) => {
      this.priorityData = res.data;
    });
    axios.get(`http://localhost:8001/api/activesubcategories`).then((res) => {
      this.subCategoryData = res.data;
    });
  },
  setup() {
    return {
      categoryModel: ref(null),
      PriorityList: ref(null),
      textareaModel: ref(null),
      subjectModel: ref(null),
      assetTagModel: ref(null),
      subCatList: ref(null),
      dense: ref(true),
      denseOpts: ref(true),
      model: ref(null),
    };
  },

  methods: {
    //Get ID of category Type Hardware
    findHardwareId() {
      this.hardwCatId = this.categoryData.find(
        (o) => o.TICKET_CATEGORY_DESC === "HARDWARE"
      );
      console.log(hardwCatId);
    },

    confirmCancel() {
      Dialog.create({
        title: "Cancel Ticket Creation",
        message: "Are you sure you want to cancel ticket creation?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          this.$router.replace("/");
        })
        .onCancel(() => {
          // Do nothing
        });
    },
  },
};
</script>
<style scoped>
.text-subtitle1 {
  font-weight: bold;
}
.text-subtitle2 {
  color: primary;
}
.category-select {
  width: 50%;
}
.ticket-select {
  width: 50%;
}
.new-request-input {
  width: 50%;
}
.new-req-uploader {
  max-width: 40%;
}
.new-req-uploader{
  max-width: 25%;
}
</style>
