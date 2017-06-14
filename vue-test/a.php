<?php

$str = '123safasfdaoasfpasjdasd456';
$key = 'xqb';

// $sig = base64_encode(hash_hmac('sha1', $str,$key ));

// $sig = md5($str);
$sig = sha1($str);
echo $sig;

// NWJiNTkzYjcxZDEzYjk4YjVlMTNjYjM4OWQ0NDExNWU2MTgyYWFiYw==

?>


