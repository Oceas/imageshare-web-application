<?php
require_once 'dbFunctions.php';
$db = new dbFunctions();
// response array
$response = array(
		"error" => FALSE);
if (isset($_POST['userId'])) {
	$userId = $_POST['userId'];
	$albums = $db->getAlbums($userId);
	if ($albums) {
		$response["albums"] = $albums;
		echo json_encode ($response);
	} else {
		$response["error"] = TRUE;
		$response["message"] = "Cannot access database. Please try again";
		echo json_encode($response);
	}
} else {
	$response["error"] = TRUE;
	$response["message"] = "userId is required.";
	echo json_encode($response);
}