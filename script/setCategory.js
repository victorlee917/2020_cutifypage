import categoryData from "/data/categoryData.js";

const setCategory = () => {
  const categoryBox = document.createElement("div");
  categoryBox.setAttribute("id", "category");
  let categoryHtml = "";
  categoryData.forEach((category) => {
    categoryHtml =
      categoryHtml +
      `<div id=${category.name} class="category_card">
          <div class="category_card_top">
          <div class="category_card_top_box">
          <img class="category_card_top_box_img" src=${category.img}></img>
          </div>
          </div>
          <div class="category_card_bottom">${category.name}</div>
        </div>`;
  });
  categoryBox.innerHTML = categoryHtml;
  document.getElementById("category_here").appendChild(categoryBox);
};

export default setCategory;
