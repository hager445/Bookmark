const validationSection = document.getElementById("validation-section");
// call inputs :
const nameInput = document.getElementById("siteName");
const urlInput = document.getElementById("siteUrl");
const submitBtn = document.getElementById("submitBtn");
// call table :
const tbody = document.getElementById("tbody");
let favouriteSiteList = [];
if (favouriteSiteList) {
  // حتى لو array  فضيت بعد التحميل بنملاها بالمعلومات اللي اتخزنت قبل التحميل من localstorage
  favouriteSiteList = JSON.parse(localStorage.getItem("site"));
}
function createWebsiteUrl() {
  const name = nameInput.value;
  const url = urlInput.value;
  let favouriteSite = {
    siteName: name,
    siteUrl: url,
  };
  //   بيزود عالقديم
  if (validation()) {
    return;
  } else {
    favouriteSiteList.push(favouriteSite);
    //   because the key in same name so that it does update by the new value
    localStorage.setItem("site", JSON.stringify(favouriteSiteList));
    console.log(favouriteSiteList);

    showUrlInTable();
    clear();
  }
}
function showUrlInTable() {
  tbody.innerHTML = "";
  for (let i = 0; i < favouriteSiteList.length; i++) {
    tbody.innerHTML += `   <tr>
              <td scope="row">${i + 1}</td>
              <td id="siteTableName">${favouriteSiteList[i].siteName}</td>
              <td>
                <button
                  class="btn btn-green px-3"
                  type="button"
                  id="siteTableVisit"
                >
                  <a href="${
                    favouriteSiteList[i].siteUrl
                  }" target="_blank" id="siteTableVisitLink">
                    <i class="fa-solid fa-eye me-2"></i> Visit</a
                  >
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger px-3"
                  type="button"
                  id="siteTableDelete"
                  onClick='deleteUrl(${i})'
                >
                  <i class="fa-solid fa-trash me-2"></i> Delete
                </button>
              </td>
            </tr>`;
  }
}
showUrlInTable();
function clear() {
  nameInput.value = "";
  urlInput.value = "";
  urlInput.classList.remove("is-invalid");
  urlInput.classList.remove("is-valid");
  nameInput.classList.remove("is-invalid");
  nameInput.classList.remove("is-valid");
}
function deleteUrl(index) {
  favouriteSiteList.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(favouriteSiteList));
  showUrlInTable();
}

// when click on x :
function hideValidation() {
  validationSection.style.display = "none";
}
// validation :
function validation() {
  let notValid;
  const namePattern = /\w{3,}/g;
  const urlPattern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  const name = nameInput.value;
  const url = urlInput.value;
  console.log(url);
  if (!urlPattern.test(url) || !namePattern.test(name)) {
    validationSection.style.display = "flex";
    notValid = true;
  }
  return notValid;
}
nameInput.addEventListener("input", () => {
  const namePattern = /\w{3,}/g;

  const name = nameInput.value;

  if (!namePattern.test(name)) {
    nameInput.classList.add("is-invalid");
  } else {
    nameInput.classList.replace("is-invalid", "is-valid");
  }
});
urlInput.addEventListener("input", () => {
  const urlPattern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

  const url = urlInput.value;

  if (!urlPattern.test(url)) {
    urlInput.classList.add("is-invalid");
  } else {
    urlInput.classList.replace("is-invalid", "is-valid");
  }
});
