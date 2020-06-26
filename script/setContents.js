let contentsHtml = "";

let url = "https://victorlee917.github.io/cutify/array.json";

const category = ["Dog", "Cat"];

const setContents = (value = "All") => {
  fetch(url)
    .then((res) => res.json())
    .then(async (results) => {
      const contentsBox = document.createElement("div");
      contentsBox.setAttribute("class", "contents");
      let countChildren = document.getElementsByClassName("contents")?.length;
      contentsHtml = "";
      if (!countChildren) {
        countChildren = 0;
        const loadingBox = document.getElementById("loadingBox");
      }
      if (value === "All") {
        const contentsData = [...results];
        if (contentsData.length < countChildren * 6 + 1) {
          return;
        }
        for (let i = 0; i < 6; i++) {
          const index = i + countChildren * 6;
          let content = contentsData[index];
          if (!content) {
            break;
          }
          await loopContents(content);
        }
        contentsBox.innerHTML = contentsHtml;
        document.getElementById("contents_here").append(contentsBox);
      } else {
        let contentsData = [];
        const filterResults = (result) => {
          if (value === "Others") {
            const isOthers = () => {
              return category.includes(result.category);
            };
            if (!isOthers()) {
              contentsData = [...contentsData, result];
            }
          } else {
            if (result.category === value) {
              contentsData = [...contentsData, result];
            }
          }
          return new Promise(function (resolve, reject) {
            resolve();
          });
        };
        for (let i = 0; i < results.length; i++) {
          let result = results[i];
          await filterResults(result);
        }
        if (contentsData.length < countChildren * 6 + 1) {
          return;
        }
        for (let i = 0; i < 6; i++) {
          const index = i + countChildren * 6;
          let content = contentsData[index];
          if (!content) {
            break;
          }
          await loopContents(content);
        }
        contentsBox.innerHTML = contentsHtml;
        document.getElementById("contents_here").appendChild(contentsBox);
      }
    })
    .catch((err) => {
      throw err;
    });
};

const loopContents = (content) => {
  if (content.title.length > 20) {
    content.title = content.title.substr(0, 19) + "…";
  }
  if (content.desc.length > 50) {
    content.desc = content.desc.substr(0, 49) + "…";
  }
  contentsHtml =
    contentsHtml +
    `
    <a class="contents_card" href=${content.url} target="_blank">
    <div class="contents_card_header">
    <div class="contents_card_top">
    <img class="contents_card_top_img" src=${
      content.image
        ? content.image
        : content.category == "Dog" || content.category == "Cat"
        ? `images/category/${content.category}_C.png`
        : `images/category/All_C.png`
    } />
    <div class="contents_card_time">${content.time}</div>
    </div>
    <div class="contents_card_bottom">
    <div class="contents_card_bottom_header">
    <div class="contents_card_bottom_header_title">${content.title}</div>
    <div class="contents_card_bottom_header_desc">${content.desc}</div>
    </div>
    </div>
</div>
    <div class="contents_card_footer">
      <div class="contents_card_footer_channel">
        <img class="contents_card_footer_channel_img" src="images/contents/${
          content.channel
        }.png"/>
      </div>
      <div class="contents_card_footer_author">${content.author}</div>
      </div>
    </img>
    </a>
    `;
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

export default setContents;
