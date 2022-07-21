import './Lists.css';

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

  const handleDotsClick = () => {
    deleteList();
  }


  return (
    <div
      listid={list.id}
      key={String(list.id) + String(list.updateDate)}
      onClick={() => grabListInfo(list.id, list.title)}
      // onMouseOver={() => deleteList()}
      className="lists__list">
      <div className='list__title'>
        {list.title}
      </div>
      <div className='list__dot'
        onClick={(e) => handleDotsClick(e)}
      >
        <div className='dot__dash'>-</div>
      </div>
    </div>
  )
}
