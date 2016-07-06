<?php
$uploadFolder  = "./upload";
$response = array("error" => FALSE);
if (!file_exists($uploadFolder)) {
	mkdir($uploadFolder, 0777, true);
}

$uploadFile = $uploadFolder . "/".basename($_FILES["fileToUpload"]["name"]);
if (!getimagesize($_FILES["fileToUpload"]["tmp_name"]) !== false) {
	$response["error"] = TRUE;
	$response["mesage"] = "Sorry, your image is invalid!";
	echo json_encode($response);
	exit;
	
}
$imageFileType = strtolower(pathinfo($uploadFile, PATHINFO_EXTENSION));
if ($imageFileType != "jpg" &&
	$imageFileType != "png" &&
	$imageFileType != "gif") {
		$response["error"] = TRUE;
		$response["mesage"] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
		echo json_encode($response);
		exit;
	}
if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $uploadFile)) {
	$response["error"] = FALSE;
	$response["mesage"] = "Your file ".basename($_FILES["fileToUpload"]["name"]. " has been uploaded successfully.");
	echo json_encode($response);
} else {
	$response["error"] = TRUE;
	$response["mesage"] = "Sorry, there was an error uploading your file.";
	echo json_encode($response);
}