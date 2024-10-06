document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const editValue = prompt("Введите новое значение");
    if (editValue && editValue !== null) {
      edit({ id, editValue }).then(() => {
        console.log(event.target.closest("li").querySelector("li > div"));
        event.target.closest("li").querySelector("li > div").textContent =
          editValue;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function edit({ id, editValue }) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      title: editValue,
    }),
  });
}
