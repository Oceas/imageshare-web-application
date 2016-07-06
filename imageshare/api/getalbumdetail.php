<?php
require_once 'dbFunctions.php';
	$db = new dbFunctions();
	// response array
	$response = array("error" => FALSE);

	if (isset($_POST['userId']) && isset($_POST['albumId'])) {
		$userId = $_POST['userId'];
    	$albumId = $_POST['albumId'];

    	if ($db->getAlbum($userId, $albumId) == FALSE) {
    		$response["error"] = TRUE;
			$response["message"] = "userId or albumId  does not exist";
			echo json_encode($response);
    	} else {
    		$albumDetail = $db->getAlbumDetail($userId, $albumId);

    		if ($albumDetail) {
    			$response["error"] = FALSE;
    			$response["album"]["id"] = $albumId;
    			$response["album"]["images"] = $albumDetail;
    			echo json_encode($response);
    		}
    	}
	} else {
		// required post params missing
		$response["error"] = TRUE;
		$response["message"] = "userId and albumId  is required";
		echo json_encode($response);
	}