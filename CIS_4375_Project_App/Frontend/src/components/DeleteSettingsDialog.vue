<template>
    <q-dialog v-model="showDialog" persistent>
        <q-card style="min-width: 350px">
            <q-card-section class="qheader text-white " >
                <div class="text-h6 ">{{title}}</div>
            </q-card-section>
            <q-card-section>
                <div class="text-body2 q-mt-lg">Are you sure you want to delete the <strong> {{ itemName }} </strong> {{ type }}</div>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
                <q-btn class="actionsbtn"  flat label="Cancel" @click="closeDialog"  />
                <q-btn class="actionsbtn"  color="secondary" label="Delete" @click="deleteRecord" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>

export default {
    data() {
        return {
            title: '',
            nameLabel: '',
            showDialog: true,
            itemId: null,
            itemName: '',
        };
    },
    props: {
        // item id
        id: Number,
        // item name
        name: String, 
        // item type
        type: String,
    },
    created() {
        // dynamically create title name based on what type it is
        // e.g. "Update Category" or "Update Priority"
        this.title = `Delete ${this.type}`;
        // set variables used for save api later
        this.itemId = this.id;
        this.itemName = this.name;
    },
    methods: {
        closeDialog() {
            // hide dialog
            this.showDialog = false;
            // notify parent component to close dialog
            this.$emit("close-dialog", false);
        },
        deleteRecord(){
              // create dynamic property name
            // e.g. TICKET_CATEGORY_ID or TICKET_PRIORITY_ID
            const idPropertyName = `TICKET_${this.type.toUpperCase()}_ID`;
            // notify parent to delete dialog with the following values
            this.$emit("delete-dialog", {
                item: {
                    [idPropertyName]: this.itemId,
                },
                idPropertyName,
            });
        },
      

       
    },
    
};
</script>
<style scoped>
.actionsbtn{
    margin: 10px;
}
.qheader{
    background-color: #ad0000;
}
</style>