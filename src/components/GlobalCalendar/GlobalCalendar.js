import React from 'react'
import {
  subMonths,
  addMonths,
  isEqual,
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parse,
} from 'date-fns'
import './GlobalCalendar.css'
import { Fireball } from 'grommet-icons'
import base from '../../../base'
import CardsList from './CardsList.js'

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    box: null,
    profilLayer: undefined,
    options: { weekStartsOn: 1 },
  }

  componentDidMount() {
    this.getBox()
  }

  onDateClick = day => {
    const profilLayer = this.whoIsThere(day)
    this.setState({
      selectedDate: day,
      profilLayer,
    })
  }

  async getBox() {
    const box = await base.fetch('/users/', { context: this })
    await this.setState({ box })
  }

  prevMonth = () => {
    this.setState(prevState => ({
      currentMonth: subMonths(prevState, 1),
    }))
  }

  nextMonth = () => {
    this.setState(prevState => ({
      currentMonth: addMonths(prevState, 1),
    }))
  }

  whoIsThere = day => {
    const { box } = this.state
    const whoIsThere = []

    // eslint-disable-next-line no-restricted-syntax
    for (const user in box) {
      if (box[user].dates) {
        box[user].dates.forEach(date => {
          if (isEqual(day, date)) {
            whoIsThere.push({ color: box[user].color, name: [user] })
          }
        })
      }
    }

    return whoIsThere
  }

  badgeThatDay(day) {
    const whoIsThere = this.whoIsThere(day)

    const badges = whoIsThere.map(user => (
      <Fireball key={user.name} color={user.color} userName={user.name} />
    ))

    return badges
  }

  renderHeader() {
    const dateFormat = 'MMMM YYYY'

    return (
      <div className='header row flex-middle'>
        <div className='col col-start'>
          <div className='icon' onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className='col col-center'>
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className='col col-end' onClick={this.nextMonth}>
          <div className='icon'>chevron_right</div>
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = 'dddd'
    const days = []
    const startDate = startOfWeek(this.state.currentMonth)
    for (let i = 1; i < 8; i++) {
      days.push(
        <div className='col col-center' key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      )
    }
    return <div className='days row'>{days}</div>
  }

  renderCells() {
    const { currentMonth, selectedDate, options } = this.state
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, options)
    const endDate = endOfWeek(monthEnd, options)

    const dateFormat = 'D'
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const cloneDay = day

        let addClass = ''

        if (!isSameMonth(day, monthStart)) {
          addClass = 'disabled'
        } else if (isSameDay(day, selectedDate)) {
          addClass = 'selected'
        }

        days.push(
          <div
            className={`col cell ${addClass}`}
            key={day}
            onClick={() => this.onDateClick(parse(cloneDay))}
          >
            {this.badgeThatDay(day)}
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
          </div>,
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className='row' key={day}>
          {days}
        </div>,
      )
      days = []
    }
    return (
      <div className='body'>
        {rows}
        {this.state.profilLayer ? (
          <CardsList
            isThere={this.state.profilLayer}
            onClose={() => this.setState({ profilLayer: undefined })}
          />
        ) : null}
      </div>
    )
  }

  render() {
    return (
      <div className='calendar'>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    )
  }
}

export default Calendar
