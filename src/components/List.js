

export default function List({ list, grabListInfo }) {

  return (
    <div
      listid={list.id}
      key={String(list.id) + String(list.updateDate)}
      onClick={() => grabListInfo(list.id, list.title)}
      onMouseOver={() => console.log("over")}
      className="lists__title">
      {list.title}

    </div>
  )
}
