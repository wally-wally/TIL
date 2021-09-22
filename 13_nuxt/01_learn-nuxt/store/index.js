import { fetchCartItems } from "@/api";

// constants
export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';

export const state = () => ({
  cartItems: [],
})

export const mutations = {
  addCartItem(state, cartItem) {
    state.cartItems.push({
      ...cartItem,
      imageUrl: `${cartItem.imageUrl}?random=${Math.random()}`
    });
  },

  setCartItems(state, cartItems) {
    state.cartItems = cartItems;
  }
}

export const actions = {
  async [FETCH_CART_ITEMS]({ commit }) {
    const { data } = await fetchCartItems();
    commit('setCartItems', data.map(item => {
      return {
        ...item,
        imageUrl: `${item.imageUrl}?random=${Math.random()}`
      }
    }));
  },

  // nuxtServerInit: store를 생성하는 시점에 데이터를 설정하는 action들의 entry point
  // nuxt app이 실행될 때 무조건 실행되는 lifecycle hook이다.
  // nuxt app이 실행하는데 필요한 데이터를 미리 불러오고 싶을 때 사용하면 좋다.
  async nuxtServerInit(storeContext, nuxtContext) {
    await storeContext.dispatch(FETCH_CART_ITEMS);
    // const { data } = await fetchCartItems();
    // storeContext.commit('setCartItems', data.map(item => {
    //   return {
    //     ...item,
    //     imageUrl: `${item.imageUrl}?random=${Math.random()}`
    //   }
    // }));
  }
}
