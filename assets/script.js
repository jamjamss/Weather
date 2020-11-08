$(document).ready(function () {





  $(".fas").on("click", function () {

    let inputValue = $("#inputValue").val()

    let queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputValue + "&units=imperial" + "&appid=4e6f257fdf69fbb203911e5b99972033"

   
    localStorage.setItem("savedSearchs", [inputValue])
    
    let buttonEl = $("<li>")

    let newDiv = $("<div>")

    newDiv.append(buttonEl)

    buttonEl.append(inputValue)

    $("#list").prepend(newDiv)

    

    $.ajax({
      url: queryUrl,
      method: "GET"

    }).then(function (response) {
      console.log(response)
      let imgURL = "http://openweathermap.org/img/w/"
      let currentDate = moment().format('LLLL')
      let city = $(".city").text(response.city.name + " " + currentDate)
      let temprature = $(".temprature").text("Temprature:" + " " + response.list[0].main.temp)
      let humidity = $(".humidity").text("Humidity:" + " " + response.list[0].main.humidity)
      let windSpeed = $(".wind-speed").text("Wind Speed:" + " " + response.list[0].wind.speed + " " + response.list[0].wind.deg)
      let icon = $(".icon").attr("src", imgURL + response.list[0].weather[0].icon + ".png")
      let latitude = response.city.coord.lat
      let longitude = response.city.coord.lon
      let nextDay = 0


      getUV(latitude, longitude)

      $(".forecast").empty()

      for (i = 7; i < response.list.length; i += 8) {
        nextDay++
        $(".forecast").append(`
        <div class="card">
        <h3>${new moment().add(nextDay, "day").format("L")}</h3>
        <img src = "http://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png"/>
        <h4>Temprature: ${response.list[i].main.temp}</h4>
        <h4>Humidity: ${response.list[i].main.humidity}</h4>
        </div>
        `)



      }



    })



  })
  // create an array for savedsearchs
  //save savedsearchs into local storage as an array



  function getUV(lat, lon) {

    let secondQueryURL = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=" + lat + "&lon=" + lon + "&exclude={part}" + "&appid=4e6f257fdf69fbb203911e5b99972033"

    $.ajax({
      url: secondQueryURL,
      method: "GET"
    }).then(function (responseTwo) {

      $(".uv").text("UVI:" + " " + responseTwo.current.uvi)

    })

  }

 



})