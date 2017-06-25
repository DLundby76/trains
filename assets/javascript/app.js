  $(document).ready(function() {
    Materialize.updateTextFields();
console.log(firebase.app().name)

	function addTrain(train){
		firebase.database().ref("trains").push(train)
	}

	function submitTrain(){
		console.log("working")
		
		var trainName = $("#train-name").val()
		var destination = $("#destination").val()
		var firstTrain = $ ("#first-train-time").val()
		var frequency = $ ("#frequency").val()
		var train ={
			trainName: trainName,
			destination: destination,
			firstTrain:firstTrain,
			frequency:frequency
		}
		$("#train-name").val("")
		$("#destination").val("")
		$ ("#first-train-time").val("")
		$ ("#frequency").val("")
		addTrain(train)

	}
	$("#addTrainForm").on("submit",function (event){
	  	event.preventDefault();
	  	submitTrain()
	  })

	function getData (){
		firebase.database().ref("trains").once("value").then(function(snapshot){

			var data = snapshot.val()
			console.log(data)
			var trains = Object.keys(data)

			for (var i = 0; i < trains.length;i++){
				console.log(trains[i])
				addTrainDataRow(data[trains[i]])
			}
		})
	}

	getData()

	function addTrainDataRow(train){
		var trainData = $("#current-train-data")
		var dataRow = $("<tr>")
		var trainNametd = $("<td>").text(train.trainName)
		var destinationtd = $("<td>").text(train.destination)
		var frequencytd = $("<td>").text(train.frequency)
		var nextArrivaltd =$("<td>")
		var minutesAwaytd = $("<td>")

		dataRow.append(trainNametd)
		dataRow.append(destinationtd)
		dataRow.append(frequencytd)
		trainData.append(dataRow)

	}

	function getNextArrival(){
		var currentTime = new Date()
		var firstTrain = new Date()
		firstTrain.setHours(1)
		firstTrain.setMinutes(1)
		var currentHour = currentTime.getHours()
		var currentMinute = currentTime.getMinutes()
		console.log(currentHour, currentMinute)
	}

	getNextArrival()

  });

