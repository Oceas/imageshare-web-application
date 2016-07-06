<?php
require_once 'dbFunctions.php';
$db = new dbFunctions ();
// response array
$response = array (
		"error" => FALSE 
);
$nUploadedFile = 0;
if (isset ( $_POST ['userId'] ) && isset ( $_POST ['albumId'] )) {
	$userId = $_POST ['userId'];
	$albumId = $_POST ['albumId'];
	$validFormat = array (
			"jpg",
			"png",
			"gif",
			"bmp" 
	);
	$user = $db->getUserData ( $userId );
	if ($user) {
		// Create a folder named with userId
		$uploadFolder = UPLOAD_DIR;
		if (! file_exists ( $uploadFolder )) {
			mkdir ( $uploadFolder, 0777, true );
		}
		if (is_array ( $_FILES ["fileToUpload"] )) {
			foreach ( $_FILES ["fileToUpload"] ["name"] as $f => $name ) {
				if ($_FILES ["fileToUpload"] ["error"] [$f] == 4) {
					$response ["error"] = TRUE;
					$response ["message"] [$name] = "There is no file to upload";
					continue;
				}
				if ($_FILES ["fileToUpload"] ["error"] [$f] == 0) {
					if (! in_array ( pathinfo ( $name, PATHINFO_EXTENSION ), $validFormat )) {
						$response ["error"] = TRUE;
						$response ["message"] [$name] = "invalid file format!";
						continue;
					}
					// create a new unique name for the file before storing
					$tmpFile = tempnam ( $uploadFolder, $userId . $albumId );
					unlink ( $tmpFile );
					// / get the unique name for the image
					$tmpName = pathinfo ( $tmpFile, PATHINFO_FILENAME );
					
					$imageName = $tmpName . "." . pathinfo ( $name, PATHINFO_EXTENSION );
					$filePath = $uploadFolder . "/" . $tmpName . "." . pathinfo ( $name, PATHINFO_EXTENSION );
					$webLocation = SAVE_PATH . "/" . $tmpName . "." . pathinfo ( $name, PATHINFO_EXTENSION );
					// uploaded successfully
					if (move_uploaded_file ( $_FILES ["fileToUpload"] ["tmp_name"] [$f], $filePath )) {
						// insert image data to database
						$result = $db->uploadImages ( $albumId, $imageName, $webLocation );
						if ($result == TRUE) {
							$response ["message"] [$name] = "successfully uploaded";
							$nUploadedFile ++;
						} else {
							$response ["error"] = TRUE;
							$response ["message"] [$name] = "Cannot not be save to database!";
						}
					} 					// cannot be uploaded
					else {
						$response ["error"] = TRUE;
						$response ["message"] [$name] = "Cannot not be uploaded!";
					}
				}
			}
			
			$response ["message"] ["uploadedFiles"] = $nUploadedFile;
			echo json_encode ( $response );
		} else {
			$response ["error"] = TRUE;
			$response ["message"] = "There is no file to upload";
			echo json_encode ( $response );
		}
	} else {
		$response ["error"] = TRUE;
		$response ["message"] = "userId does not exist!";
		echo json_encode ( $response );
	}
} else {
	// required post params missing
	$response ["error"] = TRUE;
	$response ["message"] = "userId and albumId  is required";
	echo json_encode ( $response );
}
