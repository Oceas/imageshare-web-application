<?php
	//database credentials
	define('DBHOST','localhost');
        define('DBUSER','user');
        define('DBPASS','secret');
        define('DBNAME','imageshare');
	
	// application address
	define('DIR','http://cop4331project.tk/');
	define('SITEEMAIL','admin@imageshare.io');
	define('UPLOAD_DIR', $_SERVER['DOCUMENT_ROOT']."/Upload");
	define('SAVE_PATH', 'http://imageshare.io/Upload');

	//set timezone
	date_default_timezone_set('US/Eastern');
	
	include('classes/phpmailer/mail.php');
?>