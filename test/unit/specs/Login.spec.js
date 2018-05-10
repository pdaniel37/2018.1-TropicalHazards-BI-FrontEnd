import sinon from "sinon"
import Vuex from "vuex"
import { shallow, createLocalVue } from "@vue/test-utils"
import Login from "@/components/Authentication/Login"

describe("Login", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const sandbox = sinon.createSandbox()
    const stub = sandbox.stub()

    let state
    let actions
    let store

    beforeEach(() => {
        actions = {

        },
        state = {

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

    it("Should login correctly", () => {
        const errors = {
            has: sandbox.stub()
        }

        const $router = {
            push: sandbox.stub()
        }

        const wrapper = shallow(Login, { store, localVue, mocks: {$router, errors} })
        wrapper.vm.Login()

        expect(actions.Login.called).toBeTruthy()
        // wrapper.vm.$nextTick(() => {
        //     expect(wrapper.vm.$router.push.called).to.be.true;
        //     done()
        // })
    })

    it("Should not login if credentials are messed up", () => {
        const errors = {
            has: sandbox.stub()
        }

        const wrapper = shallow(Login, { store, localVue, mocks: { errors } })

        stub.reset()
        stub.rejects()

        wrapper.vm.Login()

        expect(actions.Login.called).toBeTruthy()
        // wrapper.vm.$nextTick(() => {
        //     done()
        // })
    })
})
