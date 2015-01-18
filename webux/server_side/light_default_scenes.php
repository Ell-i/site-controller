<?php include_once("./head.php")?>
  <body>
    <div id="content">
<?php


  $fp = fopen("./light_default_scenes.json", "r") or die("Unable to open file!");

  $data = json_decode(fread($fp, filesize("./light_default_scenes.json")));

  fclose($fp);

  $json_string = '{ "scenes" : {';

?>

    <?php 
    $min_values = [0, 0, 0, 0];
    $max_values = [100, 100, 100, 100];
    $cat_counter = 0;
      foreach (current($data) as $key => $struct){
	 if($cat_counter) $json_string .= ",";
	 $counter = 0;
         echo '<form action=""  method="POST">';
      	 echo "<h3>$key</h3>";
	 echo "<table>";
	 $json_string .= "\"$key\" : {";
         if(!isset($_POST["category"]) || $_POST["category"] != $key){
		 foreach($struct as $name => $value){
                        if($counter) $json_string .= ","; 
			echo "<tr>";
		        echo "<td><label>$name</label></td>";
			echo "<td><input type='text' readonly id='" . $name . "_text_" . $key . "'  value='$value'></td>";
			echo "<td><input class='slider' type='range' min='$min_values[$counter]' max='$max_values[$counter]' id='$name' name='$name' value='$value' onchange='updateSlider(this, \"$key\");'></td>";
			echo "</tr>";
			$counter++;
	 		$json_string .= "\"$name\" : $value";
		 }
         }
         else if($_POST["category"] == $key){
		 foreach($struct as $name => $value){
                        if($counter) $json_string .= ","; 
			echo "<tr>";
		        echo "<td><label>$name</label></td>";
			echo "<td><input type='text' readonly id='" . $name . "_text_" . $key . "'  value='$_POST[$name]'></td>";
			echo "<td><input class='slider' type='range' min='$min_values[$counter]' max='$max_values[$counter]' id='$name' name='$name' value='$_POST[$name]' onchange='updateSlider(this, \"$key\");'></td>";
			echo "</tr>";
			$counter++;
	 		$json_string .= "\"$name\" : $_POST[$name]";
		 }
         }
	 echo "</table>";
         echo "<input type='hidden' name='category' value='$key'>";
	 echo "<input type='submit' value='Save $key settings'>";
         echo "</form>";
	 $json_string .= "}";
	 $cat_counter++;
      }
       $json_string .= "}";
       $json_string .= "}";
     //echo $json_string;
       echo '<script type="text/javascript">var elements = document.getElementsByClassName("slider"); for(var ii = 0; ii < elements.length; ii++) {elements[ii].onchange();}</script>';
     $fp = fopen("./light_default_scenes.json", "w") or die("Unable to open file!");

     fwrite ($fp, $json_string, strlen($json_string));

    fclose($fp);
    //echo strlen($json_string);
	
    ?>
  </div>
 </body>
</html>
