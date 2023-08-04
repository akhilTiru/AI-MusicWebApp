leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";
song2 = "";
function preload(){
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600 , 600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelloaded);
    poseNet.on("pose" , gotPoses);
}
function draw() {
    image(video , 0 , 0 , 600 , 600);
    fill("red");
    stroke("red");
    if(scoreLeftWrist > scoreRightWrist){
        circle(leftWristX , leftWristY , 10);
        song2.stop();
        song.play();
    }
    else{
        circle(rightWristX , rightWristY , 10)
        song.stop();
        song2.play();
    }
}
function play(){
    song.play();
}
function stop(){
    song.stop();
}
function modelloaded(){
    console.log("Posenet is initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x is " + leftWristX + " , left wrist y is " + leftWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("The left wrist score = " + scoreLeftWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x is " + rightWristX + " , right wrist y is " + rightWristY);
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log("The right wrist score = " + scoreRightWrist);
        
    }

}