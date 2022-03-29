import { db } from "../../firebase";
import {
  getDocs,
  getDoc,
  setDoc,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
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

export const addProduct = (product) => {
  return async function (dispatch) {
    dispatch({
      type: types.ADD_PRODUCT_INITIATE,
    });

    const docRef = doc(db, "products", product.id);
    const docResult = await getDoc(docRef);
    if (docResult.exists()) {
      dispatch({
        type: types.ADD_PRODUCT_FAIL,
        payload: "Product with same SKU already exists",
      });
      return;
    }

    setDoc(docRef, product)
      .then(() => {
        dispatch({
          type: types.ADD_PRODUCT_SUCCESS,
          payload: product,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.ADD_PRODUCT_FAIL,
          payload: error,
        });
      });
  };
};

export const editProduct = (product) => {
  return async function (dispatch) {
    dispatch({
      type: types.EDIT_PRODUCT_INITIATE,
    });
    const docRef = doc(db, "products", product.id);
    const docResult = await getDoc(docRef);
    if (!docResult.exists()) {
      dispatch({
        type: types.EDIT_PRODUCT_FAIL,
        payload: "Product does not exist",
      });
      return;
    }

    setDoc(docRef, product)
      .then(() => {
        dispatch({
          type: types.EDIT_PRODUCT_SUCCESS,
          payload: product,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.EDIT_PRODUCT_FAIL,
          payload: error,
        });
      });
  };
};

export const deleteProduct = (product) => {
  return async function (dispatch) {
    dispatch({
      type: types.DELETE_PRODUCT_INITIATE,
    });
    const docRef = doc(db, "products", product.id);
    const docResult = await getDoc(docRef);
    if (!docResult.exists()) {
      dispatch({
        type: types.DELETE_PRODUCT_FAIL,
        payload: "Product does not exist",
      });
      return;
    }

    deleteDoc(docRef)
      .then(() => {
        dispatch({
          type: types.DELETE_PRODUCT_SUCCESS,
          payload: product,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.DELETE_PRODUCT_FAIL,
          payload: error,
        });
      });
  };
};
