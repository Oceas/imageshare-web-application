<?php
class dbConnect {
    private $conn;
 
    // Connecting to database
    public function connect() {
        require_once 'config.php';
        $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');

         
        // Connecting to mysql database
        //$this->conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
        try {
        	$conn = new PDO("mysql:host=".DBHOST.";port=3306;charset=utf8;dbname=".DBNAME, DBUSER, DBPASS, $options);
        } catch (PDOException $ex) {
        	die("Failed to connect to the database: " . $ex->getMessage());

        }
        //echo "successfully connected!";
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

         
        // return database handler
        return $conn;
    }
}
 
?>