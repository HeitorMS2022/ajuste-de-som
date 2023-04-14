var scoreD = 0;
var scoreE = 0;
var pulsoEX = 0;
var pulsoEY = 0;
var pulsoDX = 0;
var pulsoDY = 0;
var som = "";
function preload(){
    som = loadSound("music.mp3");
}
function draw(){
    image(video, 0, 0, 650, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if (scoreE > 0.2){
        circle(pulsoEX, pulsoEY, 20);
        var positionEY = Number(pulsoEY);
        variavel = floor(positionEY);
        volume = variavel/500;
        som.setVolume(volume);
        document.getElementById("volume-do-som").innerHTML = "Volume: " + volume;
    }
    if (pulsoDY >= 0 && pulsoDY < 100){
        som.rate(0.5);
        document.getElementById("velocidade-do-som").innerHTML = "Velocidade: 0.5";
    }
    else if(pulsoDY >= 101 && pulsoDY < 200){
        som.rate(1);
        document.getElementById("velocidade-do-som").innerHTML = "Velocidade: 1";
    }
    else if(pulsoDY >= 201 && pulsoDY < 300){
        som.rate(1.5);
        document.getElementById("velocidade-do-som").innerHTML = "Velocidade: 1.5";
    }
    else if(pulsoDY >= 301 && pulsoDY < 400){
        som.rate(2);
        document.getElementById("velocidade-do-som").innerHTML = "Velocidade: 2";
    }
    else if(pulsoDY >= 401 && pulsoDY < 500){
        som.rate(2.5);
        document.getElementById("velocidade-do-som").innerHTML = "Velocidade: 2.5";
    }
}
function setup(){
    canvas = createCanvas(650, 500);
    canvas.position(400, 200);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function iniciar(){
    som.play();
    som.setVolume(1);
    som.rate(1);
}
function modelLoaded(){
    console.log("ml5 e poseNet iniciados");
}
function gotPoses(results, error){
    if(error){
        console.error("error");
    }
    else{
        if(results.length > 0){
            console.log(results);
            scoreD = results[0].pose.keypoints[10].score;
            scoreE = results[0].pose.keypoints[9].score;
            pulsoEX = results[0].pose.leftWrist.x;
            pulsoEY = results[0].pose.leftWrist.y;
            pulsoDX = results[0].pose.rightWrist.x;
            pulsoDY = results[0].pose.rightWrist.y;
            console.log(pulsoEX + ", " + pulsoEY + ", " + pulsoDX + ", " + pulsoDY)
        }
    }
}