/* eslint-disable */

import moment from 'moment'
import { method } from './methods'

export const output = {
  currentItems: function (city) {
    // console.log(city)
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
    // console.log(localDate)

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
  dailyItems: function (dforecast) {
    // console.log(dforecast);
    const weekforese = dforecast.data

    let output = ''
    weekforese.forEach((day) => {
      let stg = day.icon
      let summary = stg.replace(/-|day/gi, (x) => (x = ' ')).trim()
      // console.log(summary);
      output += `
        <div class="eachDay selector">
        <i class="hiddentime noClick"> ${day.time}</i>
        <div class="noClick">${moment(moment.unix(day.time)).format(
          'Do MMM'
        )}</div>
        <i class="${method.calcWeatherIcon(
          summary,
          1585731600,
          2
        )} day-weather-icon"></i>
        <div class="daily-temp-wrapper noClick">
            <i class="day-temp-value">${Math.round(day.temperatureHigh)}</i>
            <i class="day-temp-symb">°</i>
        </div>
        <div class="noClick daily-summary">${
          summary[0].toUpperCase() + summary.slice(1)
        }</div>
    </div>
        `
    })

    document.querySelector('.daily-items-container').innerHTML = output
  },
  hourlyItems: function (hforecast) {
    const offset = hforecast.offset
    const dailyForecast = hforecast.hourly.data
    // console.log(dailyForecast)

    // const hourlyDate = document.querySelector(".hourly-date")
    // hourlyDate.innerText =  `${moment(moment.unix(time)).utc().utcOffset(offset).format('Do MMMM')}`;
    let output = ''

    for (let i = 0; i < dailyForecast.length; i++) {
      const { time, summary, temperature } = dailyForecast[i]
      // console.log(time);
      output += `
                <div class="eachHour">
                  <div>${moment(moment.unix(time))
                    .utc()
                    .utcOffset(offset)
                    .format('LT')}</div>
                  <i class="${method.calcWeatherIcon(
                    summary,
                    time,
                    offset
                  )} hour-weather-icon"> </i>

                  <div class="hourly-temp-wrapper">
                    <i class="hour-temp-value">${Math.round(temperature)}</i>
                    <i class="hour-temp-symb">°</i>
                  </div>

                  <div class="daily-summary">${summary}</div>

              </div>
              `
    }

    let thhh = (document.querySelector(
      '.hourly-items-container'
    ).innerHTML = output)
    // console.log(dailyForecast);
  },
  detailsItems: function (ddatails) {
    const offset = ddatails.offset

    // console.log(ddatails)
    const { temperature } = ddatails.currently

    console.log(ddatails.daily.data[0])

    const {
      sunriseTime,
      sunsetTime,
      temperatureHigh,
      temperatureHighTime,
      temperatureLow,
      temperatureLowTime,
      precipIntensity,
      precipIntensityMax,
      precipProbability,
      uvIndex,
      apparentTemperatureHigh,
      humidity,
      visibility,
      windSpeed,
      windBearing,
      windGust,
      windGustTime,
    } = ddatails.daily.data[0]

    // side b
    console.log(windGust)
    /////////////////SUNSET////////////////////////////
    const timesunrise = document.querySelector('.timesunrise')
    timesunrise.innerText = `${moment(moment.unix(sunriseTime))
      .utc()
      .utcOffset(offset)
      .format('LT')}`

    const timesunset = document.querySelector('.timesunset')
    timesunset.innerText = `${moment(moment.unix(sunsetTime))
      .utc()
      .utcOffset(offset)
      .format('LT')}   `

    /////////////////SUNSET////////////////////////////

    // side a-1
    const highestTemp = document.querySelector('.HighestTemp')
    highestTemp.innerText = `${Math.round(temperatureHigh)}`

    const highestTempTime = document.querySelector('.highestemp-time')
    highestTempTime.innerText = `${moment(moment.unix(temperatureHighTime))
      .utc()
      .utcOffset(offset)
      .format('LT')}`

    // const nowTemperature = document.querySelector('.Nowtemperature')
    // nowTemperature.innerText = `${Math.round(temperature)}`

    const LowestTemp = document.querySelector('.LowestTemp')
    LowestTemp.innerText = `${Math.round(temperatureLow)}`

    const lowestTempTime = document.querySelector('.LowestTempTime')
    lowestTempTime.innerText = `${moment(moment.unix(temperatureLowTime))
      .utc()
      .utcOffset(offset)
      .format('LT')}`

    /////////////////////////////////////////////////////////

    // side a-2
    const precipint = document.querySelector('.precipint')
    precipint.innerText = `${precipIntensity}`

    // const precipMax = document.querySelector('.precipMax')
    // precipMax.innerText = `${precipIntensityMax}`

    const precipPro = document.querySelector('.precipPro')
    precipPro.innerText = `${precipProbability}`

    // const UVIndex = document.querySelector('.UVIndex')
    // UVIndex.innerText = `${uvIndex}`

    //side c-1
    /////////////////////////////////////////////////////////

    const feelsLike = document.querySelector('.feelsLike')
    feelsLike.innerText = `${Math.round(apparentTemperatureHigh)}`

    // const detailHumidity = document.querySelector('.detail-humidity')
    // detailHumidity.innerText = `${humidity * 100}`

    const detailVisibility = document.querySelector('.detail-visibility')
    detailVisibility.innerText = `${Math.round(visibility)}`

    // const UIndex = document.querySelector('.UV-Index')
    // UIndex.innerText = `${uvIndex}`

    // side c-2
    /////////////////////////////////////////////////////////

    const detailWindSpeed = document.querySelector('.detail-windSpeed')
    detailWindSpeed.innerText = `${Math.round(windSpeed)}`

    // const detailwindBearing = document.querySelector('.detail-windBearing')
    // detailwindBearing.innerText = `${windBearing}`

    const detailWindGust = document.querySelector('.windGust')
    detailWindGust.innerText = `${windGust}`
    console.log(windGust)

    const detailWindGustTime = document.querySelector('.windGustTime')
    detailWindGustTime.innerText = `${moment(moment.unix(windGustTime))
      .utc()
      .utcOffset(offset)
      .format('LT')}`
  },
}
