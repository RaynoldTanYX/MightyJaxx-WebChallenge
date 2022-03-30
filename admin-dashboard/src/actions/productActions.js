import { db, storage } from "../firebase";
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
  updateDoc,
} from "firebase/firestore";
import * as types from "../constants/actionTypes";
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
  const fields = doc._document.data.value.mapValue.fields;
  return {
    id: doc.id,
    title: fields.title.stringValue,
    image: fields.image.stringValue,
    createdAt: fields.createdAt.timestampValue,
    updatedAt: fields.updatedAt.timestampValue,
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
      const newProduct = {
        ...product,
        image: imageUrl,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      await setDoc(docRef, newProduct);
      dispatch({
        type: types.ADD_PRODUCT_SUCCESS,
        payload: newProduct,
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

    try {
      let imageUrl = "";
      const isNewImage = product.image?.substring(0, 5) === "data:";
      if (isNewImage) {
        const imageUpload = await uploadImage(product.image);
        imageUrl = await getDownloadURL(ref(storage, imageUpload.ref.fullPath));
      }
      const updatedProduct = {
        ...product,
        ...(isNewImage && { image: imageUrl }),
        updatedAt: Timestamp.now(),
      };
      await updateDoc(docRef, updatedProduct);
      dispatch({
        type: types.EDIT_PRODUCT_SUCCESS,
        payload: updatedProduct,
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
        onSuccess();
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
