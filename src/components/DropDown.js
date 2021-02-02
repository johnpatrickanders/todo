import './DropDown.css';

export default function ({ createList }) {

  return (
    <div className="lists__dropdown">
      <button onClick={createList} className="lists__button">Add List</button>
      <div className="lists__dropdown-content">

      </div>
    </div>
  )
}
