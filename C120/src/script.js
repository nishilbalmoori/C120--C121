var previous_result = '';

function setup(){
    canvas = createCanvas(300,300);
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}
function draw(){
    image(video, 0, 0, 300, 300);
    classifier.classify(video, gotResult);
}

function modelLoaded(){
    console.log("Model has loaded!");
}
function gotResult(err, res){
    if(err){
        console.error(err);
    }else{
        if((res[0].confidence > 0.5) && (previous_result != res[0].label)){
            console.log(res);
            previous_result = res[0].label;

            var synth = window.speechSynthesis;
            speak_data = 'Object detected is - ' + res[0].label;
            var utterThis =  new SpeechSynthesisUtterance(speak_data);
            synth.speak(utterThis);
            
            document.getElementById("result-object-tag").innerHTML = res[0].label;
            confidence = res[0].confidence
            document.getElementById("result-object-accuracy").innerHTML = toPercent(confidence).toString() + "%";

        }
    }
}
function toPercent(f){
    f = (f*100).toFixed(1);
    return f;
}