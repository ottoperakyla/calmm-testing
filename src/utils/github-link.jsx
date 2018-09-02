import axios from 'axios'

const GithubLink = ({ path, description }) => {
  const basePath = 'https://raw.githubusercontent.com/ottoperakyla/calmm-testing/master/src/views/'
  const fullPath = `${basePath}${path}`

  const loc = Kefir.fromPromise(axios.get(fullPath))
    .map(R.prop('data'))
    .map(R.split('\n'))
    .map(R.prop('length'))
    
  const convertRawUrl = fullPath =>
    fullPath.replace(
      'https://raw.githubusercontent.com/ottoperakyla/calmm-testing/', 
      'https://github.com/ottoperakyla/calmm-testing/blob/'
    )

  return (
    <div>
      This component is {loc} lines of code.<br/>
      <a href={convertRawUrl(fullPath)} target="_blank">Open in github</a>
      {description && <div dangerouslySetInnerHTML={{__html: description}}></div>}
    </div>
  )
}

export default GithubLink