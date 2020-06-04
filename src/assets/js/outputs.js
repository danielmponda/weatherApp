import moment from 'moment'
import { method } from './methods'

export const output = {
  currentItems: function (city) {
    console.log(city)
    const {
      temperature,
      summary,
      time,
      humidity,
      visibility,
      windSpeed,
      pressure,
      apparentTemperature,
      dewPoint,
    } = city.currently

    let offset = city.offset

    let localDateNote = document.querySelectorAll('.date')
    let localDate = Array.from(localDateNote)
    console.log(localDate)

    localDate[0].innerText = `${moment(moment.unix(time))
      .utc()
      .utcOffset(offset)
      .format('dddd, Do MMMM YYYY')}`

    localDate[1].innerText = `${moment(moment.unix(time))
      .utc()
      .utcOffset(offset)
      .format('dddd, Do MMMM YYYY')}`

    let localTimeNode = document.querySelectorAll('.time')
    let localTime = Array.from(localTimeNode)

    localTime[0].innerText = `${moment(moment.unix(time))
      .utc()
      .utcOffset(offset)
      .format('LTS')}`

    localTime[1].innerText = `${moment(moment.unix(time))
      .utc()
      .utcOffset(offset)
      .format('LTS')}`

    let weatherMoreInfoNode = document.querySelectorAll('.weather-more-info')
    let weatherMoreInfo = Array.from(weatherMoreInfoNode)

    weatherMoreInfo[0].innerHTML = `
    <div class="first-info">
    <div >  <i class="fas fa-thermometer-three-quarters colour" ></i> Feels Like: <b class="humidity">${Math.round(
      apparentTemperature
    )}</b> °</div>
</div>
              <div class="first-info">
              <div >  <i class="fas fa-tint colour" ></i> Humidity: <b class="humidity">${Math.round(
                humidity * 100
              )}</b> % </div>
              <div >   <i class="fas fa-meteor colour"> </i>Pressure: <b class="pressure">${Math.round(
                pressure
              )}</b>mb  </div>
          </div>
          <div class="second-info">
          <div > <i class="fas fa-wind colour"></i> Wind Spend:  <b class="windSpend">${Math.round(
            windSpeed
          )} </b>  mph</div>
              <div >   <i class="fas fa-water colour"></i> Visibility: <b class="visibility">${visibility}</b>mi   </div>
          </div>
          <div class="second-info">
          <div >  <i class="fas fa-thermometer-empty colour"></i> dewPoint: <b class="visibility">${Math.round(
            dewPoint
          )}</b>°</div>
      </div>
    `

    weatherMoreInfo[1].innerHTML = `
    <div class="first-info">
    <div >  <i class="fas fa-thermometer-three-quarters colour" ></i> Feels Like: <b class="humidity">${Math.round(
      apparentTemperature
    )}</b> °</div>
</div>
              <div class="first-info">
              <div >  <i class="fas fa-tint colour" ></i> Humidity: <b class="humidity">${Math.round(
                humidity * 100
              )}</b> % </div>
              <div >   <i class="fas fa-meteor colour"> </i>Pressure: <b class="pressure">${Math.round(
                pressure
              )}</b>mb  </div>
          </div>
          <div class="second-info">
          <div > <i class="fas fa-wind colour"></i> Wind Spend:  <b class="windSpend">${Math.round(
            windSpeed
          )} </b>  mph</div>
              <div >   <i class="fas fa-water colour"></i> Visibility: <b class="visibility">${visibility}</b>mi   </div>
          </div>
          <div class="second-info">
          <div >  <i class="fas fa-thermometer-empty colour"></i> dewPoint: <b class="visibility">${Math.round(
            dewPoint
          )}</b>°</div>
      </div>
    `

    method.animateValue('.temp-value', 100, Math.round(temperature), 1000)

    let weatherNode = document.querySelectorAll('.weather-desc')

    let weather = Array.from(weatherNode)

    weather[0].innerHTML = summary
    weather[1].innerHTML = summary

    method.tempWeatherIcon(summary, time, offset)
  },
}
