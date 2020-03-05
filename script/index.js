/**
 * Function to ctreate HTML Node
 * @param {String} tag
 * @param {Array} attrs
 * @param {Array|String|null} inner
 * @return {Node}
 */
const createHTMLNode = (tag, attrs, inner) => {
  const element = document.createElement(tag);
  attrs.map(attr => {
    element.setAttribute(attr.name, attr.value.join(" "));
  });
  inner
    ? Array.isArray(inner)
      ? inner.map(el => element.appendChild(el))
      : (element.innerHTML = inner)
    : null;
  return element;
};
const renderInApp = htmlNode => {
  document.getElementById("app").innerHTML = "";
  htmlNode.map(el => document.getElementById("app").appendChild(el));
};

let data =
  '{"accounts":[{"title":"One Line Item #1","img":"https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"},{"title":"One Line Item #2","img":"https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"},{"title":"One Line Item #3","img":"https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"}]}';
let dataRes = JSON.parse(data);
console.log(dataRes.accounts);
// data = JSON.stringify(dataRes);

const dataList = () => {
  return createHTMLNode(
    "ul",
    [],
    dataRes.accounts.map((el, i) =>
      createHTMLNode(
        "li",
        i == 0
          ? [
              { name: "tabindex", value: ["0"] },
              //   { name: "class", value: ["active"] },
              { name: "value", value: [i] }
            ]
          : [
              { name: "tabindex", value: ["0"] },
              { name: "value", value: [i] }
            ],
        [
          createHTMLNode("img", [{ name: "src", value: [el.img] }], null),
          createHTMLNode("div", [], el.title)
        ]
      )
    )
  );
};

const btnScreenOne = () => {
  return createHTMLNode(
    "button",
    [{ name: "class", value: ["btn-screen-1"] }],
    "ADD"
  );
};

// screen2
const screenTwoWrap = createHTMLNode(
  "div",
  [{ name: "class", value: ["screen-wrap"] }],
  [
    createHTMLNode("input", [{ name: "type", value: ["text"] }], null),
    createHTMLNode(
      "button",
      [{ name: "class", value: ["btn-add-screen-2", "active"] }],
      "ADD"
    ),
    createHTMLNode(
      "button",
      [{ name: "class", value: ["btn-cancel-screen-2"] }],
      "Cancel"
    )
  ]
);

renderInApp([dataList(), btnScreenOne()]);
// renderInApp([screenTwoWrap]);

const removeItem = (dataObj, i) => {
  return (dataObj = dataObj.accounts.splice(i, 1));
};

const addActive = () => {
  document.querySelector("li:first-child") &&
    document.querySelector("li:first-child").focus();
};
addActive();

const addBtnScreenOneHandler = q => {
  const btn_1 = document.querySelector(".btn-screen-1");
  btn_1.focus();
  btn_1.addEventListener("keyup", event => {
    switch (event.which) {
      case 37:
        console.log(q);
        q.focus();
    }
  });
};
//    listener
const addListenerFromList = () => {
  const items = document.querySelectorAll("li");
  [].map.call(items, el =>
    el.addEventListener("keyup", event => {
      switch (event.which) {
        case 40:
          console.log("down");
          if (event.target.nextElementSibling) {
            event.target.nextElementSibling.focus();
            // event.target.nextElementSibling.classList.add("active");
            // event.target.classList.remove("active");
          }
          break;
        case 38:
          if (event.target.previousElementSibling) {
            event.target.previousElementSibling.focus();
            // event.target.previousElementSibling.classList.add("active");
            // event.target.classList.remove("active");
          }
          console.log("up");
          break;
        case 37:
          console.log(event.target.innerText, "left");
          console.log(dataRes);
          removeItem(dataRes, event.target.value);
          renderInApp([dataList(), btnScreenOne()]);
          addActive();
          addListenerFromList();
          break;
        case 39:
          addBtnScreenOneHandler(event.target);
          console.log(event.target.innerText, "right");
          break;
      }

      //   console.log(event);
    })
  );
};
addListenerFromList();

// activeElement.addEventListener("keyup", event => {
//   console.log(event.target.nextElementSibling);
//   console.log(event);
//   switch (event.which) {
//     case 40:
//       console.log("down");
//       event.target.nextElementSibling.focus();
//       event.target.nextElementSibling.classList.add("active");
//       break;
//     case 38:
//       event.target.previousElementSibling.focus();
//       event.target.previousElementSibling.classList.add("active");
//       console.log("up");
//       break;
//     case 37:
//       console.log("left");
//       break;
//     case 39:
//       console.log("right");
//       break;
//   }

//   //   console.log(event);
// });
