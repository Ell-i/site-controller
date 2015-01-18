<?php 
  error_reporting( E_ALL );
  ini_set('display_errors', 1);
?>
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./main.css">
    <meta name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <style>
      #background   { background-color: blue; }
      body          { background-color: white; }
      #red          { background-color: red; }
      #green        { background-color: green; }
      #blue         { background-color: blue; }
      #white        { background-color: white; }
      input[type="range"] { 
        -webkit-appearance: none; 
        height: 50px; 
        width: 90%;
        text-align: center;
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        position: relative;
        top: -1px;
        z-index: 1;
        width: 50px;
        height: 50px;
 
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        border-radius: 100px;
        background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ebf1f6), color-stop(50%,#abd3ee), color-stop(51%,#89c3eb), color-stop(100%,#d5ebfb));
      }
    </style>
    <script type='text/javascript'>

      function updateSlider(slider, category, isTime) {
        var displayValue = slider.value;
        if(isTime){
		var displayValueHH = (displayValue - displayValue % 100) / 100;
		var displayValueMM = displayValue % 100;
		    displayValueMM = displayValueMM % 60;
		var displayString = ((displayValueHH < 10) ? "0" : "") + displayValueHH + ":";
		displayString += ((displayValueMM < 10) ? "0" : "") + displayValueMM;
		displayValue = displayString;
	}
	else displayValue += " %";
        document.getElementById(slider.id + "_text_" + category).value=displayValue;

        }
    </script>
  </head>
