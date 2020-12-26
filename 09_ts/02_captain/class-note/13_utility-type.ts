interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 1. 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {

}

// interface ProductDetail {
//   id: number;
//   name: string;
//   price: number;
// }

type ShoppingItem = Pick<Product, 'id' | 'name' | 'price'>;
// 2. 특정 상품의 상세 정보를 나타내기 위한 함수
function displayProductDetail(shoppingItem: Pick<Product, 'id' | 'name' | 'price'>) {

}

// interface UpdateProduct {
//   id?: number;
//   name?: string;
//   price?: number;
//   brand?: string;
//   stock?: number;
// }

type UpdateProduct = Partial<Product>;
// 3. 특정 상품 정보를 업데이트(갱신)하는 함수
function updateProductItem(productItem: UpdateProduct) {

}

// 4. 유틸리티 타입 구현하기 - Partial
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}
// 아래와 같이 작성하면 불필요한 타입 정의들이 생긴다.
// interface UserProfileUpdate {
//   username?: string;
//   email?: string;
//   profilePhotoUrl?: string;
// }

// #1
type UserProfileUpdate1 = {
  username?: UserProfile['username'];
  email?: UserProfile['email'];
  profilePhotoUrl?: UserProfile['profilePhotoUrl'];
}

// #2 (Mapped Type 적용)
type UserProfileUpdate2 = {
  [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p];
}

// #3
type UserProfileKeys = keyof UserProfile;
type UserProfileUpdate3 = {
  [p in keyof UserProfile]?: UserProfile[p];
}

// #4 (Generic을 적용해서 실제 Partial 구현체 완성)
type Subset<T> = {
  [p in keyof T]?: T[p];
}