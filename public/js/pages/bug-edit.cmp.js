import { bugService } from "../services/bug.service.js";
import { userService } from "../services/user.service.js";

export default {
  name: "bug-edit",
  template: `
    <section class="edit-bug">
        <h1>Bug Edit/Add</h1>
        <form class="edit-bug-table flex">
            <table>
                <tr>
                    <td>
                        <label for="title">Title:</label>
                    </td>
                    <td>
                        <input type="text" id="title" name="title" v-model="bug.title" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="severity">Severity:</label>
                    </td>
                    <td>
                        <input type="number" id="severity" name="severity" min="1" max="5" v-model="bug.severity"/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="status">Status:</label>
                    </td>
                    <td>
                        <select name="cars" id="status" v-model="bug.status">
                            <option value="to-do">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="qa">QA</option>
                            <option value="done">Done</option>
                            </select>
                    </td>
                </tr>

                <tr>
                    <td>
                        <label for="desc">Description:</label>
                    </td>
                    <td>
                        <textarea  id="desc" name="desc" v-model="bug.description"  rows="5" cols="40" ></textarea>

                    </td>
                </tr>

                <!-- <tr>
                    <td colspan="2" class="bug-edit-save-td">
                    </td>
                </tr> -->
            </table>
            <button @click.prevent="save"><i class="far fa-save"></i> Save </button>

        </form>
    </section>
    `,
  data() {
    return {
      loggedInUser: userService.getLoggedInUser(),
      bug: {
        title: "",
        description: "",
        severity: 1,
        createdAt: null,
        isDone: false,
        creator: {
          nickname: "",
        },
      },
    };
  },
  created() {
    if (!this.loggedInUser) {
      this.$router.push("/");
    }

    const bugId = this.$route.params.id;
    if (bugId) {
      bugService.getById(bugId).then((bug) => {
        this.bug = bug;
      });
    }
  },
  methods: {
    save() {
      bugService.save(this.bug).then((bug) => {
        this.$router.push("/bug/" + bug._id);
      });
    },
  },
};
