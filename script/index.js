let data =
  '{"accounts":[{"title":"One Line Item #1","img":"https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"},{"title":"One Line Item #2","img":"https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"},{"title":"One Line Item #3","img":"https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"}]}';
let dataRes = JSON.parse(data);
const app = document.getElementById("app");

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

const renderInNode = (htmlNode, parentNode) => {
  parentNode.innerHTML = "";
  htmlNode.map(el => parentNode.appendChild(el));
};

const removeItem = (dataObj, i) => {
  dataObj.accounts.splice(i, 1);
  data = JSON.stringify(dataObj);
};

const selectActivElem = () => {
  dataRes.accounts.length
    ? document.querySelector("li:first-child").focus()
    : document.querySelector(".btn-page-one").focus();
};

const addNewItem = (dataObj, text) => {
  dataObj.accounts.push({
    title: text,
    img: "https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"
  });
  data = JSON.stringify(dataObj);
};

const renderPageOne = () => {
  return [
    createHTMLNode(
      "ul",
      [],
      dataRes.accounts.map((el, i) =>
        createHTMLNode(
          "li",
          [
            { name: "tabindex", value: ["0"] },
            { name: "data-value", value: [i] }
          ],
          [
            createHTMLNode("img", [{ name: "src", value: [el.img] }], null),
            createHTMLNode("div", [], el.title)
          ]
        )
      )
    ),
    createHTMLNode(
      "div",
      [{ name: "class", value: ["btn-wrap"] }],
      [
        createHTMLNode(
          "button",
          [{ name: "class", value: ["btn-page-one"] }],
          "ADD"
        )
      ]
    )
  ];
};

const addDataListHandler = () => {
  const items = document.querySelectorAll("li");
  const btn_1 = document.querySelector(".btn-page-one");
  let tempElement;
  btn_1.addEventListener("keyup", event => {
    switch (event.which) {
      case 37:
        tempElement.focus();
        break;
      case 13:
        showPageTwo();
        break;
    }
  });
  [].forEach.call(items, el =>
    el.addEventListener("keyup", event => {
      switch (event.which) {
        case 40:
          if (event.target.nextElementSibling) {
            event.target.nextElementSibling.focus();
          }
          break;
        case 38:
          if (event.target.previousElementSibling) {
            event.target.previousElementSibling.focus();
          }
          break;
        case 37:
          removeItem(dataRes, +event.target.getAttribute("data-value"));
          showPageOne();
          break;
        case 39:
          btn_1.focus();
          tempElement = event.target;
          break;
      }
    })
  );
};

const showPageOne = () => {
  renderInNode(renderPageOne(), app);
  addDataListHandler();
  selectActivElem();
};

const renderPageTwo = () => {
  return createHTMLNode(
    "div",
    [{ name: "class", value: ["screen-wrap"] }],
    [
      createHTMLNode("input", [{ name: "type", value: ["text"] }], null),
      createHTMLNode("button", [{ name: "class", value: ["btn-add"] }], "ADD"),
      createHTMLNode(
        "button",
        [{ name: "class", value: ["btn-cancel"] }],
        "Cancel"
      )
    ]
  );
};

const showPageTwo = () => {
  renderInNode([renderPageTwo()], app);
  const input = document.querySelector("input");
  const btnAdd = document.querySelector(".btn-add");
  const btnCancel = document.querySelector(".btn-cancel");
  let temp;
  input.focus();

  input.addEventListener("keyup", event => {
    if (event.which === 40) {
      temp ? temp.focus() : btnAdd.focus();
    }
  });
  btnAdd.addEventListener("keyup", event => {
    switch (event.which) {
      case 38:
        input.focus();
        temp = event.target;
        break;
      case 39:
        btnCancel.focus();
        break;
      case 13:
        if (input.value) {
          addNewItem(dataRes, input.value);
          input.value = "";
          showPageOne();
        }
        input.placeholder = "Please enter text";
        break;
    }
  });
  btnCancel.addEventListener("keyup", event => {
    switch (event.which) {
      case 38:
        input.focus();
        temp = event.target;
        break;
      case 37:
        btnAdd.focus();
        break;
      case 13:
        input.value = "";
        showPageOne();
        break;
    }
  });
};
showPageOne();
