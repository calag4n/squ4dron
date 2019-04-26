import React from 'react'
import dateFns from 'date-fns'
import './GlobalCalendar.css'
import base from '../../base'
import { Fireball } from 'grommet-icons'

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    box: null
  }
  componentDidMount() {
    this.getBox()
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    })
  }
  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }
  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    })
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
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
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
    let startDate = dateFns.startOfWeek(this.state.currentMonth)
    for (let i = 1; i < 8; i++) {
      days.push(
        <div className='col col-center' key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className='days row'>{days}</div>
  }

  async getBox() {
    const box = await base.fetch('/users/', { context: this })
    await this.setState({ box })
  }

  badgeThatDay(day) {
    const { box } = this.state
    let whoIsBadging = []

    for (let user in box) {
      if (box[user].dates) {
        box[user].dates.forEach(date => {
          if (dateFns.isEqual(day, date)) {
            whoIsBadging.push({ color: box[user].color, name: [user] })
          }
        })
      }
    }
    const badges = whoIsBadging.map(user => (
      <Fireball color={user.color} userName={user.name} />
    ))

    return badges
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state
    const monthStart = dateFns.startOfMonth(currentMonth)
    const monthEnd = dateFns.endOfMonth(monthStart)
    const startDate = dateFns.startOfWeek(monthStart)
    const endDate = dateFns.endOfWeek(monthEnd)

    const dateFormat = 'D'
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat)
        const cloneDay = day
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? 'disabled'
                : dateFns.isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            {this.badgeThatDay(day)}
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
          </div>
        )
        day = dateFns.addDays(day, 1)
      }
      rows.push(
        <div className='row' key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div className='body'>{rows}</div>
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
