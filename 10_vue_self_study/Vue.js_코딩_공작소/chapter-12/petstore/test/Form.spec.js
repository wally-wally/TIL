import { shallow } from '@vue/test-utils'
import Form from '../src/components/Form.vue'

describe('Form.vue', () => {

    it('버튼을 눌렀을 때 madeOrder가 true가 되는지 확인', () => {
      const wrapper = shallow(Form)
      wrapper.find('button').trigger('click')
      expect(wrapper.vm.madeOrder).toBe(true);
    })


})
