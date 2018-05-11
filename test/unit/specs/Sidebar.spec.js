import { Vuex } from "vuex"
import { shallow, createLocalVue } from "@vue/test-utils"
import sinon from "sinon"
import SideBar from "@/components/Utils/SideBar"

describe("SideBar.vue", () => {
    // const localVue = createLocalVue()
    // localVue.use(Vuex)

    const sandbox = sinon.createSandbox()
    const stub = sandbox.stub()

    let state
    let actions
    let store

    beforeEach(() => {
        actions = {

        }

        state = {
            currentUser: {
                id: 1,
                username: "birl",
                email: "goddamn@hot.com"
            }
        }

        store = new Vuex.Store({
            state,
            actions,
        })
    })

    afterEach(() => {
        sandbox.reset()
        sandbox.restore()
    })

    it("should load user info", () => {
        const wrapper = shallow(SideBar, { store, localVue })
        wrapper.vm.loadUserInfo()

        expect(actions.loadUserInfo.called).toBeTruthy()
        expect(wrapper.vm.user.id).toEqual(state.currentUser.id)
        expect(wrapper.vm.user.username).toEqual(state.currentUser.username)
        expect(wrapper.vm.user.email).toEqual(state.currentUser.email)
    })
})
