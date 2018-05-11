import { shallow, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import sinon from "sinon"
import Navbar from "@/components/Utils/Navbar"

describe("Navbar.vue", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const sandbox = sinon.createSandbox()

    let state
    let actions
    let store

    beforeEach(() => {
        state = {

        },
        actions = {
            logout: sandbox.stub(),
            login: sandbox.stub(),
        }
    })

    afterEach(()=> {
        sandbox.reset()
        sandbox.restore()
    })

    it("should router push if logout is clicked", () =>{
        const $router = {
            push: sandbox.stub()
        }

        const wrapper = shallow(Navbar, {store, localVue, mocks: {$router}})
        wrapper.vm.Logout()
        expect(wrapper.vm.$router.push).toBeCalled()
    })

    it("should call showModalLogin", () => {
        const wrapper = shallow(Navbar)
        wrapper.find("#modal-login-trigger").trigger("click")

        expect(wrapper.vm.showModalLogin).toBeCalled()
    })

    it("should call showModalRegister", () => {
        const wrapper = shallow(Navbar)
        wrapper.find("#modal-register-trigger").trigger("click")

        expect(wrapper.vm.showModalRegister).toBeCalled()
    })
})
