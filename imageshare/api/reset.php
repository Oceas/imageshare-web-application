<?php
	require_once 'dbFunctions.php';
	$db = new dbFunctions();
	
	// response array
	$response = array("error" => FALSE);
	if(isset($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$email = $_POST['email'];
		$result = $db->resetPassword($email);
		if ($result == true) {
			$response["error"] = FALSE;
			$response["message"] = "Please check your email for the link to reset password";
			echo json_encode($response);
		} else if ($result == false) {
			$response["error"] = TRUE;
			$response["message"] = "Email does not exist. Please try again.";
			echo json_encode($response);
		} else {
			$response["error"] = TRUE;
			$response["message"] = "Cannot reset password. Please try again.";
			echo json_encode($response);
		}
	}
?>