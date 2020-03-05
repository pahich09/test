const app = document.getElementById("app");
let data =
  '{"accounts":[{"title":"One Line Item #1","img":"https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"},{"title":"One Line Item #2","img":"https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"},{"title":"One Line Item #3","img":"https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"}]}';
let dataRes = JSON.parse(data);

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
  document.querySelector("li:first-child") &&
    document.querySelector("li:first-child").focus();
};
const showPageOne = () => {
  renderInNode([dataList(), btnWrap()], app);
  selectActivElem();
  addDataListHandler();
  !dataRes.accounts.length ? rerenderBtn() : null;
};
const dataList = () => {
  return createHTMLNode(
    "ul",
    [],
    dataRes.accounts.map((el, i) =>
      createHTMLNode(
        "li",
        [
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
const btnFirstPage = () => {
  return createHTMLNode(
    "button",
    [{ name: "class", value: ["btn-page-one"] }],
    "ADD"
  );
};

const btnWrap = () => {
  return createHTMLNode(
    "div",
    [{ name: "class", value: ["btn-wrap"] }],
    [btnFirstPage()]
  );
};

const rerenderBtn = currentElem => {
  const btnWrap = document.querySelector(".btn-wrap");
  btnWrap.innerHTML = "";
  renderInNode([btnFirstPage()], btnWrap);
  const btn_1 = document.querySelector(".btn-page-one");
  btn_1.focus();
  btn_1.addEventListener("keyup", event => {
    switch (event.which) {
      case 37:
        currentElem.focus();
        break;
      case 13:
        showPageTwo();
    }
  });
};

const addDataListHandler = () => {
  const items = document.querySelectorAll("li");
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
          removeItem(dataRes, event.target.value);
          showPageOne();
          items.length === 1 && rerenderBtn(event.target);
          break;
        case 39:
          rerenderBtn(event.target);
          break;
      }
    })
  );
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
  input.focus();
  const addNewItem = (dataObj, text) => {
    dataObj.accounts.push({
      title: text,
      img:
        "https://image.shutterstock.com/image-photo/image-260nw-1389088238.jpg"
    });
    data = JSON.stringify(dataObj);
  };
  input.addEventListener("keyup", event => {
    if (event.which === 40) {
      if (input.getAttribute("data_prev".replace(/_/, "-")) === "cancel") {
        btnCancel.focus();
      } else if (input.getAttribute("data_prev".replace(/_/, "-")) === "add") {
        btnAdd.focus();
      } else btnAdd.focus();
    }
  });
  btnAdd.addEventListener("keyup", event => {
    switch (event.which) {
      case 38:
        input.focus();
        input.setAttribute("data-prev", "add");
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
    }
  });
  btnCancel.addEventListener("keyup", event => {
    switch (event.which) {
      case 38:
        input.focus();
        input.setAttribute("data-prev", "cancel");
        break;
      case 37:
        btnAdd.focus();
        break;
      case 13:
        input.value = "";
        showPageOne();
    }
  });
};
showPageOne();
