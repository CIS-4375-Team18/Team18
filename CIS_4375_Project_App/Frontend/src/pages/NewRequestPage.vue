
<template>
  <div class="q-pa-md q-gutter-sm" style="margin-left: 15PX; margin-right: 15PX;">
    <q-card class="requests-card">
      <q-card-section class="text-white" style="background-color: #af0000;">
        <div class="text-h6 text-left">New Request</div>
      </q-card-section>
      <q-separator />
      <div class="q-pa-md example-row-column-width">

      <!-- Category Selection-->
        <div class="row flex q-col-gutter-md">
          <div class="col-md-3">
            <p style="font-weight: bold; color: #666262; margin-bottom: 4px; min-width: 150px;">Select Category: </p>
            <q-select filled stack-label :dense="dense" :options-dense="denseOpts" label="Category"
              v-model="categoryModel" :options="categoryData" option-value="TICKET_CATEGORY_ID"
              option-label="TICKET_CATEGORY_DESC" emit-value map-options />
          </div>

          <!-- Priority Selection-->
          <div class="col-4"></div>
          <div class="col-md-3">
            <p style="font-weight: bold; color: #666262; margin-bottom: 4px; min-width: 150px;">Select Priority: </p>
            <q-select filled stack-label :dense="dense" :options-dense="denseOpts" label="Priority" v-model="PriorityList"
              :options="priorityData" option-value="TICKET_PRIORITY_ID" option-label="TICKET_PRIORITY_DESC" emit-value
              map-options />
          </div>
        </div>

        <!-- If Hardware category is selected these additional fields appear  -->
        <div v-if="categoryModel === hardwCatId.TICKET_CATEGORY_ID" class="row flex " style="margin-top: 20px;">
          <div class="col-md-3">
            <p style="font-weight: bold; color: #666262; margin-bottom: 4px; min-width: 150px;">Select Sub Category: </p>
            <q-select filled stack-label :dense="dense" :options-dense="denseOpts" label="Sub Category" v-model="subCatList"
              :options="subCategoryData" option-value="TICKET_SUB_CATEGORY_ID" option-label="TICKET_SUB_CATEGORY_DESC" emit-value
              map-options />
          </div>
          <div class="col-4"></div>

          <!--Asset Tag Input-->
          <div class="col-md-3" style="margin-left: 10px;">
            <p style="font-weight: bold; color: #666262; margin-bottom: 4px; min-width: 150px;">Asset Tag: </p>
            <q-input filled   v-model="assetTagModel" :dense="dense" :options-dense="denseOpts" />
          </div>
        </div>
        <div class="row flex " style="margin-top: 20px;">
          <p style="font-weight: bold; color: #666262; margin-bottom: 4px;">Subject: </p>
        </div>
        <q-input filled v-model="subjectModel" :dense="dense" :options-dense="denseOpts" />
        <div class="row flex " style="margin-top: 20px;">
          <p style="font-weight: bold; color: #666262; margin-bottom: 4px;">Description: </p>
        </div>
        <q-input v-model="textareaModel" filled clearable type="textarea" :shadow-text="textareaShadowText"
          @keydown="processTextareaFill" @focus="processTextareaFill" />
      </div>
      <div class="row flex " style="margin: 20px;">
        <q-btn icon="attach_file" text-color="black" label="Attach file"
          style="margin-bottom: 20px; outline-color: #e6e6e6;" />
      </div>
      <div class="row flex justify-center" style="margin: 20px; align-content: center;">
        <q-btn @click="saveRequest(userId)" outline icon="send" text-color="primary" label="Submit"
          style="margin-bottom: 30px; margin-right: 40px;  min-width: 130px; background-color: #03521c;" />
        <q-btn @click="confirmCancel" outline icon="cancel"  color="negative" text-color="secondary" label="Cancel"
          style="margin-bottom: 30px; margin-left: 40px; min-width: 130px;" />

      </div>
    </q-card>
  </div>
</template>
<script>
//import axios from 'src/boot/axios'
import { ref } from 'vue'
import { mapGetters } from 'vuex'
import { Dialog } from 'quasar'
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export default {
  data() {
    return {
      categoryData: [],
      priorityData: [],
      subCategoryData: [],
      hardwCatId: [],
      openTicketStatusId: null
    }
  },

  created() {
    axios.get(`${apiURL}/activecategories`).then((res) => {
      this.categoryData = res.data
      this.findHardwareId()
    })
    axios.get(`${apiURL}/activepriorities`).then((res) => {
      this.priorityData = res.data
    })
    axios.get(`${apiURL}/activesubcategories`).then((res) => {
      this.subCategoryData = res.data
    })
    axios.get(`${apiURL}/activeticketstatuses`).then((res) => {
      // query for all the active ticket statuses
      for(let i = 0; i < res.data.length; i++) {
        const currentStatus = res.data[i];
        // find the `OPEN` ticket status
        if (currentStatus.SUPPORT_TICKET_STATUS_DESC === 'OPEN') {
          // get the id of the open ticket status and save that in a variable for us to use in the save api later
          this.openTicketStatusId = currentStatus.SUPPORT_TICKET_STATUS_ID;
          break;
        }
      }
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
      denseOpts: ref(true)
    }
  },

  methods: {
    //Get ID of category Type Hardware
    findHardwareId() {
      this.hardwCatId = this.categoryData.find(o => o.TICKET_CATEGORY_DESC === 'HARDWARE');
      console.log(hardwCatId)
    },
    async saveRequest(userId) {
      try {
        // if we have a subcategory, store it into this variable
        // otherwise subcategory will be null
        let subCategory = null;
        if (this.subCatList !== null) {
          subCategory = this.subCatList;
        }

        // today's date in ISO format - which is the same format we will save in the database
        const dateCreated = new Date().toISOString();

        // create the support ticket to be saved in the database
        const supportticket = {
          SUPPORT_TICKET_SUBJECT: this.subjectModel, // subject
          SUPPORT_TICKET_NOTE: this.textareaModel, // description
          DEVICE_MAKE: null,
          DEVICE_MODEL: null, 
          SUPPORT_TICKET_TIMELINE: null,
          SUPPORT_TICKET_DATE_CREATED: dateCreated,
          SUPPORT_TICKET_RESOLUTION_TIME: null,
          SUPPORT_TICKET_STATUS_ID: this.openTicketStatusId, // open ticket status
          TICKET_CATEGORY_ID: this.categoryModel, // category
          TICKET_SUB_CATEGORY_ID: subCategory, // sub category
          TICKET_PRIORITY_ID: this.PriorityList, // priority
          SUPPORT_AGENT_ID: null,
          RESOLUTION_DATE: null,
          END_USER_ID: userId,
          SUPPORT_TICKET_ASSET_TAG: this.assetTagModel // asset tag
        };

        // call the save api for support ticket
        const response = await axios.post(`${apiURL}/supportticket`, supportticket);
        // if the save is successful for the support ticket
        if(response.status === 200) {
          // then we will redirect to the list of requests
          this.$router.push({ path: '/requests' });
        } else {
          // if an error happens, we don't redirect the user to the list of requests and show them an error dialog
          Dialog.create({
            title: 'An error occurred',
            message: 'Please try again later.',
          });
          console.error('Failed to save request.')
        };
      } catch (error) {
        // if an error happens, we don't redirect the user to the list of requests and show them an error dialog
        Dialog.create({
          title: 'An error occurred',
          message: 'Please try again later.',
        });
        console.error('Save API request failed:', error);
      }
    },
    confirmCancel() {
      Dialog.create({
        title: 'Cancel Ticket Creation',
        message: 'Are you sure you want to cancel ticket creation?',
        cancel: true,
        persistent: true
      })
        .onOk(() => {
          this.$router.replace('/')
        })
        .onCancel(() => {
          // Do nothing
        })
    }
  },
  computed: {
    ...mapGetters('auth', ['userId']),
  }
}
</script>