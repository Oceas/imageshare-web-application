<?php
require_once 'dbFunctions.php';
	$db = new dbFunctions();
	// response array
	$response = array("error" => FALSE);

	if (isset($_POST['userId']) && isset($_POST['albumName'])) {
		$userId = $_POST['userId'];
    	$albumName = $_POST['albumName']; 
    	$albumDesc = isset($_POST['albumDesc']) ? $_POST['albumDesc'] : '';
    	$user = $db->getUserData($userId);
    	if ($user) {
    		$result = $db->createAlbum($userId, $albumName, $albumDesc);
    		if (is_numeric($result)) {
                $response["albumId"] = $result;
		    	$response["message"] = "Album ".$albumName . " successfully created for userId = " . $userId;
		    	echo json_encode($response);

    		} else {
    				$response["error"] = TRUE;
		    		$response["message"] = $result;
                    echo json_encode($response);
    		}

    	} else {
    		$response["error"] = TRUE;
		    $response["message"] = "userId = ". $userId. " does not exist!";
		    echo json_encode($response);
    	}

	} else {

        $response["error"] = TRUE;
        $response["message"] = "userId and album name required!";
        echo json_encode($response);
    }