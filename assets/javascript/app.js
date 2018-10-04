$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB5mmRqcyY1poUwMvXWPAoGHZZlzXweF_I",
        authDomain: "train-schedule-125125.firebaseapp.com",
        databaseURL: "https://train-schedule-125125.firebaseio.com",
        projectId: "train-schedule-125125",
        storageBucket: "",
        messagingSenderId: "328066961123"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //create a section for trains in database
    var listOfTrains = database.ref("/list-of-trains");

    var trainName = "";
    var trainDestination = "";
    var trainFirstTime = "";
    var trainFrequency = "";
    var minutesAway = "";


    $(document).on('click', '#trainSubmit', function (e) {

        trainName = $('#trainNameText').val().trim();
        trainDestination = $('#trainDestinationText').val().trim();
        trainFirstTime = $('#trainFirstTimeText').val().trim();
        trainFrequency = $('#trainFrequecyText').val().trim();

        var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % trainFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = trainFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextArival = moment(nextTrain).format("hh:mm a")
        console.log('test:' + nextArival)

        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


        //will push the new train to the db
        listOfTrains.push({
            dbTrainName: trainName,
            dbTrainDestination: trainDestination,
            dbMinAway: tRemainder,
            dbTrainFrequency: trainFrequency,
            dbNextArival: nextArival,
        });

    })


    listOfTrains.on('child_added', function (snap) {
        var newRow = $('<tr>');
        var trainNamCol = $('<td>');
        trainNamCol.attr('scope', 'row');
        trainNamCol.text(snap.val().dbTrainName);


        var trainDestCol = $('<td>');
        trainDestCol.text(snap.val().dbTrainDestination);

        var trainFreqCol = $('<td>');
        trainFreqCol.text(snap.val().dbTrainFrequency);


        var trainArrivalTime = $('<td>');
        trainArrivalTime.text(snap.val().dbNextArival);


        var trainMinutesAway = $('<td>');
        trainMinutesAway.text(snap.val().dbMinAway);

        newRow.append(trainNamCol);
        newRow.append(trainDestCol);
        newRow.append(trainFreqCol);
        newRow.append(trainArrivalTime);
        newRow.append(trainMinutesAway);

        $('#trains-list').append(newRow);
    })



})