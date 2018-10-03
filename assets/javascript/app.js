$(document).ready(function() {


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


    $(document).on('click', '#trainSubmit', function(e) {

        trainName = $('#trainNameText').val().trim();
        trainDestination = $('#trainDestinationText').val().trim();
        trainFirstTime = $('#trainFirstTimeText').val().trim();
        trainFrequency = $('#trainFrequecyText').val().trim();

        //convert bullshit

        //will push the new train to the db
        listOfTrains.push({
            dbTrainName: trainName,
            dbTrainDestination: trainDestination,
            dbTrainFirstTime: trainFirstTime,
            dbTrainFrequency: trainFrequency,
            dbMinutesAway: minutesAway,
        });

    })


    listOfTrains.on('child_added', function(snap) {
        var newRow = $('<tr>');

        var newH = $('<th>')
        newH.attr('scope', 'row');


        var trainNamCol = $('<td>');
        trainNamCol.text(snap.val().dbTrainName);
        newH.append(trainNamCol);
        newRow.append(newH);

        $('#trains-list').append(newRow);

        // //train name
        // var trainNameCol = $('<div>');
        // trainNameCol.addClass('col-md-2');
        // var newPName = $('<p>');
        // newPName.text(snap.val().dbTrainName);
        // trainNameCol.append(newPName);
        // newRow.append(trainNameCol);

        // //train destination
        // var trainDestCol = $('<div>');
        // trainDestCol.addClass('col-md-2');
        // var newPDest = $('<p>');
        // newPDest.text(snap.val().dbTrainDestination);
        // trainDestCol.append(newPDest);
        // newRow.append(trainDestCol);

        $('.added-trains').append(newRow);

        // //train frequency
        // var trainFreqCol = $('<div>');
        // trainFreqCol.addClass('col-md-2');
        // var newPFreq = $('<p>');
        // newPFreq.text(snap.val().dbTrainFrequency);
        // trainFreqCol.append(newPFreq);

        // //train next arrival time
        // var trainArrivalTime = $('div');
        // trainArrivalTime.addClass('col-md-2');
        // var newPTime = $('<p>');
        // newPTime.text(snap.val().dbTrainFirstTime);
        // trainArrivalTime.append(newPTime);

        // //train minutes away
        // var trainMinutesAway = $('<div>');
        // trainMinutesAway.addClass('col-md-2');
        // var newPAway = $('<p>');
        // newPAway.text(snap.val().dbMinutesAway);
        // trainMinutesAway.append(newPAway);

        // //append everything to row

        // newRow.append(trainDestCol);
        // newRow.append(trainFreqCol);
        // newRow.append(trainArrivalTime);
        // newRow.append(trainMinutesAway);


    })



})