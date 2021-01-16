import './Lists.css';

export default function ({ lists }) {

  return (
    <div className="main__lists lists">
      <h3>
        My Lists
      </h3>
      {lists.map((list) => (
        <div className="lists__title">
          {list.title}
        </div>
      ))}
    </div>
  )
}
