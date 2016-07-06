<?php
require_once 'dbFunctions.php';
	$db = new dbFunctions();

	// response array
	$response = array("error" => FALSE);
	if (isset($_POST['userId'])) {
		$userId = $_POST['userId'];

		$user = $db->getUserData($userId);
		if ($user) {
			// user is found
			$response["error"] = FALSE;
			$response["uid"] = $user["userID"];
			$response["user"]["role"] = $db->checkUserRole($user["userID"]);
			$response["user"]["name"] = $user["userName"];
			$response["user"]["email"] = $user["email"];
			$response["user"]["phone"] = $user["phone_number"];
			
			echo json_encode($response);
		} else {
			// user is not found with credential
			$response["error"] = TRUE;
			$response["message"] = "The userId provivied does not exist!";
			echo json_encode($response);
		}
	} else {
		// required post params missing
		$response["error"] = TRUE;
		$response["message"] = "userId is required";
		echo json_encode($response);
	}