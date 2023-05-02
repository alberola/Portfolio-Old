<?php

    //Function to clear inputs fields
    function limpiar($data){
        $data = trim($data);
        $data = htmlentities($data);
        $data = htmlspecialchars($data);
        $data = stripslashes($data);
        return $data;
      }


      //VARS
      $addressee = 'alejandroalberola140400@gmail.com';


      $name = limpiar($_POST['name']);
      $subject = limpiar($_POST['subject']);
      $email = limpiar($_POST['email']);
      $text = limpiar($_POST['message']);
      $footer = "Mensaje enviado desde la página de alberola.departamentoinformaticajmpp.com";

      $content = "Email: ". $email."\nAutor: ".$name."\nMensaje: ". $text."\n".$footer;

      //Mail function to send the email
      mail($addressee, $subject, $content);


      //Redirect to the main page
      header("Location: http://alberola.departamentoinformaticajmpp.com/");

?>