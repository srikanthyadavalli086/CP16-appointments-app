import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isStarActive: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onAddButton = () => {
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickStar = () => {
    const {isStarActive} = this.state

    this.setState({
      isStarActive: !isStarActive,
    })
  }

  getFilteredStarredAppointments = () => {
    const {appointmentsList, isStarActive} = this.state

    if (isStarActive === true) {
      return appointmentsList.filter(each => each.isStarred === true)
    }

    return appointmentsList
  }

  render() {
    const {title, date, isStarActive} = this.state

    const starredButtonClassName = isStarActive
      ? 'star-active'
      : 'star-not-active'

    const listOfItems = this.getFilteredStarredAppointments()
    return (
      <div className="bg-container">
        <div className="container">
          <div className="top-container">
            <div>
              <h1>Add Appointment</h1>
              <form className="form-container" onSubmit={this.onAddButton}>
                <label htmlFor="title">TITLE</label>
                <input
                  id="title"
                  onChange={this.onChangeTitle}
                  value={title}
                  type="search"
                  placeholder="Title"
                />
                <label htmlFor="date">DATE</label>
                <input
                  id="date"
                  onChange={this.onChangeDate}
                  value={date}
                  type="date"
                />
                <button className="button" type="submit" data-testid="star">
                  Add
                </button>
              </form>
            </div>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />

          <div className="bottom-first-section">
            <h1>Appointments</h1>
            <button
              className={starredButtonClassName}
              onClick={this.onClickStar}
              type="button"
            >
              Starred
            </button>
          </div>

          <ul>
            {listOfItems.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                uniqueKey={eachAppointment.id}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
