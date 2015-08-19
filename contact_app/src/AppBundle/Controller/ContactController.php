<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Contact;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class ContactController extends Controller
{
    // ...

    /**
     * @Route("/api/contact/get")
     */
    public function apiGetAction()
    {
        $repository = $this->getDoctrine()
            ->getRepository('AppBundle:Contact');
        $contacts = $repository->findAll();
        //print_r($contacts);
        //load conatct data here

        foreach($contacts as $contact) {
            $data[] = array('id' => $contact->getId(),
                            'name' => $contact->getName(),
                             'email' =>   $contact->getEmail(),
                             'telephone' =>  $contact->getTelephone()

                            );

        }
        echo '<pre>';
        print_r($data);
        echo '</pre>';
        die;
        $data = array(
            'lucky_number' => rand(0, 100),
        );
        header('Access-Control-Allow-Origin: *');
        return new Response(
            json_encode($data),
            200,
            array('Content-Type' => 'application/json',
                    'Access-Control-Allow-Origin' => '*' )
        );
    }

    /**
     * @Route("/api/contact/create")
     */
    public function apiCreateAction()
    {
        $contact = new Contact();
        $contact->setName('test');
        $contact->setEmail('test@test.com');
        $contact->setTelephone('0775872554');

        $em = $this->getDoctrine()->getManager();

        $em->persist($contact);
        $em->flush();

        return new Response('Created product id '.$contact->getId());
    }
}
