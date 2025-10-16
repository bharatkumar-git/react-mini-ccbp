import {useContext, useState, useEffect} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

import NavBar from '../NavBar'
import AppContext from '../../context/AppContext'

import './index.css'

const Reports = () => {
  const {calenderList, emojisList} = useContext(AppContext)

  const [barSize, setBarSize] = useState(60)

  const [currentMonth, setCurrentMonth] = useState(calenderList[0].month)
  const currentMonthObj = calenderList.find(
    monthItem => monthItem.month === currentMonth,
  )

  // to update emojis count and update emojis list with counts
  let veryHappyCount = 0
  let happyCount = 0
  let neutralCount = 0
  let sadCount = 0
  let verySadCount = 0

  currentMonthObj.dates.forEach(item => {
    switch (item.emojiName) {
      case 'Very Happy':
        veryHappyCount += 1
        break
      case 'Happy':
        happyCount += 1
        break
      case 'Neutral':
        neutralCount += 1
        break
      case 'Sad':
        sadCount += 1
        break
      case 'Very Sad':
        verySadCount += 1
        break
      default:
        break
    }
  })
  const emojisCount = {
    'Very Happy': veryHappyCount,
    Happy: happyCount,
    Neutral: neutralCount,
    Sad: sadCount,
    'Very Sad': verySadCount,
  }

  const updatedEmojisList = emojisList.map(item => ({
    ...item,
    emojiCount: emojisCount[item.emojiName],
  }))

  const CustomTick = ({x, y, payload}) => {
    // payload.value will now be the emojiName
    const emoji = updatedEmojisList.find(
      item => item.emojiName === payload.value,
    )

    return (
      <g transform={`translate(${x},${y})`}>
        <image
          href={emoji?.emojiUrl}
          x={-12}
          y={5}
          height={24}
          width={24}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    )
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBarSize(20)
      } else {
        setBarSize(60)
      }
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <NavBar />
      <div className="reports-second-box">
        <div className="reports-content-box">
          <h3 className="reports-emoji-report-text">Overall Emojis Reports</h3>
          <ul className="reports-emoji-ul-item">
            {updatedEmojisList.map(item => (
              <li key={item.id} className="reports-emoji-li-item">
                <p>{item.emojiName}</p>
                <img src={item.emojiUrl} alt={item.emojiName} />
                <p>{item.emojiCount}</p>
              </li>
            ))}
          </ul>
          <div className="reports-bar-details-box">
            <div className="reports-bar-details-select-box">
              <p style={{margin: '0px'}}>Monthly Reports</p>
              <select
                className="reports-bar-details-select-element"
                value={currentMonth}
                onChange={event => {
                  setCurrentMonth(Number(event.target.value))
                }}
              >
                {calenderList.map(item => (
                  <option
                    className="reports-bar-details-option-element"
                    key={item.month}
                    value={item.month}
                  >
                    {item.monthName}
                  </option>
                ))}
              </select>
            </div>
            <ResponsiveContainer
              className="reports-barChart-box"
              height={300}
              width="100%"
            >
              <BarChart
                className="report-barchart-dimensions"
                data={updatedEmojisList}
              >
                <XAxis dataKey="emojiName" tick={<CustomTick />} />
                <YAxis allowDecimals={false} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar
                  dataKey="emojiCount"
                  fill="#ffbe38"
                  barSize={barSize}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  )
}
export default Reports
