import style from './Header.module.css'
console.log(style)
function Header() {
  return (
    <header className={style.header}>
      <h1>Static Solver</h1>
    </header>
  )
}

export default Header
