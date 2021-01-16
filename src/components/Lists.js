import './Lists.css';

export default function ({ lists }) {
  console.log(typeof lists)
  return (
    <div className="main__lists lists">
      <h3>
        My Lists
      </h3>
      {lists.map((list) => (
        <div key={list.id} className="lists__title">
          {list.title}
        </div>
      ))}
    </div>
  )
}
