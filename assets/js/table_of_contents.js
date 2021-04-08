function initializeTableOfContents() {
  const tocList = document.getElementsByClassName("toc_list")[0];
  console.log(tocList);

  const sections = document.querySelectorAll("section .header-section");
  console.log(sections);

  let tocId = 0;

  for (const elem of sections) {
    const h2Elem = elem.querySelector("h2");
    console.log(h2Elem);
    if (h2Elem.id === "") {
      h2Elem.id = `tocId${tocId}`;
      tocId++;
    }

    const headerListItem = document.createElement("li");
    headerListItem.innerHTML = `<a href="#${h2Elem.id}">${h2Elem.textContent}</a>`;
    tocList.appendChild(headerListItem);

    const unorderedList = document.createElement("ul");

    const h3Elems = elem.querySelectorAll("h3");
    for (const h3Elem of h3Elems) {
      if (h3Elem.id === "") {
        h3Elem.id = `tocId${tocId}`;
        tocId++;
      }

      const headerListSubItem = document.createElement("li");
      headerListSubItem.innerHTML = `<a href="#${h3Elem.id}">${h3Elem.textContent}</a>`;

      unorderedList.appendChild(headerListSubItem);
    }

    tocList.appendChild(unorderedList);
  }
}
