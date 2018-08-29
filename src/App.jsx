import { fromKefir } from 'karet'
import Link from 'components/Link.jsx'
import Dropdown from 'components/Dropdown.jsx'
import Games from 'views/games/index.jsx'
import Components from 'views/components/index.jsx'

const views = {
  games: Games,
  components: Components
}

const Start = () => (
    <div>
        <p>Hello! This is homepage.</p>
        <Link to="example0" />
    </div>
)

const gamesLinks = [
  {id: 'tic-tac-toe', title: 'Tic tac toe'},
  {id: 'solitaire', title: 'Solitaire'},
  {id: 'blackjack', title: 'Blackjack'}
]
const componentsLinks = [
  {id: 'todo-list', title: 'Todo List'},
  {id: 'calendar', title: 'Calendar'},
  {id: 'count-down', title: 'Countdown'},
]

const Header = ({ setActive, activeDropdown }) => {
  return (
    <header>
      <h1>Otto's homepage</h1>
      <ul className="nav no-spacing">
        <li><Link to="" text="Home" /></li>
        <Dropdown onClick={(e) => setActive(e, 'games')} active={activeDropdown} items={gamesLinks} text="Games" parentId="games" />
        <Dropdown onClick={(e) => setActive(e, 'components')} active={activeDropdown} items={componentsLinks} text="Components" parentId="components" />
      </ul>
    </header>
  )
}

const Footer = () => (
  <div className="space-s space-clear-rl">
    <h3 className="space-xs space-clear-rl">Contact</h3>
    <ul className="no-spacing">
      <li>Email: <a href="mailto:otto.perakyla@gmail.com">otto.perakyla@gmail.com</a></li>
      <li>Github: <a href="https://github.com/ottoperakyla">ottoperakyla</a></li>
    </ul>
  </div>
)

const route = Kefir
    .constant()
    .merge(Kefir.fromEvents(window, 'hashchange'))
    .map(() => {
        // const hash = window.location.hash.replace('#/', '')
        const hashParts = location.hash.split('/').slice(1)
        const view = hashParts[0]
        const subView = hashParts[1]

        const Component = views[view] || Start
        
        const activeDropdown = U.atom('')

        const setActive = (e, dropdown) => {
          e.stopPropagation()
          activeDropdown.set(dropdown)
        }      
        
        return (
          <div className="container-fluid" onClick={e => setActive(e, '')}>
            <div className="container"> 
              <Header activeDropdown={activeDropdown} setActive={setActive} />
              <Component subView={subView} />
              <Footer />
            </div>
          </div>
        )
    })

const App = () => fromKefir(route)

export default App
