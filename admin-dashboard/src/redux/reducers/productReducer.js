import * as types from "../actionTypes";

const initialState = {
  loading: false,
  products: null,
  error: null,
  product: {
    loading: false,
    error: null,
  },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_INITIATE:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case types.FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_PRODUCT_INITIATE:
    case types.EDIT_PRODUCT_INITIATE:
    case types.DELETE_PRODUCT_INITIATE:
      return {
        ...state,
        product: { loading: true, error: "" },
      };
    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [action.payload, ...state.products],
        product: { loading: false, error: "" },
      };
    case types.EDIT_PRODUCT_SUCCESS:
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      let updatedProducts = state.products;
      updatedProducts[index] = action.payload;
      return {
        ...state,
        loading: false,
        products: updatedProducts,
        product: { loading: false, error: "" },
      };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
        product: { loading: false, error: "" },
      };
    case types.ADD_PRODUCT_FAIL:
    case types.EDIT_PRODUCT_FAIL:
    case types.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        product: { loading: false, error: action.payload },
      };
    default:
      return state;
  }
};

export default productReducer;
