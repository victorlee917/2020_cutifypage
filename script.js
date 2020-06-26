import setCategory from "https://victorlee917.github.io/2020_cutifypage/script/setCategory.js";
import categoryData from "https://victorlee917.github.io/2020_cutifypage/data/categoryData.js";

import setBanner from "https://victorlee917.github.io/2020_cutifypage/script/setBanner.js";
import setContents from "https://victorlee917.github.io/2020_cutifypage/script/setContents.js";

setCategory();
setBanner();
setContents();

let state = { category: "All", loading: true };

document.addEventListener("DOMContentLoaded", () => {
  categoryData.forEach((category) => {
    const element = document.getElementById(category.name);
    element.addEventListener("click", (e) => {
      ///클릭 시 다른 요소 투명화
      categoryData.forEach((category) => {
        const element = document.getElementById(category.name);
        element.style.opacity = 0.3;
      });
      ///클릭한 요소 투명도 1
      if (e.target.id) {
        document.getElementById(e.target.id).style.opacity = 1;
      }
      ///카테고리에 맞는 배너 호출
      const banner = document.getElementById("banner_here");
      if (banner.hasChildNodes()) {
        banner.removeChild(banner.lastChild);
      }
      setBanner(e.target.id);
      const contents = document.getElementById("contents_here");
      if (contents_here.hasChildNodes()) {
        contents.innerHTML = "";
      }
      state.category = e.target.id;
      setContents(e.target.id);
    });
  });
  const goUP = document.getElementById("goUP");
  goUP.addEventListener("click", (e) => {
    scrollToTop(200);
  });
});

function scrollToTop(duration) {
  // cancel if already on top
  if (document.scrollingElement.scrollTop === 0) return;

  const totalScrollDistance = document.scrollingElement.scrollTop;
  let scrollY = totalScrollDistance,
    oldTimestamp = null;

  function step(newTimestamp) {
    if (oldTimestamp !== null) {
      // if duration is 0 scrollY will be -Infinity
      scrollY -=
        (totalScrollDistance * (newTimestamp - oldTimestamp)) / duration;
      if (scrollY <= 0) return (document.scrollingElement.scrollTop = 0);
      document.scrollingElement.scrollTop = scrollY;
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

window.addEventListener("scroll", function () {
  // console.log(window.scrollY);
  //scrollY는 현재 스크롤하고 있는 y 좌표
  // console.log(window.innerHeight);
  //innerHeight는 뷰포트의 Height
  // console.log(document.documentElement.scrollHeight);
  //scrollHeight는 DOM의 총 Height
  // console.log(window.scrollY + window.innerHeight);
  //두 값을 합한 것은 스크롤을 끝까지 내리면 scrollHeight와 같게 됨
  if (
    window.scrollY + window.innerHeight + 25 >=
    document.documentElement.scrollHeight
  ) {
    setContents(state.category);
  }
});
