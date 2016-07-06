<?php
	require_once 'dbFunctions.php';
	$db = new dbFunctions();

	// result array
	$response = array("error" => FALSE);
	// Check all the required fields
	if (isset($_POST['name']) && isset($_POST['email']) && 
			isset($_POST['password']) &&
					isset($_POST['phone_number'])) {
		// post parameters
		$name = $_POST['name'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		$nid = 11111111;
		$phone_number = $_POST['phone_number'];

		// check to see if user is already existed
		if($db->isUserExisted($email)) {
			//user already existed
			$response["error"] = TRUE;
			$response["message"] = "User already existed with " . $email;
			echo json_encode($response);
		} else {
			// create a new user
			$user = $db->storeUser($name, $email, $nid, $phone_number,  $password);
			if ($user) {
				// return the message
				$response["error"] = FALSE;
				$response["uid"] = $user["userID"];
				
				$response["user"]["uid"] = $user["userID"];
				$response["user"]["role"] = $db->checkUserRole($user["userID"]);
				$response["user"]["name"] = $user["userName"];
				$response["user"]["email"] = $user["email"];
				$response["message"] = "Please check email for account activation link";
				
				
				echo json_encode($response);
			} else {
				// cannot store data
				$response["error"] = TRUE;
				$response["message"] = "Connection error! Please try again!";
				echo json_encode($response);
			}
		}
	} else {
		$response["error"] = TRUE;
		$response["message"] = "Required parameters are missing!";
		echo json_encode($response);
	}
?>