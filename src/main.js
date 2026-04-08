import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let page = 1;
let currentQuery = "";
let totalHits = 0;

form.addEventListener("submit", onSearch);

async function onSearch(event) {
  event.preventDefault();

  const query = event.target.elements["search-text"].value.trim();

  if (!query) {
    iziToast.warning({
      message: "Please enter a search query",
      position: "topRight",
    });
    return;
  }
  currentQuery = query;
  page = 1;

  clearGallery();
  showLoadMoreButton();
  showLoader();
  

  try {
    const data = await getImagesByQuery(query, page);

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }

    createGallery(data.hits);
    if (data.hits.length < totalHits) {
      loadMoreBtn.classList.remove("hidden");
    }

  } catch (error) {
    iziToast.error({
      message: "Something went wrong",
      position: "topRight",
    });
  } finally {
    hideLoader();
    loadMoreBtn.classList.add("hidden");
  }
}

loadMoreBtn.addEventListener("click", async () => {
  page++;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);

    if (page >= totalPages) {
      loadMoreBtn.classList.add("hidden");

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }

    scrollPage();

  } catch (error) {
    iziToast.error({
      message: "Error loading more images",
      position: "topRight",
    });
  } finally {
    hideLoader();
  }
});

function scrollPage() {
  const { height } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: "smooth",
  });
}



const label = document.querySelector("label");
label.classList.add("form-label");
const input = document.querySelector("input");
input.classList.add("form-input");
const btn = document.querySelector("button")
btn.classList.add("form-btn");
const container = document.createElement("div");
container.classList.add("form-container");
form.insertBefore(container,label);
container.append(label, btn);

