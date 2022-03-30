import { db, storage } from "../../firebase";
import {
  getDocs,
  getDoc,
  setDoc,
  collection,
  doc,
  deleteDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import * as types from "../actionTypes";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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
    const productsQuery = query(productsRef, orderBy("createdAt", "desc"));
    getDocs(productsQuery)
      .then((data) => {
        const products = data.docs.map((doc) => extractProductData(doc));
        dispatch(fetchProductsSuccess(products));
      })
      .catch((error) => dispatch(fetchProductsFail(error.message)));
  };
};

const uploadImage = async (image) => {
  const storageRef = ref(storage, `images/${Date.now()}`);
  return uploadString(storageRef, image, "data_url");
};

export const addProduct = (product, { onSuccess, onError }) => {
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
      onError("Product with same SKU already exists");
      return;
    }
    try {
      let imageUrl = "";
      if (product.image) {
        const imageUpload = await uploadImage(product.image);
        imageUrl = await getDownloadURL(ref(storage, imageUpload.ref.fullPath));
      }
      await setDoc(docRef, {
        ...product,
        image: imageUrl,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      dispatch({
        type: types.ADD_PRODUCT_SUCCESS,
        payload: product,
      });
      onSuccess();
    } catch (error) {
      dispatch({
        type: types.ADD_PRODUCT_FAIL,
        payload: error,
      });
      onError(error);
    }
  };
};

export const editProduct = (product, { onSuccess, onError }) => {
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
      onError("Product does not exist");
      return;
    }

    try {
      let imageUrl = "";
      console.log(product);
      if (product.image?.substring(0, 5) === "data:") {
        const imageUpload = await uploadImage(product.image);
        imageUrl = await getDownloadURL(ref(storage, imageUpload.ref.fullPath));
      }
      await setDoc(docRef, {
        ...product,
        image: imageUrl,
        updatedAt: Timestamp.now(),
      });
      dispatch({
        type: types.EDIT_PRODUCT_SUCCESS,
        payload: product,
      });
      onSuccess();
    } catch (error) {
      dispatch({
        type: types.EDIT_PRODUCT_FAIL,
        payload: error,
      });
      onError(error);
    }
  };
};

export const deleteProduct = (product, { onSuccess, onError }) => {
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
      onError("Product does not exist");
      return;
    }

    deleteDoc(docRef)
      .then(() => {
        dispatch({
          type: types.DELETE_PRODUCT_SUCCESS,
          payload: product,
        });
        onError(onSuccess);
      })
      .catch((error) => {
        dispatch({
          type: types.DELETE_PRODUCT_FAIL,
          payload: error,
        });
        onError(error);
      });
  };
};
