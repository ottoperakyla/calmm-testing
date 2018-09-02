import Link from './Link.jsx'

const Dropdown = ({ items, text, parentId, onClick, active }) => (
  <li onClick={onClick}>{text}
    {U.ift(U.equals(active, text.toLowerCase()), 
    <ul className="dropdown no-spacing">
      {U.map(({ id, title }) => 
        <li key={id}><Link to={`${parentId}/${id}`} text={title} /></li>, 
        items
      )}
    </ul>
    )}
  </li>
)

export default Dropdown
 