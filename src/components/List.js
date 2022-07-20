

export default function List({ list, grabListInfo, setLiveLists, liveLists }) {

  const deleteList = async () => {
    console.log(liveLists)
    const res = await fetch(`/list/${list.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      setLiveLists(
        liveLists.filter(displayedList => displayedList.id !== list.id)
      )
    };
  }

  return (
    <div
      listid={list.id}
      key={String(list.id) + String(list.updateDate)}
      onClick={() => grabListInfo(list.id, list.title)}
      onMouseOver={() => deleteList()}
      className="lists__title">
      {list.title}

    </div>
  )
}
