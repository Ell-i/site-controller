<?php
  error_reporting( E_ALL );
  ini_set('display_errors', 1);
  if($_SERVER['REQUEST_METHOD'] == 'POST') {

    if(isset($_POST['led'])){
	    $led1 = $_POST['led'] == 'LED 1' ? 1 : 0;

	    $led2 = $_POST['led'] == 'LED 2' ? 1 : 0;

	    $led3 = $_POST['led'] == 'LED 3' ? 1 : 0;

	    $led4 = $_POST['led'] == 'LED 4' ? 1 : 0;

	    $fp = fopen('./example_data.json', 'w');
	    fwrite($fp, "{\n");
	    fwrite($fp, "\t\"led1\" : $led1,\n");
	    fwrite($fp, "\t\"led2\" : $led2,\n");
	    fwrite($fp, "\t\"led3\" : $led3,\n");
	    fwrite($fp, "\t\"led4\" : $led4\n");
	    fwrite($fp, "}");
	    fclose($fp);
    }

    if(isset($_POST['scene'])){
	    $scene = $_POST['scene'];
	    $fp = fopen('./scene_data.json', 'w');
	    fwrite($fp, "{\n");
	    fwrite($fp, '"scene" : "' . $scene . "\"\n");
	    fwrite($fp, "}");
	    fclose($fp);
    }
  }


?>

<html>
  <head>
  </head>

  <body>
  <h1>LEDS - NOT CONNECTED </h1>
    <table>
      <tr>
         <td>
    	<form action = "" method = "post">
        <input type="submit" name="led" value="LED 1" />
    	</form>
         </td>
         <td>
   	 <form action = "" method = "post">
        <input type="submit" name="led" value="LED 2" />
    	</form>
         </td>
      </tr>
      <tr>
         <td>
   	<form action = "" method = "post">
        <input type="submit" name="led" value="LED 3" />
   	 </form>
         </td>
         <td>
    	<form action = "" method = "post">
        <input type="submit" name="led" value="LED 4" />
    	</form>
         </td>
      </tr>
    </table>
  <h1>HELVAR - SCENES</h1>
    <table>
      <tr>
         <td>
   	 <form action = "" method = "post">
        <input type="submit" name="scene" value="SCENE 1" />
   	 </form>
         </td>
	 <td>
	 <form action = "" method = "post">
      	  <input type="submit" name="scene" value="SCENE 2" />
    	</form>
         </td>
      </tr>
      <tr>
         <td>
 	   <form action = "" method = "post">
        <input type="submit" name="scene" value="SCENE 3" />
  	  </form>
         </td>
         <td>
   	 <form action = "" method = "post">
        <input type="submit" name="scene" value="SCENE 4" />
   	 </form>
         </td>
      </tr>
	<tr>
         <td>
   	 <form action = "" method = "post">
        <input type="submit" name="scene" value="SCENE 5" />
   	 </form>
         </td>
	 <td>
	 <form action = "" method = "post">
      	  <input type="submit" name="scene" value="SCENE 6" />
    	</form>
         </td>
      </tr>
      <tr>
         <td>
 	   <form action = "" method = "post">
        <input type="submit" name="scene" value="SCENE 7" />
  	  </form>
         </td>
         <td>
   	 <form action = "" method = "post">
        <input type="submit" name="scene" value="SCENE 8" />
   	 </form>
         </td>
      </tr>
    </table>
  </body>

</html>
