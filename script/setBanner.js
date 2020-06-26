import bannerData from "data/bannerData.js";

const setBanner = (value = "All") => {
  const bannerBox = document.createElement("div");
  bannerBox.setAttribute("id", "banner");
  let bannerHtml = `<a href=${bannerData[value].url} target="_blank" id="banner_box">
    <div id="banner_box_left">
      <div id="banner_box_left_top">${bannerData[value].title}</div>
      <div id="banner_box_left_bottom">${bannerData[value].desc}</div>
    </div>
    <div id="banner_box_right">
      <img id="banner_box_right_img" src=${bannerData[value].img}></img>
    </div>
  </a>`;
  bannerBox.innerHTML = bannerHtml;
  document.getElementById("banner_here").appendChild(bannerBox);
};

export default setBanner;
