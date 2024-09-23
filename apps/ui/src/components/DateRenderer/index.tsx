import moment from 'moment'
import TypographySecondary from 'components/Typography/Secondary'

type CellProps = {
  value: any
}

const DateRenderer: React.FC<CellProps> = ({ value }) => {
  let content = null

  if (value === null) {
    const currentTime = moment().fromNow()
    content = <TypographySecondary value={currentTime} size={'small'} />
  } else {
    const formattedDate = moment(value).fromNow()
    content = <span>{formattedDate}</span>
  }

  return content
}

export default DateRenderer
