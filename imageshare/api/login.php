<?php
	require_once 'dbFunctions.php';
	$db = new dbFunctions();

	// response array
	$response = array("error" => FALSE);
	if (isset($_POST['email']) && isset($_POST['password'])) {
		$email = $_POST['email'];
		$password = $_POST['password'];

		$user = $db->getUserFromLoginData($email, $password);
		if ($user) {
			// user is found
			$response["error"] = FALSE;
			$response["uid"] = $user["userID"];
			//$response["user"]["role"] = $db->checkUserRole($user["userID"]);
			$response["user"]["name"] = $user["userName"];
			$response["user"]["email"] = $user["email"];
			
			echo json_encode($response);
		} else {
			// user is not found with credential
			$response["error"] = TRUE;
			$response["message"] = "Login credentials are wrong or your account has not been activated";
			echo json_encode($response);
		}
	} else {
		// required post params missing
		$response["error"] = TRUE;
		$response["message"] = "email and password required";
		echo json_encode($response);
	}

?>