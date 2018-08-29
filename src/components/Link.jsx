const Link = ({ to, text }) => (
    <a
        href=""
        onClick={(e) => {
            document.location.hash = `/${to}`
            e.preventDefault()
        }}>{text}</a>
)

export default Link
