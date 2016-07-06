<?php
	class dbFunctions {
		private $conn;

		//constructor
		function __construct() {
			require_once 'dbConnect.php';
			// connection to database
			$db = new dbConnect();
			$this->conn = $db->connect();
		}

		// destructor
		function __destruct() {

		}

		/**
     * Encrypting password
     * @param password
     * @returns salt and encrypted password
     */
    public function hashSSHA($password) {
 
        $salt = sha1(rand());
        $salt = substr($salt, 0, 10);
        $encrypted = base64_encode(sha1($password . $salt, true) . $salt);
        $hash = array("salt" => $salt, "encrypted" => $encrypted);
        return $hash;
    }
 
    /**
     * Decrypting password
     * @param salt, password
     * @returns hash string
     */
    public function checkhashSSHA($salt, $password) {
 
        $hash = base64_encode(sha1($password . $salt, true) . $salt);
 
        return $hash;
    }

		public function storeUser($name, $email, $nid, $phone_num,  $password) {

			//$uid = uniqid('', true);
			// Activation code
			$activation = md5(uniqid(rand(),true));
			// encrypted password before storing to database
			$hash = $this->hashSSHA($password);
			$encrypted_pass = $hash["encrypted"];
			$salt = $hash["salt"];
			//$time_at = date("Y-m-d H:i:s");

			$query = "INSERT INTO user (userName, email, password, nid, phone_number, salt, active) VALUES 
					(:name, :email, :encrypted_pass, :nid, :phone_num, :salt, :active)";

			$query_params = array( 
				':name' => $name,
				':email' => $email,
				':encrypted_pass' => $encrypted_pass,
				':nid' => $nid,
				':phone_num' => $phone_num,
				':salt' => $salt,
				':active' => $activation
			);

			try {
				$stmt = $this->conn->prepare($query);
				$result = $stmt->execute($query_params);
			} catch (PDOException $ex) {
				return false;
			}

			$query = "SELECT * FROM user WHERE email = :email";
			$query_params = array(
				':email' => $email
			);

			try {
				$stmt = $this->conn->prepare($query);
				$result = $stmt->execute($query_params);
			} catch (PDOException $ex) {
				return false;
			}
			$user = $stmt->fetch();
			$id = $user["userID"];
			// user is successfully created, send activation link for user
			$to = $_POST['email'];
			$subject = "Registration Confirmation";
			$body = "<p>Thank you for registering at imageshare.io.</p>
			<p>To activate your account, please click on this link: <a href='".DIR."activate.php?x=$id&y=$activation'>".DIR."activate.php?x=$id&y=$activation</a></p>
						<p>Regards Site Admin</p>";
			
			$mail = new Mail();
			$mail->setFrom("admin@imageshare.io");
			$mail->addAddress($to);
			$mail->subject($subject);
			$mail->body($body);
			$mail->send();
			
			return $user;
		}
		/* Get user data from login credential
		*/
		public function getUserFromLoginData($email, $password) {
			$query = "SELECT * FROM user WHERE email = :email and active = 'Yes'";
			$query_params = array(
				':email' => $email
			);

			
				$stmt = $this->conn->prepare($query);
				$stmt->execute($query_params);

			$user = $stmt->fetch();

			//verify user password
			$salt = $user['salt'];
			$encrypted_pass = $user['password'];
			$hash = $this->checkhashSSHA($salt, $password);

			if ($encrypted_pass == $hash)
				return $user;
			else 
				return false;
		}

		public function isUserExisted($email) {
			$query = "SELECT email FROM user WHERE email = :email";
			$query_params = array(
				':email' => $email
			);

			try {
				$stmt = $this->conn->prepare($query);
				$result = $stmt->execute($query_params);
			} catch (PDOException $ex) {
				die($ex);
			} 

			$row = $stmt->fetch();
			if($row)
				return true;
			else
				return false;
		}
		
		public function resetPassword($email) {
			$query = 'SELECT email FROM user WHERE email = :email';
			try {
				$stmt = $this->conn->prepare($query);
				$stmt->execute(array(':email' => $email));
			} catch (PDOException $ex) {
				die($ex);
			}
			
			$user = $stmt->fetch();
			if(empty($user['email']))
				return  false;
			else {
				$token = md5(uniqid(rand(),true));
				try {
					$query = "UPDATE user SET resetToken = :token, resetComplete = 'No' WHERE email = :email";
					$stmt = $this->conn->prepare($query);
					$stmt->execute(array('token' => $token,
								':email' => $email) 
							);
					
					//send email
					$to = $row['email'];
					$subject = "Password Reset";
					$body = "<p>Someone requested that the password be reset.</p>
								<p>If this was a mistake, just ignore this email and nothing will happen.</p>
								<p>To reset your password, visit the following address: <a href='".DIR."resetPassword.php?key=$token'>".DIR."resetPassword.php?key=$token</a></p>";
					$mail = new Mail();
					$mail->setFrom("admin@cop4331project.tk");
					$mail->addAddress($to);
					$mail->subject($subject);
					$mail->body($body);
					$mail->send();
				} catch (PDOException $ex) {
					die($ex);
				}
				
				return true;
			}
		}
		
		public function checkUserRole($uid) {
			$query = 'SELECT teacherID FROM teacher where teacherID = :uid';
			$stmt = $this->conn->prepare($query);
			$stmt->execute(array('uid' => $uid));
			$user = $stmt->fetch();
			if(empty($user['teacherID']))
				return "student";
			else return "teacher";
		}
		
		public function getUserData($uid) {
			$query = 'SELECT * FROM user WHERE userID = :uid';
			try {
				$stmt = $this->conn->prepare($query);
				$stmt->execute(array(':uid' => $uid));
			} catch (PDOException $ex) {
				die($ex);
			}
			
			$user = $stmt->fetch();
			if ($user)
				return $user;
			else
			return false;
			
			
		}
		
		public function getAlbums($userId) {
			$query = 'SELECT * FROM album WHERE ownerId = :oId';
			try {
				$stmt = $this->conn->prepare($query);
				$stmt->execute(array(':oId' => $userId));
			} catch (PDOException $ex) {
				return FALSE;
			}
			$result = array();
			while($album = $stmt->fetch(PDO::FETCH_ASSOC)) {
				array_push($result, $album);
			}
				
			return $result;
		}
		
		public function getAlbumDetail($userId, $albumId) {
			$query = 'SELECT i.imageName, i.imageDesc, i.imageLocation
						FROM album as a INNER JOIN album_image as ai ON a.albumId = ai.albumId
							INNER JOIN image as i ON ai.imageId = i.imageId
						WHERE a.ownerId = :uid AND a.albumID = :aid';
			try {
				$stmt = $this->conn->prepare($query);
				$stmt->execute(array(':uid' => $userId , ':aid' => $albumId ));
			} catch (PDOException $ex) {
				return $ex->getMessage();
			}
			$result = array();
			while($data = $stmt->fetch(PDO::FETCH_ASSOC)) {
				array_push($result, $data);
			}
			return $result;
				
		}
		
		public function uploadImages($albumId, $image, $filePath) {
			$query = 'INSERT into image (imageName, imageLocation) VALUES (:iname, :ilocation)';
			try {
				$stmt = $this->conn->prepare($query);
				$stmt->execute(array(':iname' => $image, ':ilocation' => $filePath));
			} catch (PDOException $ex) {
				return $ex->getMessage();
			}
		
			$iId = $this->conn->lastInsertID();
		
			$query = 'INSERT into album_image (albumId, imageId) VALUES (:aId, :iId)';
		
			try {
				$stmt = $this->conn->prepare($query);
				$stmt->execute(array(':aId' => $albumId, ':iId' => $iId ));
			} catch (PDOException $ex) {
				return $ex->getMessage();
			}
		
			return TRUE;
		}
		
		public function getAlbum($userId, $albumId) {
			$query = 'SELECT * FROM album WHERE ownerId = :oId and albumId = :aId';
			try {
				$stmt = $this->conn->prepare($query);
				$stmt->execute(array(':oId' => $userId, ':aId' => $albumId));
			} catch (PDOException $ex) {
				return FALSE;
			}
			$album = $stmt->fetch();
			if ($album)
				return $album;
				else
					return FALSE;
		}
		
		// create album function
		// @param: $userId
		// @param: $albumName
		// @param: $albumDesc
		
		public function createAlbum($userId, $albumName, $albumDesc) {
			$query = "INSERT INTO  album (albumName, albumDesc, ownerId) VALUES (:aname, :aDesc, :owner)";
			try {
				$stmt = $this->conn->prepare($query);
				$stmt->execute(array(
						':aname' => $albumName,
						':aDesc' => $albumDesc,
						':owner' => $userId
				));
			} catch(PDOException $ex) {
				return $ex->getMessage();
			}
				
			$albumId = $this->conn->lastInsertID();
			return $albumId;
		}


	}
?>