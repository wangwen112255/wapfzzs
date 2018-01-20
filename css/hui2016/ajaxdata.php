<?php
if(isset($_GET['c'])){
	if(!empty($_POST)){exit(json_encode($_POST));}
	if($_GET['c'] == 'json'){$arr = array('name' => 'test', 'age' => '18'); exit(json_encode($arr));}
}
if(!empty($_POST)){
	exit(json_encode($_POST));
}
echo 'hi...';