import {useContext, useState} from 'react'
import {FaLessThan, FaGreaterThan} from 'react-icons/fa'

import AppContext from '../../context/AppContext'
import NavBar from '../NavBar'

import './index.css'

const Home = () => {
  // eslint-disable-next-line
  const {calenderList, emojisList, setCalenderList, daysList} = useContext(
    AppContext,
  )

  const [activeMonthId, setActiveMonthId] = useState(calenderList[0].month)
  const activeMonth = calenderList.find(
    monthItem => monthItem.month === activeMonthId,
  )
  const [selectedEmojiId, setSelectedEmojiId] = useState(emojisList[0].id)
  const selectedEmoji = emojisList.find(
    emojiItem => emojiItem.id === selectedEmojiId,
  )
  const [countSelectedEmojiId, setCountSelectedEmojiId] = useState(
    emojisList[0].id,
  )
  const countSelectedEmojiObj = emojisList.find(
    item => item.id === countSelectedEmojiId,
  )
  const [countSelectedDayId, setCountSelectedDayId] = useState(daysList[0].id)
  const countSelectedDayObj = daysList.find(
    dayItem => dayItem.id === countSelectedDayId,
  )
  const firstDay = new Date(2025, activeMonth.month - 1, 1).getDay()
  const daysInMonth = new Date(2025, activeMonth.month, 0).getDate()

  // calender handlers
  const nextMonthIconHandler = () => {
    setActiveMonthId(prevMonth => {
      if (prevMonth < 12) {
        return prevMonth + 1
      }
      return prevMonth
    })
  }
  const prevMonthIconHandler = () => {
    setActiveMonthId(prevMonth => {
      if (prevMonth > 1) {
        return prevMonth - 1
      }
      return prevMonth
    })
  }
  const homeCalenderDateEmojiHandler = dateId => {
    setCalenderList(prev =>
      prev.map(monthItem => {
        if (monthItem.month === activeMonth.month) {
          return {
            ...monthItem,
            dates: monthItem.dates.map(dateItem => {
              if (dateItem.id === dateId) {
                if (dateItem.emojiUrl === selectedEmoji.emojiUrl) {
                  return {...dateItem, emojiUrl: '', emojiName: ''}
                }
                return {
                  ...dateItem,
                  emojiUrl: selectedEmoji.emojiUrl,
                  emojiName: selectedEmoji.emojiName,
                }
              }
              return dateItem
            }),
          }
        }
        return monthItem
      }),
    )
  }
  // rendering the calender
  const renderCalender = () => (
    <div style={{height: '100%'}}>
      <div className="home-calender-monthName-box">
        <button
          aria-label="less than icon"
          className="home-calender-next-prev-button"
          type="button"
          onClick={prevMonthIconHandler}
          data-testid="previous-button"
        >
          <FaLessThan />
        </button>
        <h2 className="home-calender-month-text">{activeMonth.monthName}</h2>
        <button
          aria-label="greater than icon"
          className="home-calender-next-prev-button"
          type="button"
          onClick={nextMonthIconHandler}
          data-testid="next-button"
        >
          <FaGreaterThan />
        </button>
      </div>
      <ul className="ul-paddingLeft-zero">
        {daysList.map(item => (
          <li className="home-calender-dayName-li-item" key={item.id}>
            <p>{item.day}</p>
          </li>
        ))}
      </ul>
      <ul className="ul-paddingLeft-zero home-calender-dates-ul-box">
        {[...Array(firstDay).keys()].map(item => (
          <li key={item} className="home-calender-dates-li-item" />
        ))}
        {activeMonth.dates.map((item, index) => {
          if (index < daysInMonth) {
            return (
              <li className="home-calender-dates-li-item" key={item.id}>
                <button
                  onClick={() => {
                    homeCalenderDateEmojiHandler(item.id)
                  }}
                  className="home-calender-dates-li-button"
                  type="button"
                >
                  <p>{item.date}</p>
                  {item.emojiUrl.length === 0 ? (
                    ''
                  ) : (
                    <img
                      src={item.emojiUrl}
                      alt={item.date}
                      className="home-calender-dates-emoji"
                    />
                  )}
                </button>
              </li>
            )
          }
          return null
        })}
      </ul>
    </div>
  )

  // rendering the emoji's list
  const renderEmojiBox = () => (
    <ul className="home-emojiBox-ul-box">
      {emojisList.map(item => {
        const selectedEmojiClassName =
          item.id === selectedEmojiId
            ? 'home-emojiBox-selectedEmoji'
            : 'home-emojiBox-emoji'
        return (
          <li className="home-emojiBox-li-item" key={item.id}>
            <button
              onClick={() => {
                setSelectedEmojiId(item.id)
              }}
              type="button"
              className="background-transparent-button"
            >
              <p className="home-emojiBox-text">{item.emojiName}</p>
              <img
                src={item.emojiUrl}
                alt={item.emojiName}
                className={selectedEmojiClassName}
              />
            </button>
          </li>
        )
      })}
    </ul>
  )

  // rendering count box
  const returnDayEmojiCount = () => {
    let count = 0
    activeMonth.dates.forEach(item => {
      if (
        new Date(2025, activeMonth.month - 1, Number(item.date))
          .toLocaleDateString('en-US', {weekday: 'short'})
          .toLowerCase() === countSelectedDayObj.day.toLowerCase()
      ) {
        if (item.emojiName) {
          if (item.emojiName === countSelectedEmojiObj.emojiName) {
            count += 1
          }
        }
      }
    })
    return count
  }
  // const returnDayEmojiCount = () => {
  //   let count = 0
  //   activeMonth.dates.forEach(item => {
  //     const dayNum = parseInt(item.date)
  //     if (
  //       dayNum % 7 === parseInt(countSelectedDayObj.dayNumber) && // like in class version
  //       item.emojiName === countSelectedEmojiObj.emojiName
  //     ) {
  //       count += 1
  //     }
  //   })
  //   return count
  // }

  const renderCountBox = () => {
    const renderCount = returnDayEmojiCount()
    return (
      <div className="home-countBox-main-box">
        <div className="home-countBox-content-box">
          <div className="home-countBox-content-select-box">
            <select
              value={countSelectedEmojiId}
              className="home-countBox-select-item"
              onChange={event => {
                setCountSelectedEmojiId(event.target.value)
              }}
            >
              {emojisList.map(emojiItem => (
                <option key={emojiItem.id} value={emojiItem.id}>
                  {emojiItem.emojiName}
                </option>
              ))}
            </select>
            <select
              value={countSelectedDayId}
              className="home-countBox-select-item"
              onChange={event => {
                setCountSelectedDayId(event.target.value)
              }}
            >
              {daysList.map(dayItem => (
                <option key={dayItem.id} value={dayItem.id}>
                  {dayItem.day}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1 className="home-countBox-count-heading">{`0${renderCount}`}</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <NavBar />
      <div className="home-second-box">
        <h1 className="home-moods-heading">Moods in a Month</h1>
        <div className="home-flex-center-box">
          <div className="home-content-box">
            <div className="home-calender-box">{renderCalender()}</div>
            <div className="home-emoji-count-box">
              <div className="home-emoji-box">{renderEmojiBox()}</div>
              <div className="home-count-box">{renderCountBox()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
