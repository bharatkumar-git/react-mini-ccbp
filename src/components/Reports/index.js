import {useContext, useState} from 'react'
import {BarChart, Bar, XAxis, CartesianGrid} from 'recharts'

import NavBar from '../NavBar'
import AppContext from '../../context/AppContext'

import './index.css'

const Reports = () => {
  const {calenderList, emojisList} = useContext(AppContext)

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

  return (
    <>
      <NavBar />
      <div className="reports-second-box">
        <div className="reports-content-box">
          <div className="reports-face-details-box">
            <h1 className="reports-emoji-report-text">
              Overall Emojis Reports
            </h1>
            <p className="reports-emoji-report-text">Overall Emojis Reports</p>
            <ul className="reports-emoji-ul-item">
              {updatedEmojisList.map(item => (
                <li key={item.id} className="reports-emoji-li-item">
                  <p>{item.emojiName}</p>
                  <img src={item.emojiUrl} alt={item.emojiName} width="50px" />
                  <p>{item.emojiCount}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="reports-bar-details-box">
            <div className="reports-bar-details-select-box">
              <p>Monthly Reports</p>
              <select
                value={currentMonth}
                onChange={event => {
                  setCurrentMonth(Number(event.target.value))
                }}
              >
                {calenderList.map(item => (
                  <option key={item.month} value={item.month}>
                    {item.monthName}
                  </option>
                ))}
              </select>
            </div>
            <div className="reports-barChart-box">
              <BarChart width={900} height={300} data={updatedEmojisList}>
                <XAxis dataKey="emojiName" tick={<CustomTick />} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="emojiCount" fill="white" barSize="10%" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Reports
