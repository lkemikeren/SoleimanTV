    <?php
//header('Content-Type: application/json; charset=utf-8');
    $host = "mysql100.unoeuro.com";
    $user = "*****";
    $pass = "*****";
    $db = "*******";

if (empty($_REQUEST['mode'])) {
$mode = 'cat';
} else {
$mode = $_REQUEST['mode'];

}


        $connection = mysqli_connect($host,$user,$pass,$db) or die("Error " . mysqli_error($connection));
        //fetch table rows from mysql db
    
  
    //create an array
    $emparray = array();
    
       $emparray2 = array();
    
    if ($mode=='cat') {
    $sql = "SELECT * FROM category where hideCat = false";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray['cat'][] = $row;
    }
    echo json_encode($emparray)."";
    mysqli_close($connection);
    } 
    if ($mode=='tv') {
      $sql2 = "SELECT * FROM list where hide = false order by list_order limit 90";
    //$sql2 = "SELECT
    //json_merge(
          //json_object('ID', ID), 
          //json_object('CH_NAME', CH_NAME),
       //   json_object('CH_URL', CH_URL),
         // json_object('CH_DESC', CH_DESC),
        //  json_object('CH_ICON', CH_ICON),
          //json_object('list_order', list_order),
 //         json_object('hide', hide),
   //       json_object('cat', cat)
  
//) FROM list limit 30;";
    $result2 = mysqli_query($connection, $sql2) or die("Error in Selecting " . mysqli_error($connection));
    while($row2 =mysqli_fetch_assoc($result2))
    {
        $emparray2['list'][] = $row2;
        //echo '<a href="'.$row2['CH_URL'].'">'.$row2['CH_NAME'].'</a><br>';
    }
    //$len = count($emparray2['list']);
    echo json_encode($emparray2);
    //echo "<br><br>Antal:".$len;
    mysqli_close($connection);
    }
    
    exit(0);
    ?>