import userPreview from './user-preview.cmp.js'


export default {
  name: "bug-user-list",
  props: ["users","loggedInUser"],
  template: `
  <table style="width:100%" class="bug-user-list-table">
        <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>User Name</th>
                <th>Admin</th>
                <th>Delete</th>
            </tr>
        <user-preview v-for="user in users"  :user="user" :key="user._id" :loggedInUser="loggedInUser" v-on:removeUser="removeUser" />
</table>
    `,
  components: {
    userPreview,
  },
  methods: {
    removeUser(userId) {
      this.$emit("removeUser", userId);
    },
  },
};
