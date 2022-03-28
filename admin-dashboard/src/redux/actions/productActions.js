import { db } from "../../firebase";
import { getDocs, getDoc, setDoc, collection } from "firebase/firestore";
import * as types from "../actionTypes";

const productsRef = collection(db, "products");

const fetchProductsInitiate = () => ({
  type: types.FETCH_PRODUCTS_INITIATE,
});

const fetchProductsSuccess = (products) => ({
  type: types.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

const fetchProductsFail = (error) => ({
  type: types.FETCH_PRODUCTS_FAIL,
  payload: error,
});

const extractProductData = (doc) => {
  return {
    id: doc.id,
    title: doc._document.data.value.mapValue.fields.title.stringValue,
    image: doc._document.data.value.mapValue.fields.image.stringValue,
  };
};

export const fetchProductList = () => {
  return function (dispatch) {
    dispatch(fetchProductsInitiate());
    getDocs(productsRef)
      .then((data) => {
        const products = data.docs.map((doc) => extractProductData(doc));
        dispatch(fetchProductsSuccess(products));
      })
      .catch((error) => dispatch(fetchProductsFail(error.message)));
  };
};
